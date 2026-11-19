import { create } from 'zustand'
import { api } from '../../../services/api'

export interface FinancialTransaction {
  id: string
  no: number
  tanggalWaktu: string
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
  }) => void
}

export const useFinanceStore = create<FinanceState>((set) => ({
  transactions: loadLocalExpenses(),
  isLoading: false,

  fetchTransactions: async () => {
    set({ isLoading: true })
    try {
      const laporan = await api.transaksi.getLaporan()
      const pemasukanList: FinancialTransaction[] = laporan.map((trx) => {
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
          no: 0,
          tanggalWaktu: `${dateStr}, ${timeStr}`,
          keterangan: `Penjualan Kasir (${trx.no_transaksi})`,
          kategori: 'Pemasukan',
          nominal: Number(trx.total_harga) || 0,
        }
      })

      const localExpenses = loadLocalExpenses()
      const merged = [...localExpenses, ...pemasukanList].map((tx, idx) => ({
        ...tx,
        no: idx + 1,
      }))

      set({ transactions: merged, isLoading: false })
    } catch (err: any) {
      console.warn('Gagal memuat laporan transaksi:', err)
      set({ isLoading: false })
    }
  },

  addExpense: ({ namaKegiatan, tanggal, waktu, nominal }) => {
    set((state) => {
      const now = new Date()
      const fallbackTime = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      })
      const finalTime = waktu
        ? waktu.replace(/\s*WIB/i, '').trim()
        : fallbackTime
      const newTx: FinancialTransaction = {
        id: `FT-${Date.now()}`,
        no: 1,
        tanggalWaktu: `${tanggal}, ${finalTime}`,
        keterangan: namaKegiatan,
        kategori: 'Pengeluaran',
        nominal,
      }

      const existingExpenses = state.transactions.filter(
        (t) => t.kategori === 'Pengeluaran'
      )
      const updatedExpenses = [newTx, ...existingExpenses]
      saveLocalExpenses(updatedExpenses)

      const merged = [newTx, ...state.transactions].map((tx, idx) => ({
        ...tx,
        no: idx + 1,
      }))

      return { transactions: merged }
    })
  },
}))
