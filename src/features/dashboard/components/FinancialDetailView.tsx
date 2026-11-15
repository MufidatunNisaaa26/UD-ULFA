import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'

export interface FinancialTransaction {
  no: number
  tanggalWaktu: string
  keterangan: string
  kategori: 'Pemasukan' | 'Pengeluaran'
  nominal: number
}

const FINANCIAL_TRANSACTIONS: FinancialTransaction[] = [
  {
    no: 1,
    tanggalWaktu: '9 Nov 2026, 16:45',
    keterangan: 'Penjualan',
    kategori: 'Pemasukan',
    nominal: 350000,
  },
  {
    no: 2,
    tanggalWaktu: '9 Nov 2026, 15:30',
    keterangan: 'Belanja Seragam',
    kategori: 'Pengeluaran',
    nominal: 500000,
  },
  {
    no: 3,
    tanggalWaktu: '9 Nov 2026, 14:50',
    keterangan: 'Penjualan',
    kategori: 'Pemasukan',
    nominal: 180000,
  },
  {
    no: 4,
    tanggalWaktu: '9 Nov 2026, 14:15',
    keterangan: 'Belanja Seragam',
    kategori: 'Pengeluaran',
    nominal: 1350000,
  },
  {
    no: 5,
    tanggalWaktu: '9 Nov 2026, 13:40',
    keterangan: 'Penjualan',
    kategori: 'Pemasukan',
    nominal: 420000,
  },
  {
    no: 6,
    tanggalWaktu: '9 Nov 2026, 12:45',
    keterangan: 'Penjualan',
    kategori: 'Pemasukan',
    nominal: 210000,
  },
  {
    no: 7,
    tanggalWaktu: '9 Nov 2026, 12:00',
    keterangan: 'Belanja Perlengkapan Sekolah',
    kategori: 'Pengeluaran',
    nominal: 220000,
  },
  {
    no: 8,
    tanggalWaktu: '9 Nov 2026, 11:40',
    keterangan: 'Penjualan',
    kategori: 'Pemasukan',
    nominal: 310000,
  },
  {
    no: 9,
    tanggalWaktu: '9 Nov 2026, 11:10',
    keterangan: 'Belanja ATK',
    kategori: 'Pengeluaran',
    nominal: 650000,
  },
  {
    no: 10,
    tanggalWaktu: '9 Nov 2026, 10:45',
    keterangan: 'Penjualan',
    kategori: 'Pemasukan',
    nominal: 175000,
  },
  {
    no: 11,
    tanggalWaktu: '9 Nov 2026, 10:25',
    keterangan: 'Penjualan',
    kategori: 'Pemasukan',
    nominal: 290000,
  },
  {
    no: 12,
    tanggalWaktu: '9 Nov 2026, 10:00',
    keterangan: 'Belanja Perlengkapan Jenazah',
    kategori: 'Pengeluaran',
    nominal: 420000,
  },
]

export function FinancialDetailView() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTransactions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return FINANCIAL_TRANSACTIONS.filter((trx) => {
      return (
        trx.keterangan.toLowerCase().includes(q) ||
        trx.tanggalWaktu.toLowerCase().includes(q) ||
        trx.kategori.toLowerCase().includes(q) ||
        trx.nominal.toString().includes(q)
      )
    })
  }, [searchQuery])

  return (
    <div className="bg-white rounded-[15px] p-4 sm:p-5 lg:p-6 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/40 flex flex-col h-full min-h-0 select-none pb-1 overflow-hidden">
      {/* Header Bar Kontrol di Dalam Kartu */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3.5 shrink-0">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Riwayat Transaksi
        </h3>

        {/* Search Input */}
        <div className="relative w-full sm:w-64 md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari mutasi, barang, nota..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-[15px] bg-[#faf8fe] border border-purple-100/80 focus:outline-none focus:border-[#673ee8] focus:bg-white text-slate-800 placeholder:text-slate-400 transition-all"
          />
        </div>
      </div>

      {/* Header Tabel Berwarna (Fixed di Luar Area Scroll) */}
      <div className="shrink-0 mb-1.5 pr-1">
        <table className="w-full text-left text-xs border-collapse table-fixed">
          <thead>
            <tr className="bg-[#f0e9fd] text-[#673ee8] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
              <th className="py-3 px-2 text-center w-14 rounded-l-[15px]">NO.</th>
              <th className="py-3 px-4 w-[24%] text-left">TANGGAL WAKTU</th>
              <th className="py-3 px-4 w-[34%] text-left">KETERANGAN</th>
              <th className="py-3 px-4 w-[20%] text-left">KATEGORI</th>
              <th className="py-3 px-4 text-left rounded-r-[15px]">NOMINAL</th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Area Scroll Daftar Transaksi Keuangan: Scrollbar Mulai dari Baris Pertama */}
      <div className="overflow-y-auto flex-1 min-h-0 pr-1">
        <table className="w-full text-left text-xs border-collapse table-fixed">
          <tbody className="divide-y divide-slate-100/80">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-slate-400 text-xs">
                  Tidak ada riwayat mutasi transaksi keuangan yang ditemukan.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((trx) => {
                const isPemasukan = trx.kategori === 'Pemasukan'

                return (
                  <tr
                    key={trx.no}
                    className="hover:bg-[#faf8fe] transition-colors"
                  >
                    {/* NO. */}
                    <td className="py-3.5 px-2 text-center text-slate-500 font-medium w-14">
                      {trx.no}
                    </td>

                    {/* TANGGAL WAKTU */}
                    <td className="py-3.5 px-4 w-[24%] text-left text-slate-600 font-medium text-xs sm:text-[13px] whitespace-nowrap">
                      {trx.tanggalWaktu}
                    </td>

                    {/* KETERANGAN */}
                    <td className="py-3.5 px-4 w-[34%] text-left font-bold text-slate-900 text-xs sm:text-[13px] leading-snug">
                      {trx.keterangan}
                    </td>

                    {/* KATEGORI */}
                    <td className="py-3.5 px-4 w-[20%] text-left whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 rounded-[15px] text-[11px] font-semibold ${
                          isPemasukan
                            ? 'bg-[#d1fae5]/70 text-[#047857]'
                            : 'bg-[#ffe4e6] text-[#b91c1c]'
                        }`}
                      >
                        {trx.kategori}
                      </span>
                    </td>

                    {/* NOMINAL */}
                    <td className="py-3.5 px-4 text-left font-black text-xs sm:text-[14px] whitespace-nowrap">
                      <span
                        className={
                          isPemasukan ? 'text-[#088f8f]' : 'text-[#b91c1c]'
                        }
                      >
                        {isPemasukan ? '+ ' : '- '}Rp{' '}
                        {trx.nominal.toLocaleString('id-ID')}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FinancialDetailView

