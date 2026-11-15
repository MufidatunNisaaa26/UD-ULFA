import { useState } from 'react'
import { CircleDollarSign, TrendingUp, ArrowDownRight, ArrowUpRight } from 'lucide-react'

interface DayFinancial {
  day: string
  omset: number // dalam ribuan (misal 2400 = 2.4jt)
  laba: number // dalam ribuan (misal 750 = 750rb)
}

const FINANCIAL_DATA: DayFinancial[] = [
  { day: 'Sen', omset: 1800, laba: 520 },
  { day: 'Sel', omset: 2200, laba: 680 },
  { day: 'Rab', omset: 2000, laba: 610 },
  { day: 'Kam', omset: 2600, laba: 800 },
  { day: 'Jum', omset: 3100, laba: 980 },
  { day: 'Sab', omset: 3800, laba: 1150 },
  { day: 'Min', omset: 2950, laba: 510 },
]

export function FinancialAreaChart() {
  const [hoveredDay, setHoveredDay] = useState<DayFinancial | null>(null)

  const maxVal = 4200
  const width = 480
  const height = 150
  const paddingX = 25
  const paddingY = 20

  const getPoints = (key: 'omset' | 'laba') => {
    return FINANCIAL_DATA.map((item, index) => {
      const x = paddingX + (index / (FINANCIAL_DATA.length - 1)) * (width - paddingX * 2)
      const y = height - paddingY - (item[key] / maxVal) * (height - paddingY * 2)
      return { x, y, ...item }
    })
  }

  const omsetPoints = getPoints('omset')
  const labaPoints = getPoints('laba')

  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return ''
    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1]
      const p1 = pts[i]
      const p2 = pts[i + 1]
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1]

      const cp1x = p1.x + (p2.x - p0.x) / 6
      const cp1y = p1.y + (p2.y - p0.y) / 6
      const cp2x = p2.x - (p3.x - p1.x) / 6
      const cp2y = p2.y - (p3.y - p1.y) / 6

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
    }
    return d
  }

  const omsetLine = createSmoothPath(omsetPoints)
  const labaLine = createSmoothPath(labaPoints)

  const omsetArea = `${omsetLine} L ${omsetPoints[omsetPoints.length - 1].x} ${height - paddingY} L ${omsetPoints[0].x} ${height - paddingY} Z`
  const labaArea = `${labaLine} L ${labaPoints[labaPoints.length - 1].x} ${height - paddingY} L ${labaPoints[0].x} ${height - paddingY} Z`

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100/90 shadow-[0_10px_30px_rgba(101,52,217,0.04)] flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CircleDollarSign className="w-5 h-5 text-[#6534d9]" />
            <span>Grafik Keuangan &amp; Laba</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Perbandingan omset penjualan vs margin laba bersih 7 hari
          </p>
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6534d9]" />
            <span>Omset</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
            <span>Laba</span>
          </div>
        </div>
      </div>

      {/* Dual Area/Line Chart SVG */}
      <div className="relative w-full flex-1 flex items-center justify-center my-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-h-[145px] overflow-visible"
        >
          <defs>
            <linearGradient id="omsetAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6534d9" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#6534d9" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="labaAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Reference Lines */}
          {[1000, 2500, 4000].map((val) => {
            const y = height - paddingY - (val / maxVal) * (height - paddingY * 2)
            return (
              <line
                key={val}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="#f1f5f9"
                strokeDasharray="3 3"
              />
            )
          })}

          {/* Areas */}
          <path d={omsetArea} fill="url(#omsetAreaGrad)" />
          <path d={labaArea} fill="url(#labaAreaGrad)" />

          {/* Lines */}
          <path
            d={omsetLine}
            fill="none"
            stroke="#6534d9"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d={labaLine}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Points & Day Labels */}
          {FINANCIAL_DATA.map((item, index) => {
            const op = omsetPoints[index]
            const lp = labaPoints[index]
            const isHovered = hoveredDay?.day === item.day

            return (
              <g key={item.day}>
                <circle
                  cx={op.x}
                  cy={op.y}
                  r={isHovered ? 5.5 : 3}
                  fill="#ffffff"
                  stroke="#6534d9"
                  strokeWidth="2"
                  className="transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredDay(item)}
                  onMouseLeave={() => setHoveredDay(null)}
                />
                <circle
                  cx={lp.x}
                  cy={lp.y}
                  r={isHovered ? 5.5 : 3}
                  fill="#ffffff"
                  stroke="#10b981"
                  strokeWidth="2"
                  className="transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredDay(item)}
                  onMouseLeave={() => setHoveredDay(null)}
                />
                <text
                  x={op.x}
                  y={height - 4}
                  fontSize="10"
                  fill="#64748b"
                  textAnchor="middle"
                  fontWeight="600"
                >
                  {item.day}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredDay && (
          <div className="absolute top-1 right-2 bg-slate-900/95 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1.5 rounded-xl shadow-xl border border-slate-700 pointer-events-none flex items-center gap-3">
            <span className="font-bold text-slate-300">{hoveredDay.day}:</span>
            <span className="text-purple-300">
              Omset: Rp {(hoveredDay.omset * 1000).toLocaleString('id-ID')}
            </span>
            <span className="text-emerald-300">
              Laba: Rp {(hoveredDay.laba * 1000).toLocaleString('id-ID')}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Summary Statistics: Pemasukan, Pengeluaran & Laba */}
      <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-100">
        {/* Pemasukan */}
        <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100/60">
          <div className="flex items-center justify-between text-[11px] text-purple-700 font-medium">
            <span>Pemasukan</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
            Rp 18.450.000
          </p>
        </div>

        {/* Pengeluaran */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Pengeluaran</span>
            <ArrowDownRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <p className="text-xs sm:text-sm font-extrabold text-slate-800 mt-0.5">
            Rp 13.200.000
          </p>
        </div>

        {/* Laba Bersih */}
        <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100/80">
          <div className="flex items-center justify-between text-[11px] text-emerald-700 font-medium">
            <span>Laba Bersih</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <p className="text-xs sm:text-sm font-extrabold text-emerald-900 mt-0.5">
            Rp 5.250.000
          </p>
        </div>
      </div>
    </div>
  )
}

export default FinancialAreaChart
