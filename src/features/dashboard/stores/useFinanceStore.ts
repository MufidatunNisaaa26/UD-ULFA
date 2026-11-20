import { create } from 'zustand'
import { api, type ApiExpense, type ApiTransactionReceipt } from '../../../services/api'

export interface FinancialTransaction {
  id: string
  backendId?: number
  no: number
  tanggalWaktu: string
  isoDate?: string
  keterangan: string
  kategori: 'Pemasukan' | 'Pengeluaran'
  nominal: number
}

function loadLocalExpenses(): FinancialTransaction[] {
  try {
    const raw = localStorage.getItem('udulfa_local_expenses')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveLocalExpenses(expenses: FinancialTransaction[]) {
  try {
    localStorage.setItem('udulfa_local_expenses', JSON.stringify(expenses))
  } catch {
    // ignore
  }
}

interface FinanceState {
  transactions: FinancialTransaction[]
  isLoading: boolean
  fetchTransactions: () => Promise<void>
  addExpense: (expense: {
    namaKegiatan: string
    tanggal: string
    waktu?: string
    nominal: number
  }) => Promise<boolean>
  deleteExpense: (id: string, backendId?: number) => Promise<boolean>
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  transactions: loadLocalExpenses(),
  isLoading: false,

  fetchTransactions: async () => {
    set({ isLoading: true })
    try {
      const [laporan, expenses] = await Promise.all([
        api.transaksi.getLaporan().catch(() => [] as ApiTransactionReceipt[]),
        api.pengeluaran.getAll().catch(() => [] as ApiExpense[]),
      ])

      const pemasukanList: FinancialTransaction[] = (laporan || []).map((trx) => {
        const d = new Date(trx.tanggal)
        const dateStr = d.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        const timeStr = d.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        })
        return {
          id: `TRX-${trx.id}`,
          backendId: trx.id,
          no: 0,
          tanggalWaktu: `${dateStr}, ${timeStr}`,
          isoDate: trx.tanggal,
          keterangan: `Penjualan Kasir (${trx.no_transaksi})`,
          kategori: 'Pemasukan',
          nominal: Number(trx.total_harga) || 0,
        }
      })

      const pengeluaranList: FinancialTransaction[] = (expenses || []).map((exp) => {
        const d = new Date(exp.tanggal)
        const dateStr = d.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        const timeStr = d.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        })
        return {
          id: `EXP-${exp.id}`,
          backendId: exp.id,
          no: 0,
          tanggalWaktu: `${dateStr}, ${timeStr}`,
          isoDate: exp.tanggal,
          keterangan: exp.keterangan,
          kategori: 'Pengeluaran',
          nominal: Number(exp.jumlah) || 0,
        }
      })

      // Gabungkan dan urutkan transaksi terbaru di atas
      const merged = [...pemasukanList, ...pengeluaranList]
        .sort((a, b) => {
          const timeA = a.isoDate ? new Date(a.isoDate).getTime() : 0
          const timeB = b.isoDate ? new Date(b.isoDate).getTime() : 0
          return timeB - timeA
        })
        .map((tx, idx) => ({
          ...tx,
          no: idx + 1,
        }))

      // Simpan pengeluaran lokal sebagai sinkronisasi
      saveLocalExpenses(pengeluaranList)

      set({ transactions: merged, isLoading: false })
    } catch (err: any) {
      console.warn('Gagal memuat laporan transaksi & pengeluaran:', err)
      set({ isLoading: false })
    }
  },

  addExpense: async ({ namaKegiatan, tanggal, waktu, nominal }) => {
    // Format tanggal ke YYYY-MM-DD
    let isoDate: string | undefined
    try {
      const parts = tanggal.split('/')
      if (parts.length === 3) {
        isoDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`
      }
    } catch {
      isoDate = new Date().toISOString().slice(0, 10)
    }

    try {
      await api.pengeluaran.create({
        keterangan: namaKegiatan,
        jumlah: nominal,
        tanggal: isoDate,
      })
      await get().fetchTransactions()
      return true
    } catch (err) {
      console.warn('Gagal kirim pengeluaran ke API backend, fallback simpan lokal:', err)
      const now = new Date()
      const fallbackTime = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      })
      const finalTime = waktu ? waktu.replace(/\s*WIB/i, '').trim() : fallbackTime
      const newTx: FinancialTransaction = {
        id: `FT-${Date.now()}`,
        no: 1,
        tanggalWaktu: `${tanggal}, ${finalTime}`,
        keterangan: namaKegiatan,
        kategori: 'Pengeluaran',
        nominal,
      }

      const existingExpenses = get().transactions.filter(
        (t) => t.kategori === 'Pengeluaran'
      )
      const updatedExpenses = [newTx, ...existingExpenses]
      saveLocalExpenses(updatedExpenses)

      const merged = [newTx, ...get().transactions].map((tx, idx) => ({
        ...tx,
        no: idx + 1,
      }))

      set({ transactions: merged })
      return false
    }
  },

  deleteExpense: async (id: string, backendId?: number) => {
    if (backendId) {
      try {
        await api.pengeluaran.delete(backendId)
        await get().fetchTransactions()
        return true
      } catch (err) {
        console.warn('Gagal menghapus pengeluaran di server:', err)
      }
    }

    // Fallback hapus lokal
    const updated = get().transactions.filter((tx) => tx.id !== id)
    saveLocalExpenses(updated.filter((t) => t.kategori === 'Pengeluaran'))
    set({
      transactions: updated.map((t, idx) => ({ ...t, no: idx + 1 })),
    })
    return true
  },
}))
