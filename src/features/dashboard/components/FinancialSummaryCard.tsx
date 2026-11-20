import { useMemo } from 'react'
import { TrendingUp, ChevronRight } from 'lucide-react'
import { useFinanceStore } from '../stores/useFinanceStore'

interface FinancialSummaryCardProps {
  onViewAll?: () => void
}

export function FinancialSummaryCard({ onViewAll }: FinancialSummaryCardProps) {
  const { transactions } = useFinanceStore()

  const { totalPemasukan, totalPengeluaran, marginStr } = useMemo(() => {
    let masuk = 0
    let keluar = 0

    for (const t of transactions) {
      if (t.kategori === 'Pemasukan') {
        masuk += t.nominal
      } else if (t.kategori === 'Pengeluaran') {
        keluar += t.nominal
      }
    }

    let margin = 0
    if (masuk > 0) {
      margin = ((masuk - keluar) / masuk) * 100
    }

    return {
      totalPemasukan: masuk,
      totalPengeluaran: keluar,
      marginStr: `${margin.toFixed(1)}%`,
    }
  }, [transactions])

  return (
    <div className="bg-white rounded-[15px] p-3.5 sm:p-5 lg:p-4 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/40 flex flex-col justify-between h-full select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[15px] bg-[#f2ecfd] text-[#673ee8] flex items-center justify-center shrink-0">
            <TrendingUp className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#1e153b] tracking-tight">
            Keuangan &amp; Laba
          </h3>
        </div>

        <span className="text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#ecfdf5] text-emerald-700 border border-emerald-200/60">
          Margin {marginStr}
        </span>
      </div>

      {/* 2 Metric Cards */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 my-auto">
        {/* Pemasukan */}
        <div className="rounded-[15px] bg-[#ecfdf5] border border-emerald-100/80 p-2.5 sm:p-4 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>Pemasukan</span>
          </div>
          <p className="text-base sm:text-lg lg:text-xl font-black text-slate-900 mt-1 sm:mt-2 mb-0.5 tracking-tight truncate max-w-full">
            Rp {totalPemasukan.toLocaleString('id-ID')}
          </p>
          <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Total Masuk</p>
        </div>

        {/* Pengeluaran */}
        <div className="rounded-[15px] bg-[#fff1f2] border border-rose-100/80 p-2.5 sm:p-4 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-rose-800">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            <span>Pengeluaran</span>
          </div>
          <p className="text-base sm:text-lg lg:text-xl font-black text-slate-900 mt-1 sm:mt-2 mb-0.5 tracking-tight truncate max-w-full">
            Rp {totalPengeluaran.toLocaleString('id-ID')}
          </p>
          <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Total Keluar</p>
        </div>
      </div>

      {/* Footer Link: Background Putih Responsif */}
      <div className="flex items-center justify-end pt-2 sm:pt-2.5 shrink-0">
        <button
          type="button"
          onClick={onViewAll}
          className="bg-white hover:bg-purple-50/80 border border-purple-200/90 hover:border-[#673ee8] text-xs font-bold text-[#673ee8] hover:text-[#5229c9] px-3.5 py-1.5 rounded-full shadow-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
        >
          <span>Detail Keuangan</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  )
}

export default FinancialSummaryCard
