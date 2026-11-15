import { useState, type ElementType } from 'react'
import { Boxes, ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react'

interface StockStatus {
  label: string
  count: number
  percent: number
  color: string
  bgLight: string
  borderColor: string
  textColor: string
  icon: ElementType
  desc: string
}

const STOCK_DATA: StockStatus[] = [
  {
    label: 'Stok Aman',
    count: 92,
    percent: 71,
    color: '#10b981',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    icon: ShieldCheck,
    desc: 'Kuantitas > 20 unit',
  },
  {
    label: 'Menipis',
    count: 26,
    percent: 20,
    color: '#f59e0b',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    icon: AlertTriangle,
    desc: 'Kuantitas 5 - 20 unit',
  },
  {
    label: 'Kritis / Kosong',
    count: 12,
    percent: 9,
    color: '#ef4444',
    bgLight: 'bg-rose-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700',
    icon: AlertCircle,
    desc: 'Kuantitas < 5 unit',
  },
]

export function StockHealthBarChart() {
  const [activeItem, setActiveItem] = useState<StockStatus | null>(null)
  const maxCount = 100

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100/90 shadow-[0_10px_30px_rgba(101,52,217,0.04)] flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Boxes className="w-5 h-5 text-[#6534d9]" />
            <span>Grafik Kesehatan Stok</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tingkat ketersediaan barang inventaris toko
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          130 Barang
        </span>
      </div>

      {/* Bar Chart Representation */}
      <div className="flex-1 flex flex-col justify-center gap-4 my-auto py-2">
        {STOCK_DATA.map((item) => {
          const Icon = item.icon
          const isSelected = activeItem?.label === item.label

          return (
            <div
              key={item.label}
              onMouseEnter={() => setActiveItem(item)}
              onMouseLeave={() => setActiveItem(null)}
              className={`p-3 rounded-2xl transition-all cursor-pointer ${
                isSelected ? 'bg-slate-50 scale-[1.01]' : 'hover:bg-slate-50/60'
              }`}
            >
              {/* Row Header: Label, Icon, & Count */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-lg ${item.bgLight} ${item.textColor} flex items-center justify-center`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {item.label}
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    ({item.desc})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                    {item.count} SKU
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${item.bgLight} ${item.textColor} border ${item.borderColor}`}
                  >
                    {item.percent}%
                  </span>
                </div>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden relative">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(item.count / maxCount) * 100}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StockHealthBarChart
