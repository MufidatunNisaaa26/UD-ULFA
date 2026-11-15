import { TrendingUp, ChevronRight } from 'lucide-react'

interface FinancialSummaryCardProps {
  onViewAll?: () => void
}

export function FinancialSummaryCard({ onViewAll }: FinancialSummaryCardProps) {
  return (
    <div className="bg-white rounded-[15px] p-4 sm:p-6 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/40 flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[15px] bg-[#f2ecfd] text-[#673ee8] flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#1e153b] tracking-tight">
            Keuangan &amp; Laba
          </h3>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#ecfdf5] text-emerald-700 border border-emerald-200/60">
          Margin 24.2%
        </span>
      </div>

      {/* 2 Metric Cards */}
      <div className="grid grid-cols-2 gap-3.5 my-auto">
        {/* Pemasukan */}
        <div className="rounded-[15px] bg-[#ecfdf5] border border-emerald-100/80 p-4 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>Pemasukan</span>
          </div>
          <p className="text-lg sm:text-xl font-black text-slate-900 mt-2 mb-0.5 tracking-tight">
            Rp 4.825.000
          </p>
          <p className="text-[11px] text-slate-500 font-medium">Total Masuk</p>
        </div>

        {/* Pengeluaran */}
        <div className="rounded-[15px] bg-[#fff1f2] border border-rose-100/80 p-4 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-800">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            <span>Pengeluaran</span>
          </div>
          <p className="text-lg sm:text-xl font-black text-slate-900 mt-2 mb-0.5 tracking-tight">
            Rp 3.665.000
          </p>
          <p className="text-[11px] text-slate-500 font-medium">Total Keluar</p>
        </div>
      </div>

      {/* Footer Link */}
      <div className="flex justify-end pt-3">
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#673ee8] hover:text-[#5229c9] flex items-center gap-0.5 cursor-pointer transition-colors"
        >
          <span>Detail Keuangan</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

export default FinancialSummaryCard

