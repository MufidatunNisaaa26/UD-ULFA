import { Search, TrendingUp, TrendingDown, CheckCircle2, Clock, Trash2 } from 'lucide-react'
import { useFinance } from '../hooks/useFinance'

export function FinanceView() {
  const {
    searchQuery,
    setSearchQuery,
    filteredTransactions,
    namaKegiatan,
    setNamaKegiatan,
    tanggal,
    setTanggal,
    waktuRealtime,
    nominalInput,
    handleNominalChange,
    formErrors,
    toastMessage,
    handleSubmitExpense,
    handleDeleteExpense,
    totalPemasukan,
    totalPengeluaran,
  } = useFinance()

  return (
    <div className="w-full h-full min-h-0 flex flex-col lg:flex-row gap-3.5 sm:gap-4 select-none overflow-y-auto lg:overflow-hidden pb-1 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-[12px] shadow-xl flex items-center gap-2 border border-slate-700/50">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* 1. Kolom Kiri: Riwayat Transaksi Keuangan */}
      <div className="flex-1 bg-white rounded-[20px] p-4 sm:p-5 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/50 flex flex-col min-h-[360px] lg:h-full lg:min-h-0 overflow-hidden">
        {/* Header Bar: Judul & Search Input */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 shrink-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Riwayat Transaksi Keuangan
          </h3>

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

        {/* Header Tabel Berwarna (Fixed di atas) */}
        <div className="shrink-0 mb-1.5 pr-1">
          <table className="w-full text-left text-xs border-collapse table-fixed">
            <thead>
              <tr className="bg-[#f0e9fd] text-[#673ee8] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-2 text-center w-10 rounded-l-[15px]">NO.</th>
                <th className="py-3 px-3 w-[22%] text-left">TANGGAL WAKTU</th>
                <th className="py-3 px-3 w-[30%] text-left">KETERANGAN</th>
                <th className="py-3 px-2 w-[18%] text-center">KATEGORI</th>
                <th className="py-3 px-3 text-right">NOMINAL</th>
                <th className="py-3 px-2 text-center w-10 rounded-r-[15px]"></th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Area Scroll Daftar Transaksi */}
        <div className="overflow-y-auto flex-1 min-h-0 pr-1">
          <table className="w-full text-left text-xs border-collapse table-fixed">
            <tbody className="divide-y divide-slate-100/80">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-xs">
                    Tidak ada riwayat transaksi keuangan ditemukan.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((trx) => {
                  const isPemasukan = trx.kategori === 'Pemasukan'

                  return (
                    <tr
                      key={trx.id || trx.no}
                      className="hover:bg-[#faf8fe] transition-colors group"
                    >
                      {/* NO */}
                      <td className="py-3 px-2 text-center text-slate-500 font-medium w-10">
                        {trx.no}
                      </td>

                      {/* TANGGAL WAKTU */}
                      <td className="py-3 px-3 w-[22%] text-left text-slate-600 font-medium text-xs sm:text-[13px] whitespace-nowrap">
                        {trx.tanggalWaktu}
                      </td>

                      {/* KETERANGAN */}
                      <td className="py-3 px-3 w-[30%] text-left font-bold text-slate-900 text-xs sm:text-[13px] leading-tight">
                        {trx.keterangan}
                      </td>

                      {/* KATEGORI */}
                      <td className="py-3 px-2 w-[18%] text-center whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 rounded-[15px] text-[11px] font-semibold ${
                            isPemasukan
                              ? 'bg-[#d1fae5]/80 text-[#047857]'
                              : 'bg-[#ffe4e6] text-[#b91c1c]'
                          }`}
                        >
                          {trx.kategori}
                        </span>
                      </td>

                      {/* NOMINAL */}
                      <td className="py-3 px-3 text-right font-black text-xs sm:text-[14px] whitespace-nowrap">
                        <span
                          className={
                            isPemasukan ? 'text-[#059669]' : 'text-[#b91c1c]'
                          }
                        >
                          {isPemasukan ? '+ ' : '- '}Rp{' '}
                          {trx.nominal.toLocaleString('id-ID')}
                        </span>
                      </td>

                      {/* AKSI HAPUS (Hanya untuk pengeluaran) */}
                      <td className="py-3 px-2 text-center w-10">
                        {!isPemasukan && (
                          <button
                            type="button"
                            onClick={() => handleDeleteExpense(trx.id, trx.backendId)}
                            title="Hapus Pengeluaran"
                            className="p-1 rounded-[8px] text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all opacity-80 group-hover:opacity-100 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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

      {/* 2. Kolom Kanan: Input Pengeluaran & Ringkasan Hari Ini */}
      <div className="w-full lg:w-80 xl:w-[350px] shrink-0 flex flex-col justify-between bg-white rounded-[20px] p-4 sm:p-5 border border-purple-100/50 shadow-[0_4px_24px_rgba(103,62,232,0.04)] min-h-[460px] lg:h-full lg:min-h-0 overflow-y-auto">
        {/* Form Input Pengeluaran */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Input Pengeluaran
          </h3>

          <form onSubmit={handleSubmitExpense} className="space-y-3">
            {/* Field: Nama Kegiatan / Keperluan */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nama Kegiatan / Keperluan
              </label>
              <input
                type="text"
                value={namaKegiatan}
                onChange={(e) => setNamaKegiatan(e.target.value)}
                placeholder="Contoh: Belanja ATK, Listrik, dll"
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-[14px] bg-[#fcfaff] border text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all ${
                  formErrors.namaKegiatan
                    ? 'border-rose-400 focus:border-rose-500'
                    : 'border-purple-100/80 focus:border-[#673ee8]'
                }`}
              />
              {formErrors.namaKegiatan && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium">
                  {formErrors.namaKegiatan}
                </p>
              )}
            </div>

            {/* Field: Tanggal */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tanggal
              </label>
              <input
                type="text"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                placeholder="09/11/2026"
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-[14px] bg-[#fcfaff] border text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all ${
                  formErrors.tanggal
                    ? 'border-rose-400 focus:border-rose-500'
                    : 'border-purple-100/80 focus:border-[#673ee8]'
                }`}
              />
              {formErrors.tanggal && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium">
                  {formErrors.tanggal}
                </p>
              )}
            </div>

            {/* Field: Waktu (Realtime Read Only) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Waktu
                </label>
                <span className="text-[10px] font-bold text-[#673ee8] bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100/80">
                  Realtime • Read Only
                </span>
              </div>
              <div className="relative">
                <Clock className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  readOnly
                  value={waktuRealtime}
                  tabIndex={-1}
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-[14px] bg-[#f8f5fe] border border-purple-100/80 text-slate-700 cursor-default select-none focus:outline-none"
                />
              </div>
            </div>

            {/* Field: Nominal (Rp) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nominal (Rp)
              </label>
              <div
                className={`w-full px-3.5 py-2.5 rounded-[14px] bg-[#fcfaff] border flex items-center transition-all ${
                  formErrors.nominal
                    ? 'border-rose-400 focus-within:border-rose-500'
                    : 'border-purple-100/80 focus-within:border-[#673ee8]'
                } focus-within:bg-white`}
              >
                <span className="text-xs sm:text-sm font-bold text-slate-400 mr-2">Rp</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={nominalInput}
                  onChange={(e) => handleNominalChange(e.target.value)}
                  placeholder="0"
                  className="w-full text-xs sm:text-sm font-extrabold text-slate-800 outline-none bg-transparent"
                />
              </div>
              {formErrors.nominal && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium">
                  {formErrors.nominal}
                </p>
              )}
            </div>

            {/* Tombol Simpan Pengeluaran */}
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 rounded-[14px] bg-[#673ee8] hover:bg-[#582bc4] active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-md shadow-purple-600/20 cursor-pointer transition-all mt-1"
            >
              Simpan Pengeluaran
            </button>
          </form>
        </div>

        {/* Ringkasan Hari Ini: Proporsional & Rapi */}
        <div className="pt-3 border-t border-slate-100 mt-2.5">
          <p className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-0.5">
            Ringkasan Keuangan
          </p>

          <div className="space-y-2">
            {/* Kartu Pemasukan */}
            <div className="bg-[#fcfaff] hover:bg-[#f8f5fe] border border-purple-100/80 rounded-[15px] p-2.5 sm:p-3 flex items-center justify-between transition-all shadow-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-[#e6f9f0] text-[#059669] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                  Total Pemasukan
                </span>
              </div>
              <span className="text-xs sm:text-sm font-black text-[#059669] tracking-tight whitespace-nowrap pl-2">
                Rp {totalPemasukan.toLocaleString('id-ID')}
              </span>
            </div>

            {/* Kartu Pengeluaran */}
            <div className="bg-[#fcfaff] hover:bg-[#f8f5fe] border border-purple-100/80 rounded-[15px] p-2.5 sm:p-3 flex items-center justify-between transition-all shadow-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-[#feeef0] text-[#b91c1c] flex items-center justify-center shrink-0">
                  <TrendingDown className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                  Total Pengeluaran
                </span>
              </div>
              <span className="text-xs sm:text-sm font-black text-[#b91c1c] tracking-tight whitespace-nowrap pl-2">
                Rp {totalPengeluaran.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinanceView
