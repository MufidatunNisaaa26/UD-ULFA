import { useState, useMemo, useEffect } from 'react'
import { useFinanceStore } from '../stores/useFinanceStore'
import { expenseSchema } from '../schemas/expenseSchema'

function getInitialDateString() {
  const now = new Date()
  const dd = String(now.getDate()).padStart(2, '0')
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const yyyy = now.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

export function useFinance() {
  const { transactions, addExpense, deleteExpense, fetchTransactions } = useFinanceStore()

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  // Search Filter
  const [searchQuery, setSearchQuery] = useState('')

  // Form State Input Pengeluaran
  const [namaKegiatan, setNamaKegiatan] = useState('')
  const [tanggal, setTanggal] = useState(getInitialDateString)
  const [nominalInput, setNominalInput] = useState('')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Waktu Realtime (Read-only, diperbarui setiap detik)
  const [waktuRealtime, setWaktuRealtime] = useState(() => {
    const now = new Date()
    return (
      now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }) + ' WIB'
    )
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setWaktuRealtime(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' WIB'
      )
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Filtered List
  const filteredTransactions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return transactions.filter((tx) => {
      return (
        tx.keterangan.toLowerCase().includes(q) ||
        tx.tanggalWaktu.toLowerCase().includes(q) ||
        tx.kategori.toLowerCase().includes(q) ||
        tx.nominal.toString().includes(q)
      )
    })
  }, [transactions, searchQuery])

  // Ringkasan Hari Ini
  const totalPemasukan = useMemo(() => {
    return transactions
      .filter((tx) => tx.kategori === 'Pemasukan')
      .reduce((acc, tx) => acc + tx.nominal, 0)
  }, [transactions])

  const totalPengeluaran = useMemo(() => {
    return transactions
      .filter((tx) => tx.kategori === 'Pengeluaran')
      .reduce((acc, tx) => acc + tx.nominal, 0)
  }, [transactions])

  // Handle Input Nominal dengan Pemisah Ribuan
  const handleNominalChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '')
    if (digitsOnly === '') {
      setNominalInput('')
    } else {
      const num = Number(digitsOnly)
      setNominalInput(num.toLocaleString('id-ID'))
    }
    if (formErrors.nominal) {
      setFormErrors((prev) => ({ ...prev, nominal: '' }))
    }
  }

  // Handle Submit Form dengan Validasi Zod Schema
  const handleSubmitExpense = async (e: React.FormEvent) => {
    e.preventDefault()

    const rawNominal = nominalInput.replace(/\D/g, '')
    const parsedNominal = rawNominal === '' ? 0 : Number(rawNominal)

    const validation = expenseSchema.safeParse({
      namaKegiatan,
      tanggal,
      nominal: parsedNominal,
    })

    if (!validation.success) {
      const errorsMap: Record<string, string> = {}
      validation.error.issues.forEach((issue) => {
        const field = String(issue.path[0])
        errorsMap[field] = issue.message
      })
      setFormErrors(errorsMap)
      return
    }

    setFormErrors({})

    await addExpense({
      namaKegiatan: validation.data.namaKegiatan,
      tanggal: validation.data.tanggal,
      nominal: validation.data.nominal,
      waktu: waktuRealtime,
    })

    // Reset Form & Show Feedback
    setNamaKegiatan('')
    setNominalInput('')
    setToastMessage('Pengeluaran berhasil dicatat!')
    setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }

  const handleDeleteExpense = async (id: string, backendId?: number) => {
    const ok = window.confirm('Hapus catatan pengeluaran ini?')
    if (!ok) return
    await deleteExpense(id, backendId)
    setToastMessage('Pengeluaran berhasil dihapus')
    setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }

  return {
    searchQuery,
    setSearchQuery,
    filteredTransactions,
    namaKegiatan,
    setNamaKegiatan,
    tanggal,
    setTanggal,
    nominalInput,
    handleNominalChange,
    waktuRealtime,
    formErrors,
    toastMessage,
    handleSubmitExpense,
    handleDeleteExpense,
    totalPemasukan,
    totalPengeluaran,
  }
}
