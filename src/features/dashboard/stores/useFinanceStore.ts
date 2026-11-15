import { create } from 'zustand'

export interface FinancialTransaction {
  id: string
  no: number
  tanggalWaktu: string
  keterangan: string
  kategori: 'Pemasukan' | 'Pengeluaran'
  nominal: number
}

const INITIAL_FINANCIAL_TRANSACTIONS: FinancialTransaction[] = [
  {
    id: 'FT-01',
    no: 1,
    tanggalWaktu: '9 Nov 2026, 16:45',
    keterangan: 'Penjualan',
    kategori: 'Pemasukan',
    nominal: 350000,
  },
  {
    id: 'FT-02',
    no: 2,
    tanggalWaktu: '9 Nov 2026, 15:30',
    keterangan: 'Belanja Seragam',
    kategori: 'Pengeluaran',
    nominal: 500000,
  },
  {
    id: 'FT-03',
    no: 3,
    tanggalWaktu: '9 Nov 2026, 14:50',
    keterangan: 'Penjualan',
    kategori: 'Pemasukan',
    nominal: 180000,
  },
  {
    id: 'FT-04',
    no: 4,
    tanggalWaktu: '9 Nov 2026, 14:15',
    keterangan: 'Belanja Seragam',
    kategori: 'Pengeluaran',
    nominal: 1350000,
  },
  {
    id: 'FT-05',
    no: 5,
    tanggalWaktu: '9 Nov 2026, 13:40',
    keterangan: 'Penjualan',
    kategori: 'Pemasukan',
    nominal: 420000,
  },
  {
    id: 'FT-06',
    no: 6,
    tanggalWaktu: '9 Nov 2026, 12:45',
    keterangan: 'Penjualan',
    kategori: 'Pemasukan',
    nominal: 210000,
  },
  {
    id: 'FT-07',
    no: 7,
    tanggalWaktu: '9 Nov 2026, 12:00',
    keterangan: 'Belanja Perlengkapan Sekolah',
    kategori: 'Pengeluaran',
    nominal: 220000,
  },
  {
    id: 'FT-08',
    no: 8,
    tanggalWaktu: '9 Nov 2026, 11:40',
    keterangan: 'Penjualan',
    kategori: 'Pemasukan',
    nominal: 310000,
  },
  {
    id: 'FT-09',
    no: 9,
    tanggalWaktu: '9 Nov 2026, 11:10',
    keterangan: 'Belanja ATK',
    kategori: 'Pengeluaran',
    nominal: 650000,
  },
  {
    id: 'FT-10',
    no: 10,
    tanggalWaktu: '9 Nov 2026, 10:45',
    keterangan: 'Penjualan',
    kategori: 'Pemasukan',
    nominal: 175000,
  },
  {
    id: 'FT-11',
    no: 11,
    tanggalWaktu: '9 Nov 2026, 10:25',
    keterangan: 'Penjualan',
    kategori: 'Pemasukan',
    nominal: 290000,
  },
  {
    id: 'FT-12',
    no: 12,
    tanggalWaktu: '9 Nov 2026, 10:00',
    keterangan: 'Belanja Perlengkapan Jenazah',
    kategori: 'Pengeluaran',
    nominal: 420000,
  },
]

interface FinanceState {
  transactions: FinancialTransaction[]
  addExpense: (expense: {
    namaKegiatan: string
    tanggal: string
    waktu?: string
    nominal: number
  }) => void
}

export const useFinanceStore = create<FinanceState>((set) => ({
  transactions: INITIAL_FINANCIAL_TRANSACTIONS,

  addExpense: ({ namaKegiatan, tanggal, waktu, nominal }) => {
    set((state) => {
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

      const updated = [newTx, ...state.transactions].map((tx, idx) => ({
        ...tx,
        no: idx + 1,
      }))

      return { transactions: updated }
    })
  },
}))

