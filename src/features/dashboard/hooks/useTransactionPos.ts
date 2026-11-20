import { useState, useMemo, useEffect } from 'react'
import { api } from '../../../services/api'
import { useProductStore } from '../stores/useProductStore'
import { useTransactionStore, type CompletedTransaction } from '../stores/useTransactionStore'
import { checkoutSchema } from '../schemas/transactionSchema'

export type PosCategoryFilter = 'Semua' | 'ATK' | 'Perlengkapan Sekolah' | 'Perlengkapan Jenazah'

export function useTransactionPos() {
  const { products, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const {
    cartItems,
    transactionCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    saveTransaction,
  } = useTransactionStore()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<PosCategoryFilter>('Semua')
  const [cashInput, setCashInput] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [completedReceipt, setCompletedReceipt] = useState<CompletedTransaction | null>(null)

  // Format live time string (e.g. "11:05 WIB")
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date()
    return (
      now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WIB'
    )
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        }) + ' WIB'
      )
    }, 30000)
    return () => clearInterval(timer)
  }, [])

  // Tanggal unik untuk nomor transaksi (diinisialisasi sekali)
  const [datePrefix] = useState(() => {
    const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    return `${yyyy}${mm}${dd}`
  })

  // Nomor transaksi unik berformat #TRX-YYYYMMDD-008
  const transactionNumber = useMemo(() => {
    const seq = String(transactionCount).padStart(3, '0')
    return `#TRX-${datePrefix}-${seq}`
  }, [datePrefix, transactionCount])

  // Filter Produk
  const posProducts = useMemo(() => {
    return products.map((product) => ({
      id: product.id,
      name: product.namaProduk,
      category: product.kategori,
      price: product.harga,
      stock: product.stokJumlah,
      unit: product.stokSatuan || 'Pcs',
      imageUrl: product.customImageUrl || '',
    }))
  }, [products])

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return posProducts.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q)

      const matchCategory =
        selectedCategory === 'Semua' || product.category === selectedCategory

      return matchSearch && matchCategory
    })
  }, [posProducts, searchQuery, selectedCategory])

  // Hitungan Kasir
  const totalItems = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  )

  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.subtotal, 0),
    [cartItems]
  )

  const discount = 0
  const totalBayar = Math.max(0, subtotal - discount)

  const cashReceived = useMemo(() => {
    const raw = cashInput.replace(/\D/g, '')
    return raw === '' ? 0 : Number(raw)
  }, [cashInput])

  const kembalian = cashInput.trim() === '' ? 0 : cashReceived - totalBayar

  // Input Uang Diterima
  const handleCashChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '')
    if (digitsOnly === '') {
      setCashInput('')
    } else {
      const num = Number(digitsOnly)
      setCashInput(num.toLocaleString('id-ID'))
    }
    setValidationError(null)
  }

  // Set Uang Pas
  const setExactCash = () => {
    setCashInput(totalBayar > 0 ? totalBayar.toLocaleString('id-ID') : '')
    setValidationError(null)
  }

  // Set Cepat (e.g. 20k, 50k, 100k)
  const setQuickCash = (amount: number) => {
    setCashInput(amount.toLocaleString('id-ID'))
    setValidationError(null)
  }

  // Handle Checkout / Simpan Transaksi dengan Zod Schema
  const handleSaveTransaction = async () => {
    const payload = {
      transactionNumber,
      items: cartItems,
      subtotal,
      discount,
      totalBayar,
      cashReceived,
      change: kembalian,
      paymentMethod: 'Tunai' as const,
    }

    const result = checkoutSchema.safeParse(payload)

    if (!result.success) {
      const firstIssue = result.error.issues[0]
      setValidationError(firstIssue?.message || 'Data transaksi belum valid')
      return
    }

    setValidationError(null)

    // Call API untuk mencatat transaksi dan memotong stok di MySQL backend
    try {
      await api.transaksi.create({
        items: cartItems.map((item) => ({
          produk_id: Number(item.productId),
          jumlah: item.quantity,
        })),
        metode_pembayaran: 'Tunai',
        no_transaksi: transactionNumber,
        uang_diterima: cashReceived,
      })
      // Refresh produk agar stok terupdate realtime dari server
      await fetchProducts()
    } catch (err: any) {
      console.warn('Gagal sinkron transaksi ke API server, transaksi tetap disimpan lokal:', err)
    }

    const receipt = saveTransaction(result.data)
    setCompletedReceipt(receipt)
    setSuccessModalOpen(true)
    setCashInput('')
  }

  // Batal Transaksi (Reset keranjang & input)
  const handleCancelTransaction = () => {
    clearCart()
    setCashInput('')
    setValidationError(null)
  }

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false)
    setCompletedReceipt(null)
  }

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    transactionNumber,
    currentTime,
    totalItems,
    subtotal,
    discount,
    totalBayar,
    cashInput,
    handleCashChange,
    setExactCash,
    setQuickCash,
    cashReceived,
    kembalian,
    validationError,
    handleSaveTransaction,
    handleCancelTransaction,
    successModalOpen,
    completedReceipt,
    handleCloseSuccessModal,
  }
}
