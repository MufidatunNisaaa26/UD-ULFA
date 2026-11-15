import { useState, useMemo, useEffect } from 'react'
import { POS_PRODUCTS } from '../data/posProducts'
import { useTransactionStore, type CompletedTransaction } from '../stores/useTransactionStore'
import { checkoutSchema } from '../schemas/transactionSchema'

export type PosCategoryFilter = 'Semua' | 'ATK' | 'Perlengkapan Sekolah' | 'Perlengkapan Jenazah'

export function useTransactionPos() {
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
  const [cashInput, setCashInput] = useState('50.000')
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
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return POS_PRODUCTS.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q)

      const matchCategory =
        selectedCategory === 'Semua' || product.category === selectedCategory

      return matchSearch && matchCategory
    })
  }, [searchQuery, selectedCategory])

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

  const kembalian = cashReceived - totalBayar

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
    setCashInput(totalBayar > 0 ? totalBayar.toLocaleString('id-ID') : '0')
    setValidationError(null)
  }

  // Set Cepat (e.g. 20k, 50k, 100k)
  const setQuickCash = (amount: number) => {
    setCashInput(amount.toLocaleString('id-ID'))
    setValidationError(null)
  }

  // Handle Checkout / Simpan Transaksi dengan Zod Schema
  const handleSaveTransaction = () => {
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
    const receipt = saveTransaction(result.data)
    setCompletedReceipt(receipt)
    setSuccessModalOpen(true)
    setCashInput('0')
  }

  // Batal Transaksi (Reset keranjang & input)
  const handleCancelTransaction = () => {
    clearCart()
    setCashInput('0')
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
