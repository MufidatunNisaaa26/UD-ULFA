import { useMemo } from 'react'
import { ClipboardCheck, ChevronRight } from 'lucide-react'
import { useProductStore } from '../stores/useProductStore'

interface StockStatusCardProps {
  onViewAll?: () => void
}

export function StockStatusCard({ onViewAll }: StockStatusCardProps) {
  const { products } = useProductStore()

  const { tersedia, menipis, habis } = useMemo(() => {
    let t = 0
    let m = 0
    let h = 0

    for (const p of products) {
      if (p.stokJumlah === 0) {
        h++
      } else if (p.stokJumlah <= 10) {
        m++
      } else {
        t++
      }
    }

    return { tersedia: t, menipis: m, habis: h }
  }, [products])

  return (
    <div className="bg-white rounded-[15px] p-3.5 sm:p-5 lg:p-4 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/40 flex flex-col justify-between h-full select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[15px] bg-[#f2ecfd] text-[#673ee8] flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#1e153b] tracking-tight">
            Status Stok
          </h3>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3.5 my-auto">
        {/* Tersedia */}
        <div className="rounded-[15px] bg-[#ecfdf5] border border-emerald-100/80 p-2 sm:p-3.5 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>Tersedia</span>
          </div>
          <p className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-950 mt-1 mb-0.5 tracking-tight">
            {tersedia}
          </p>
          <p className="text-[10px] sm:text-xs font-semibold text-emerald-700">Produk</p>
        </div>

        {/* Menipis */}
        <div className="rounded-[15px] bg-[#fffbeb] border border-amber-100/80 p-2 sm:p-3.5 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span>Menipis</span>
          </div>
          <p className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-950 mt-1 mb-0.5 tracking-tight">
            {menipis}
          </p>
          <p className="text-[10px] sm:text-xs font-semibold text-amber-700">Produk</p>
        </div>

        {/* Habis */}
        <div className="rounded-[15px] bg-[#fff1f2] border border-rose-100/80 p-2 sm:p-3.5 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-rose-800">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            <span>Habis</span>
          </div>
          <p className="text-xl sm:text-2xl lg:text-3xl font-black text-rose-950 mt-1 mb-0.5 tracking-tight">
            {habis}
          </p>
          <p className="text-[10px] sm:text-xs font-semibold text-rose-700">Produk</p>
        </div>
      </div>

      {/* Footer Link: Background Putih Responsif */}
      <div className="flex items-center justify-end pt-2 sm:pt-2.5 shrink-0">
        <button
          type="button"
          onClick={onViewAll}
          className="bg-white hover:bg-purple-50/80 border border-purple-200/90 hover:border-[#673ee8] text-xs font-bold text-[#673ee8] hover:text-[#5229c9] px-3.5 py-1.5 rounded-full shadow-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
        >
          <span>Detail Stok</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  )
}

export default StockStatusCard
