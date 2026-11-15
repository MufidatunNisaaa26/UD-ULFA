import { useState, useMemo } from 'react'
import {
  Search,
  Download,
  Printer,
  ReceiptText,
  Check,
  ArrowLeft,
} from 'lucide-react'

export interface ReceiptItemLine {
  name: string
  qty: number
  price: number
  total: number
}

export interface TransactionReceipt {
  no: number
  id: string
  totalPcs: number
  totalAmount: number
  waktu: string
  dateStr: string
  items: ReceiptItemLine[]
  tunai: number
  kembalian: number
  diskon: number
}

const ALL_TRANSACTIONS: TransactionReceipt[] = [
  {
    no: 1,
    id: 'TR-20261108-0128',
    totalPcs: 6,
    totalAmount: 38500,
    waktu: '17:42 WIB',
    dateStr: '08/11/2026 17:42 WIB',
    tunai: 50000,
    kembalian: 11500,
    diskon: 0,
    items: [
      { name: 'Buku Tulis SiDU 38 lbr', qty: 3, price: 4500, total: 13500 },
      { name: 'Pensil 2B Faber-Castell', qty: 2, price: 5000, total: 10000 },
      { name: 'Penghapus Joyko Hitam', qty: 1, price: 15000, total: 15000 },
    ],
  },
  {
    no: 2,
    id: 'TR-20261108-0127',
    totalPcs: 2,
    totalAmount: 61000,
    waktu: '17:15 WIB',
    dateStr: '08/11/2026 17:15 WIB',
    tunai: 100000,
    kembalian: 39000,
    diskon: 0,
    items: [
      { name: 'Kain Kafan Mori 12m', qty: 1, price: 55000, total: 55000 },
      { name: 'Kapur Barus Bulat 50gr', qty: 1, price: 6000, total: 6000 },
    ],
  },
  {
    no: 3,
    id: 'TR-20261108-0126',
    totalPcs: 13,
    totalAmount: 47000,
    waktu: '16:50 WIB',
    dateStr: '08/11/2026 16:50 WIB',
    tunai: 50000,
    kembalian: 3000,
    diskon: 0,
    items: [
      { name: 'Penggaris Besi 30cm', qty: 3, price: 6000, total: 18000 },
      { name: 'Sampul Buku Coklat', qty: 10, price: 2900, total: 29000 },
    ],
  },
  {
    no: 4,
    id: 'TR-20261108-0125',
    totalPcs: 2,
    totalAmount: 84000,
    waktu: '16:22 WIB',
    dateStr: '08/11/2026 16:22 WIB',
    tunai: 100000,
    kembalian: 16000,
    diskon: 0,
    items: [
      { name: 'Tas Ransel Anak SD', qty: 1, price: 75000, total: 75000 },
      { name: 'Tempat Pensil Karakter', qty: 1, price: 9000, total: 9000 },
    ],
  },
  {
    no: 5,
    id: 'TR-20261108-0124',
    totalPcs: 3,
    totalAmount: 32500,
    waktu: '15:58 WIB',
    dateStr: '08/11/2026 15:58 WIB',
    tunai: 50000,
    kembalian: 17500,
    diskon: 0,
    items: [
      { name: 'Tipe-X Kertas Joyko', qty: 2, price: 10000, total: 20000 },
      { name: 'Spidol Snowman Hitam', qty: 1, price: 12500, total: 12500 },
    ],
  },
  {
    no: 6,
    id: 'TR-20261108-0123',
    totalPcs: 3,
    totalAmount: 54000,
    waktu: '15:30 WIB',
    dateStr: '08/11/2026 15:30 WIB',
    tunai: 60000,
    kembalian: 6000,
    diskon: 0,
    items: [
      { name: 'Minyak Wangi Melati 100ml', qty: 1, price: 35000, total: 35000 },
      { name: 'Sabun Mandi Jenazah', qty: 2, price: 9500, total: 19000 },
    ],
  },
  {
    no: 7,
    id: 'TR-20261108-0122',
    totalPcs: 3,
    totalAmount: 31000,
    waktu: '14:45 WIB',
    dateStr: '08/11/2026 14:45 WIB',
    tunai: 50000,
    kembalian: 19000,
    diskon: 0,
    items: [
      { name: 'Buku Gambar A3', qty: 2, price: 11000, total: 22000 },
      { name: 'Crayon Titi 12 Warna', qty: 1, price: 9000, total: 9000 },
    ],
  },
  {
    no: 8,
    id: 'TR-20261108-0121',
    totalPcs: 4,
    totalAmount: 26500,
    waktu: '14:10 WIB',
    dateStr: '08/11/2026 14:10 WIB',
    tunai: 30000,
    kembalian: 3500,
    diskon: 0,
    items: [
      { name: 'Sticky Notes Joyko 3x3', qty: 2, price: 7500, total: 15000 },
      { name: 'Klip Kertas Warna', qty: 2, price: 5750, total: 11500 },
    ],
  },
  {
    no: 9,
    id: 'TR-20261108-0120',
    totalPcs: 7,
    totalAmount: 49000,
    waktu: '13:35 WIB',
    dateStr: '08/11/2026 13:35 WIB',
    tunai: 50000,
    kembalian: 1000,
    diskon: 0,
    items: [
      { name: 'Map Plastik L Transparan', qty: 5, price: 4000, total: 20000 },
      { name: 'Kertas Folio Bergaris', qty: 2, price: 14500, total: 29000 },
    ],
  },
  {
    no: 10,
    id: 'TR-20261108-0119',
    totalPcs: 5,
    totalAmount: 74000,
    waktu: '12:50 WIB',
    dateStr: '08/11/2026 12:50 WIB',
    tunai: 100000,
    kembalian: 26000,
    diskon: 0,
    items: [
      { name: 'Buku Tulis SiDU 38 lbr', qty: 2, price: 4500, total: 9000 },
      { name: 'Bolpoin Pilot G2 0.5', qty: 1, price: 15000, total: 15000 },
      { name: 'Kain Kafan Mori Super 1m', qty: 2, price: 25000, total: 50000 },
    ],
  },
  {
    no: 11,
    id: 'TR-20261108-0118',
    totalPcs: 8,
    totalAmount: 52000,
    waktu: '11:30 WIB',
    dateStr: '08/11/2026 11:30 WIB',
    tunai: 60000,
    kembalian: 8000,
    diskon: 0,
    items: [
      { name: 'Amplop Putih Garis (1 Pack)', qty: 2, price: 16000, total: 32000 },
      { name: 'Lem Kertas Glukol Sedang', qty: 6, price: 3333, total: 20000 },
    ],
  },
  {
    no: 12,
    id: 'TR-20261108-0117',
    totalPcs: 1,
    totalAmount: 18000,
    waktu: '10:15 WIB',
    dateStr: '08/11/2026 10:15 WIB',
    tunai: 20000,
    kembalian: 2000,
    diskon: 0,
    items: [
      { name: 'Kapur Barus Pengawet 500gr', qty: 1, price: 18000, total: 18000 },
    ],
  },
]

export function TransactionReceiptDetailView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedReceiptId, setSelectedReceiptId] = useState('TR-20261108-0128')
  const [mobileActiveTab, setMobileActiveTab] = useState<'list' | 'preview'>('list')

  // Temukan struk yang sedang dipilih
  const currentReceipt = useMemo(() => {
    return (
      ALL_TRANSACTIONS.find((t) => t.id === selectedReceiptId) ||
      ALL_TRANSACTIONS[0]
    )
  }, [selectedReceiptId])

  // Filter daftar struk
  const filteredTransactions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return ALL_TRANSACTIONS.filter((trx) => {
      const matchSearch =
        trx.id.toLowerCase().includes(q) ||
        trx.items.some((item) => item.name.toLowerCase().includes(q))
      return matchSearch
    })
  }, [searchQuery])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5 h-full min-h-0 select-none pb-1 overflow-hidden">
      {/* Kolom Kiri: Input Pencarian di atas + Tabel Struk di bawah */}
      <div
        className={`lg:col-span-7 flex flex-col gap-3 h-full min-h-0 overflow-hidden ${
          mobileActiveTab === 'list' ? 'flex' : 'hidden lg:flex'
        }`}
      >
        {/* Input Pencarian */}
        <div className="relative w-full shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari No. Struk / ID Transaksi atau barang..."
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-[15px] bg-white border border-purple-100/80 shadow-[0_2px_12px_rgba(103,62,232,0.04)] focus:outline-none focus:border-[#673ee8] text-slate-800 placeholder:text-slate-400 transition-all"
          />
        </div>

        {/* Switcher Tab Khusus Tampilan Mobile & Tablet (< lg) */}
        <div className="flex lg:hidden items-center p-1 bg-white rounded-[15px] border border-purple-100/70 shadow-2xs shrink-0">
          <button
            type="button"
            onClick={() => setMobileActiveTab('list')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-[15px] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mobileActiveTab === 'list'
                ? 'bg-[#673ee8] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ReceiptText className="w-3.5 h-3.5" />
            <span>Daftar Struk</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10">
              {filteredTransactions.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMobileActiveTab('preview')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-[15px] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mobileActiveTab === 'preview'
                ? 'bg-[#673ee8] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Preview Struk</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </button>
        </div>

        {/* Kartu Tabel Riwayat Struk */}
        <div className="flex-1 bg-white rounded-[15px] p-3 sm:p-4 lg:p-5 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/40 flex flex-col min-h-0 overflow-hidden">
          {/* Header Tabel Berwarna (Fixed di atas, di luar area scroll) */}
          <div className="shrink-0 mb-1.5 pr-1">
            <table className="w-full text-left text-xs border-collapse table-fixed">
              <thead>
                <tr className="bg-[#f0e9fd] text-[#673ee8] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-2 text-center w-12 rounded-l-[15px]">NO.</th>
                  <th className="py-3 px-3">ID STRUK</th>
                  <th className="py-3 px-3 text-center w-28 sm:w-32">WAKTU</th>
                  <th className="py-3 px-3 text-right w-24 sm:w-28 rounded-r-[15px]">AKSI</th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Area Scroll Daftar Struk: Scrollbar mulai persis dari baris pertama struk */}
          <div className="overflow-y-auto flex-1 min-h-0 pr-1">
            <table className="w-full text-left text-xs border-collapse table-fixed">
              <tbody className="divide-y divide-slate-100/80">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400 text-xs">
                      Tidak ada transaksi ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((trx) => {
                    const isSelected = selectedReceiptId === trx.id

                    return (
                      <tr
                        key={trx.id}
                        onClick={() => {
                          setSelectedReceiptId(trx.id)
                          setMobileActiveTab('preview')
                        }}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#faf8fe]' : 'hover:bg-[#fcfaff]'
                        }`}
                      >
                        {/* NO */}
                        <td className="py-3 px-2 text-center text-slate-500 font-medium w-12">
                          {trx.no}
                        </td>

                        {/* ID STRUK & Ringkasan */}
                        <td className="py-3 px-3">
                          <p
                            className={`font-bold text-xs ${
                              isSelected ? 'text-[#673ee8]' : 'text-slate-800'
                            }`}
                          >
                            {trx.id}
                          </p>
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5 truncate">
                            {trx.totalPcs} Pcs • Rp {trx.totalAmount.toLocaleString('id-ID')}
                          </p>
                        </td>

                        {/* WAKTU */}
                        <td className="py-3 px-3 text-center text-slate-500 font-medium whitespace-nowrap text-xs w-28 sm:w-32">
                          {trx.waktu}
                        </td>

                        {/* TOMBOL AKSI: Pilih / Terpilih */}
                        <td className="py-3 px-3 text-right w-24 sm:w-28">
                          {isSelected ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[15px] bg-[#673ee8] text-white text-xs font-semibold shadow-xs">
                              <Check className="w-3.5 h-3.5" />
                              <span>Terpilih</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedReceiptId(trx.id)
                                setMobileActiveTab('preview')
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[15px] bg-[#f4effe] hover:bg-purple-100 text-[#673ee8] text-xs font-semibold transition-colors cursor-pointer"
                            >
                              <ReceiptText className="w-3.5 h-3.5" />
                              <span>Pilih</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Preview Struk Termal Kasir (5/12 di Desktop, Tab di Mobile) */}
        <div
          className={`lg:col-span-5 h-full bg-white rounded-[15px] p-3 sm:p-4 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/40 flex-col justify-between min-h-0 overflow-hidden w-full ${
            mobileActiveTab === 'preview' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Bar navigasi balik ke list khusus mobile */}
          <div className="flex lg:hidden items-center justify-between pb-2 mb-1 border-b border-slate-100 shrink-0">
            <button
              type="button"
              onClick={() => setMobileActiveTab('list')}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#673ee8] hover:text-[#5326cf] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Daftar Struk ({filteredTransactions.length})</span>
            </button>
            <span className="text-[10px] font-semibold text-slate-400">
              {currentReceipt.id}
            </span>
          </div>

          {/* Area Kertas Struk: Full Height, dengan flexible space antara item barang dan total */}
          <div className="flex-1 min-h-0 flex flex-col items-center justify-between w-full">
            <div
              id="thermal-receipt-print"
              className="w-full max-w-full sm:max-w-[420px] mx-auto h-full flex-1 bg-[#fcfbfe] border border-slate-200/80 rounded-[15px] p-3 sm:p-4 md:p-4.5 font-mono text-slate-800 shadow-2xs flex flex-col justify-between overflow-hidden transition-all"
            >
              {/* BAGIAN ATAS: Kop Toko, Info Transaksi, & Daftar Item Belanja */}
              <div className="shrink-0 flex flex-col">
                {/* Kop Toko */}
                <div className="text-center pb-2">
                  <h4 className="font-bold text-xs sm:text-sm tracking-widest text-slate-900">
                    UD ULFA
                  </h4>
                  <p className="text-[9.5px] sm:text-[10.5px] text-slate-500 mt-0.5">
                    Retail &amp; Perlengkapan Toko
                  </p>
                  <p className="text-[9.5px] sm:text-[10.5px] text-slate-500">
                    Jl. Raya Pucuk No. 45, Lamongan
                  </p>
                </div>

                {/* Informasi Transaksi */}
                <div className="text-[10px] sm:text-[11px] space-y-0.5 py-1.5 border-t border-dashed border-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">No. Nota</span>
                    <span className="font-semibold text-slate-900">{currentReceipt.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Waktu</span>
                    <span>{currentReceipt.dateStr}</span>
                  </div>
                </div>

                {/* Daftar Produk Belanja */}
                <div className="py-1.5 border-t border-dashed border-slate-300 space-y-1.5 overflow-y-auto max-h-[30vh] sm:max-h-[35vh]">
                  {currentReceipt.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col text-[10.5px] sm:text-[11.5px]">
                      <div className="flex justify-between font-medium">
                        <span className="truncate pr-2 text-slate-800">{item.name}</span>
                        <span className="shrink-0 font-semibold text-slate-900">
                          Rp {item.total.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="text-[9.5px] sm:text-[10px] text-slate-500">
                        {item.qty} x Rp {item.price.toLocaleString('id-ID')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RUANG KOSONG (FLEX SPACE) ANTARA ITEM BARANG KE TOTAL */}
              <div className="flex-1 min-h-[16px]" />

              {/* BAGIAN BAWAH: Ringkasan Pembayaran & Catatan Kaki (Pinned di Bawah Struk) */}
              <div className="shrink-0">
                {/* Ringkasan Pembayaran */}
                <div className="py-1.5 border-t border-dashed border-slate-300 text-[10px] sm:text-[11px] space-y-0.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      Subtotal ({currentReceipt.totalPcs} Item)
                    </span>
                    <span>Rp {currentReceipt.totalAmount.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Diskon Toko</span>
                    <span>Rp {currentReceipt.diskon.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xs sm:text-sm text-slate-900 pt-1 border-t border-slate-200">
                    <span>TOTAL BAYAR</span>
                    <span>Rp {currentReceipt.totalAmount.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between pt-0.5">
                    <span className="text-slate-500">Tunai</span>
                    <span>Rp {currentReceipt.tunai.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Kembalian</span>
                    <span>Rp {currentReceipt.kembalian.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {/* Catatan Kaki Struk */}
                <div className="text-center pt-2 border-t border-dashed border-slate-300 text-[9.5px] sm:text-[10px] text-slate-500 leading-snug">
                  <p className="font-semibold text-slate-700">
                    Terima kasih telah berbelanja di UD Ulfa
                  </p>
                  <p className="mt-0.5">
                    Barang yang sudah dibeli tidak dapat ditukar/dikembalikan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tombol Aksi Bawah: Pinned di dasar card, kelengkungan 15px */}
          <div className="w-full max-w-full sm:max-w-[420px] mx-auto grid grid-cols-2 gap-2 sm:gap-2.5 pt-2.5 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-3 rounded-[15px] bg-[#673ee8] hover:bg-[#582bc4] text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Struk</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-3 rounded-[15px] bg-[#f0e9fd] hover:bg-[#e6ddfb] text-[#673ee8] text-xs font-semibold transition-all cursor-pointer border border-purple-200/60"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh PDF</span>
            </button>
          </div>
        </div>
      </div>
  )
}

export default TransactionReceiptDetailView
