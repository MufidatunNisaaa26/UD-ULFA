import { createPortal } from 'react-dom'
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Clock,
  ShoppingBag,
  CheckCircle2,
  Printer,
  AlertCircle,
} from 'lucide-react'
import {
  useTransactionPos,
  type PosCategoryFilter,
} from '../hooks/useTransactionPos'

const CATEGORY_TABS: PosCategoryFilter[] = [
  'Semua',
  'ATK',
  'Perlengkapan Sekolah',
  'Perlengkapan Jenazah',
]

export function TransactionPosView() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    transactionNumber,
    currentTime,
    totalItems,
    subtotal,
    discount,
    totalBayar,
    cashInput,
    handleCashChange,
    setExactCash,
    kembalian,
    validationError,
    handleSaveTransaction,
    handleCancelTransaction,
    successModalOpen,
    completedReceipt,
    handleCloseSuccessModal,
  } = useTransactionPos()

  return (
    <div className="w-full h-full min-h-0 flex flex-col lg:flex-row gap-3.5 sm:gap-4 select-none overflow-y-auto lg:overflow-hidden pb-1">
      {/* 1. Kolom Kiri: Katalog Produk (Grid Produk) */}
      <div className="flex-1 bg-white rounded-[20px] p-3.5 sm:p-5 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/50 flex flex-col min-h-[420px] lg:min-h-0 lg:h-full overflow-hidden">
        {/* Search Bar */}
        <div className="relative mb-3 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama barang, barcode, atau kategori..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-[13px] rounded-[15px] bg-[#fcfaff] border border-purple-100/80 shadow-[0_2px_12px_rgba(103,62,232,0.03)] focus:outline-none focus:border-[#673ee8] focus:bg-white text-slate-800 placeholder:text-slate-400 transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 mb-3 shrink-0 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedCategory(tab)}
                className={`px-3.5 py-1.5 rounded-[12px] text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#673ee8] text-white shadow-sm shadow-purple-600/25'
                    : 'bg-[#f0e9fd]/60 hover:bg-[#f0e9fd] text-slate-600 hover:text-[#673ee8]'
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {/* Product Grid (Scrollable) */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          {filteredProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <ShoppingBag className="w-10 h-10 mb-2 stroke-[1.5] text-purple-300" />
              <p className="text-xs sm:text-sm font-semibold text-slate-600">
                Barang tidak ditemukan
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Coba gunakan kata kunci pencarian atau kategori lain
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5 pb-2">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-[15px] border border-slate-100 hover:border-purple-200/80 shadow-[0_2px_10px_rgba(103,62,232,0.03)] hover:shadow-md transition-all p-2.5 flex flex-col justify-between group"
                >
                  {/* Gambar Produk */}
                  <div className="w-full aspect-[4/3] rounded-[12px] bg-[#f5f3fb] overflow-hidden mb-2 relative flex items-center justify-center">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>

                  {/* Nama Produk */}
                  <p className="text-xs sm:text-[13px] font-bold text-slate-800 line-clamp-2 leading-tight min-h-[32px] mb-2">
                    {product.name}
                  </p>

                  {/* Baris Harga & Tombol Tambah [+] */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100/60">
                    <span className="text-xs sm:text-[13px] font-extrabold text-[#673ee8]">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    <button
                      type="button"
                      onClick={() => addItem(product)}
                      title="Tambah ke Keranjang"
                      className="w-7 h-7 rounded-[8px] bg-[#673ee8] hover:bg-[#582bc4] active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs shadow-purple-600/20"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Kolom Kanan: Panel Kasir & Keranjang Transaksi */}
      <div className="w-full lg:w-80 xl:w-[350px] shrink-0 flex flex-col justify-between bg-white rounded-[20px] p-3.5 sm:p-4 border border-purple-100/50 shadow-[0_4px_24px_rgba(103,62,232,0.04)] min-h-[480px] lg:min-h-0 lg:h-full overflow-hidden">
        {/* Header Panel Kasir: Nomor Transaksi & Waktu */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 shrink-0">
          <div className="bg-[#f0e9fd] text-[#673ee8] font-bold text-xs px-2.5 py-1 rounded-[8px] flex items-center gap-1 shadow-2xs">
            <span>#</span>
            <span>{transactionNumber.replace('#', '')}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{currentTime}</span>
          </div>
        </div>

        {/* Daftar Barang di Keranjang (Scrollable) */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 my-2.5 space-y-2">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <ShoppingBag className="w-8 h-8 mb-2 stroke-[1.5] text-purple-300" />
              <p className="text-xs font-semibold text-slate-600">
                Keranjang Masih Kosong
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Klik ikon (+) pada produk untuk mulai transaksi kasir
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#fcfaff] hover:bg-[#f8f5fe] border border-purple-100/60 rounded-[12px] p-2.5 transition-colors"
              >
                {/* Baris Atas: Nama, Harga Satuan, & Hapus */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-xs text-slate-800 leading-tight truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                      Rp {item.unitPrice.toLocaleString('id-ID')} / unit
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    title="Hapus dari Keranjang"
                    className="text-slate-400 hover:text-rose-500 cursor-pointer p-0.5 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Baris Bawah: Stepper Kuantitas [- 2 +] & Subtotal */}
                <div className="flex items-center justify-between pt-2 mt-1">
                  <div className="flex items-center bg-white rounded-[8px] border border-slate-200/90 shadow-2xs p-0.5">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-5 h-5 rounded-[6px] hover:bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center text-xs font-bold text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-5 h-5 rounded-[6px] hover:bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-xs sm:text-[13px] font-extrabold text-slate-800">
                    Rp {item.subtotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Ringkasan & Form Pembayaran (Bawah) */}
        <div className="border-t border-slate-100 pt-2.5 space-y-2 shrink-0">
          {/* Ringkasan Angka */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Total Barang</span>
              <span className="font-semibold text-slate-800">{totalItems} Item</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-800">
                Rp {subtotal.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Diskon</span>
              <span className="font-semibold text-emerald-600">
                Rp {discount.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="border-t border-dashed border-slate-200 pt-1.5 flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-800">Total Bayar</span>
              <span className="text-base sm:text-lg font-black text-[#673ee8]">
                Rp {totalBayar.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Form Input Pembayaran Tunai */}
          <div className="pt-1">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-semibold text-slate-600">
                Uang Diterima (Tunai)
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={setExactCash}
                  className="text-[10px] text-[#673ee8] hover:underline font-bold cursor-pointer"
                >
                  Uang Pas
                </button>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                  Tunai
                </span>
              </div>
            </div>

            <div className="relative rounded-[12px] bg-[#f8f7fd] border border-purple-100/80 focus-within:border-[#673ee8] focus-within:bg-white flex items-center px-3 py-1.5 transition-all">
              <span className="text-xs font-bold text-slate-400 mr-2">Rp</span>
              <input
                type="text"
                inputMode="numeric"
                value={cashInput}
                onChange={(e) => handleCashChange(e.target.value)}
                placeholder="0"
                className="text-xs sm:text-sm font-extrabold text-slate-800 w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Kembalian */}
          <div className="flex justify-between items-center text-xs py-1">
            <span className="text-slate-500 font-semibold">Kembalian</span>
            <span
              className={`text-xs sm:text-sm font-black ${
                kembalian < 0 ? 'text-rose-600' : 'text-emerald-600'
              }`}
            >
              {kembalian < 0
                ? `- Rp ${Math.abs(kembalian).toLocaleString('id-ID')}`
                : `Rp ${kembalian.toLocaleString('id-ID')}`}
            </span>
          </div>

          {/* Pesan Validasi Jika Ada */}
          {validationError && (
            <div className="flex items-center gap-1.5 text-[11px] text-rose-600 bg-rose-50 px-2.5 py-1.5 rounded-[8px]">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Tombol Aksi: Batal & Simpan */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleCancelTransaction}
              className="px-4 py-2.5 rounded-[12px] bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer shadow-2xs transition-all"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSaveTransaction}
              className="flex-1 py-2.5 rounded-[12px] bg-[#673ee8] hover:bg-[#582bc4] active:scale-[0.98] text-white text-xs font-bold cursor-pointer shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Simpan</span>
            </button>
          </div>
        </div>
      </div>

      {/* POPUP MODAL STRUK BERHASIL / SUKSES */}
      {successModalOpen && completedReceipt &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4 animate-in fade-in duration-150"
            onClick={handleCloseSuccessModal}
          >
            <div
              className="bg-white rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-purple-100 max-w-[360px] w-full p-5 sm:p-6 text-center select-none animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ikon Sukses */}
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Transaksi Berhasil Disimpan!
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                {completedReceipt.transactionNumber} • {completedReceipt.time}
              </p>

              {/* Rincian Nota Struk */}
              <div className="bg-[#faf8fe] rounded-[15px] p-3 text-left space-y-1.5 text-xs mb-4 border border-purple-100/60">
                <div className="flex justify-between text-slate-500 pb-1.5 border-b border-slate-200">
                  <span>Jumlah Barang</span>
                  <span className="font-bold text-slate-800">
                    {completedReceipt.items.reduce((a, b) => a + b.quantity, 0)} Pcs
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Bayar</span>
                  <span className="font-bold text-[#673ee8]">
                    Rp {completedReceipt.totalBayar.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Uang Diterima</span>
                  <span className="font-semibold text-slate-800">
                    Rp {completedReceipt.cashReceived.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold pt-1 border-t border-slate-200">
                  <span>Kembalian</span>
                  <span>Rp {completedReceipt.change.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Tombol Cetak & Tutup */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-2 px-3 rounded-[12px] bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Struk</span>
                </button>
                <button
                  type="button"
                  onClick={handleCloseSuccessModal}
                  className="flex-1 py-2 px-3 rounded-[12px] bg-[#673ee8] hover:bg-[#582bc4] text-white text-xs font-semibold cursor-pointer shadow-sm"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default TransactionPosView
