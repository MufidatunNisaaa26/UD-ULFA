import { ClipboardCheck, ChevronRight } from 'lucide-react'

interface StockStatusCardProps {
  onViewAll?: () => void
}

export function StockStatusCard({ onViewAll }: StockStatusCardProps) {
  return (
    <div className="bg-white rounded-[15px] p-6 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/40 flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[15px] bg-[#f2ecfd] text-[#673ee8] flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#1e153b] tracking-tight">
            Status Stok
          </h3>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-3 gap-3.5 my-auto">
        {/* Tersedia */}
        <div className="rounded-[15px] bg-[#ecfdf5] border border-emerald-100/80 p-4 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>Tersedia</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-950 mt-1.5 mb-0.5 tracking-tight">
            115
          </p>
          <p className="text-xs font-semibold text-emerald-700">Produk</p>
        </div>

        {/* Menipis */}
        <div className="rounded-[15px] bg-[#fffbeb] border border-amber-100/80 p-4 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span>Menipis</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-950 mt-1.5 mb-0.5 tracking-tight">
            12
          </p>
          <p className="text-xs font-semibold text-amber-700">Produk</p>
        </div>

        {/* Habis */}
        <div className="rounded-[15px] bg-[#fff1f2] border border-rose-100/80 p-4 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-800">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            <span>Habis</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-rose-950 mt-1.5 mb-0.5 tracking-tight">
            3
          </p>
          <p className="text-xs font-semibold text-rose-700">Produk</p>
        </div>
      </div>

      {/* Footer Link */}
      <div className="flex justify-end pt-3">
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#673ee8] hover:text-[#5229c9] flex items-center gap-0.5 cursor-pointer transition-colors"
        >
          <span>Detail Stok</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

export default StockStatusCard

