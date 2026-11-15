import { useState } from 'react'
import { ShoppingCart, Flame } from 'lucide-react'

interface HourlyData {
  time: string
  count: number
}

const HOURLY_TRANSACTIONS: HourlyData[] = [
  { time: '08:00', count: 6 },
  { time: '09:00', count: 10 },
  { time: '10:00', count: 15 },
  { time: '11:00', count: 19 },
  { time: '12:00', count: 24 }, // Jam Puncak
  { time: '13:00', count: 18 },
  { time: '14:00', count: 14 },
  { time: '15:00', count: 17 },
  { time: '16:00', count: 21 },
  { time: '17:00', count: 22 },
  { time: '18:00', count: 12 },
]

export function TransactionLineChart() {
  const [hoveredPoint, setHoveredPoint] = useState<HourlyData | null>(null)

  const maxVal = 26
  const width = 480
  const height = 180
  const paddingX = 30
  const paddingY = 25

  // Map data to coordinates
  const points = HOURLY_TRANSACTIONS.map((item, index) => {
    const x = paddingX + (index / (HOURLY_TRANSACTIONS.length - 1)) * (width - paddingX * 2)
    const y = height - paddingY - (item.count / maxVal) * (height - paddingY * 2)
    return { ...item, x, y }
  })

  // Create smooth bezier curve path
  const createSmoothPath = () => {
    if (points.length === 0) return ''
    let d = `M ${points[0].x} ${points[0].y}`
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1]
      const p1 = points[i]
      const p2 = points[i + 1]
      const p3 = points[i + 2 < points.length ? i + 2 : i + 1]

      const cp1x = p1.x + (p2.x - p0.x) / 6
      const cp1y = p1.y + (p2.y - p0.y) / 6
      const cp2x = p2.x - (p3.x - p1.x) / 6
      const cp2y = p2.y - (p3.y - p1.y) / 6

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
    }
    return d
  }

  const linePath = createSmoothPath()
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100/90 shadow-[0_10px_30px_rgba(101,52,217,0.04)] flex flex-col justify-between h-full select-none">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#6534d9]" />
            <span>Grafik Transaksi Kasir</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Aktivitas transaksi per jam operasional kasir
          </p>
        </div>

        {/* Peak Hours Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200 shadow-xs">
          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>Puncak: 24 Struk / Jam</span>
        </div>
      </div>

      {/* Interactive Line Chart SVG */}
      <div className="relative w-full flex-1 flex items-center justify-center my-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-h-[190px] overflow-visible"
        >
          <defs>
            <linearGradient id="purpleAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6534d9" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6534d9" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Reference Grid Lines */}
          {[0, 10, 20].map((val) => {
            const y = height - paddingY - (val / maxVal) * (height - paddingY * 2)
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeDasharray="3 3"
                />
                <text
                  x={paddingX - 8}
                  y={y + 3}
                  fontSize="9"
                  fill="#94a3b8"
                  textAnchor="end"
                  fontWeight="bold"
                >
                  {val}
                </text>
              </g>
            )
          })}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#purpleAreaGrad)" />

          {/* Smooth Line Curve */}
          <path
            d={linePath}
            fill="none"
            stroke="#6534d9"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {points.map((pt, index) => {
            const isHovered = hoveredPoint?.time === pt.time
            const isPeak = pt.count === 24

            return (
              <g key={index}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : isPeak ? 5 : 3.5}
                  fill={isPeak ? '#f59e0b' : '#ffffff'}
                  stroke={isPeak ? '#b45309' : '#6534d9'}
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(pt)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                {/* Time Label on X Axis */}
                {index % 2 === 0 && (
                  <text
                    x={pt.x}
                    y={height - 6}
                    fontSize="10"
                    fill="#64748b"
                    textAnchor="middle"
                    fontWeight="500"
                  >
                    {pt.time}
                  </text>
                )}
              </g>
            )
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div
            className="absolute top-2 right-4 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg border border-slate-700 pointer-events-none transition-all flex items-center gap-2"
          >
            <span className="text-purple-300">{hoveredPoint.time}:</span>
            <span className="text-white font-bold">{hoveredPoint.count} Struk Belanja</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionLineChart
