import { useState } from 'react'
import { Package, ChevronRight } from 'lucide-react'

interface ProductDonutChartProps {
  onViewAll?: () => void
}

interface CategoryItem {
  name: string
  count: number
  percent: number
  color: string
}

const CATEGORIES: CategoryItem[] = [
  { name: 'ATK', count: 56, percent: 43, color: '#673ee8' },
  { name: 'Perlengkapan Sekolah', count: 48, percent: 37, color: '#8e63f5' },
  { name: 'Perlengkapan Jenazah', count: 26, percent: 20, color: '#bca5fb' },
]

// Geometry constants
const SIZE = 180
const CX = SIZE / 2
const CY = SIZE / 2
const STROKE_WIDTH = 24
const RADIUS = 64
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const POP_DISTANCE = 7

// Pure pre-computation of segments with radial pop-out vectors
function getDonutSegments() {
  let acc = 0
  return CATEGORIES.map((cat) => {
    const length = (cat.percent / 100) * CIRCUMFERENCE
    const offset = acc

    // Calculate mid-angle in radians for radial pop-out
    const startAngle = (offset / CIRCUMFERENCE) * 2 * Math.PI
    const endAngle = ((offset + length) / CIRCUMFERENCE) * 2 * Math.PI
    const midAngle = (startAngle + endAngle) / 2

    const popX = Math.cos(midAngle) * POP_DISTANCE
    const popY = Math.sin(midAngle) * POP_DISTANCE

    acc += length
    return {
      ...cat,
      length,
      offset,
      popX,
      popY,
    }
  })
}

const SEGMENTS = getDonutSegments()

export function ProductDonutChart({ onViewAll }: ProductDonutChartProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(null)

  const handleToggleCategory = (cat: CategoryItem) => {
    setActiveCategory((prev) => (prev?.name === cat.name ? null : cat))
  }

  return (
    <div className="bg-white rounded-[15px] p-6 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/40 flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[15px] bg-[#f2ecfd] text-[#673ee8] flex items-center justify-center shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#1e153b] tracking-tight">
            Grafik Total Produk
          </h3>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f4effe] text-[#673ee8]">
          3 Kategori
        </span>
      </div>

      {/* Donut Chart & Legend */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-around gap-6 my-auto">
        {/* Donut Ring */}
        <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="overflow-visible"
          >
            <defs>
              <filter id="popGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="3.5"
                  floodColor="#4f24c7"
                  floodOpacity="0.38"
                />
              </filter>
            </defs>

            {/* Rotated group for donut segments */}
            <g transform={`rotate(-90 ${CX} ${CY})`}>
              {/* Background Track Ring */}
              <circle
                cx={CX}
                cy={CY}
                r={RADIUS}
                stroke="#f4effe"
                strokeWidth={STROKE_WIDTH}
                fill="none"
              />

              {/* Slices with Radial Pop-Out on Cursor Hover or Click */}
              {SEGMENTS.map((seg) => {
                const isSelected = activeCategory?.name === seg.name

                return (
                  <circle
                    key={seg.name}
                    cx={CX}
                    cy={CY}
                    r={RADIUS}
                    stroke={seg.color}
                    strokeWidth={isSelected ? STROKE_WIDTH + 4 : STROKE_WIDTH}
                    strokeDasharray={`${seg.length} ${CIRCUMFERENCE}`}
                    strokeDashoffset={-seg.offset}
                    strokeLinecap="butt"
                    fill="none"
                    filter={isSelected ? 'url(#popGlow)' : undefined}
                    transform={
                      isSelected
                        ? `translate(${seg.popX}, ${seg.popY})`
                        : undefined
                    }
                    className="cursor-pointer transition-all duration-300 ease-out"
                    onMouseEnter={() => setActiveCategory(seg)}
                    onMouseLeave={() => setActiveCategory(null)}
                    onClick={() => handleToggleCategory(seg)}
                  />
                )
              })}
            </g>

            {/* Informative Center Label when a category is popped out */}
            {activeCategory && (
              <g className="pointer-events-none select-none transition-all duration-300">
                <text
                  x={CX}
                  y={CY - 6}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#111827"
                  style={{ fontSize: '22px', fontWeight: 900 }}
                >
                  {activeCategory.count}
                </text>
                <text
                  x={CX}
                  y={CY + 12}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#63537e"
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                  }}
                >
                  PRODUK
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2.5 w-full sm:w-auto min-w-[215px]">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory?.name === cat.name

            return (
              <button
                key={cat.name}
                type="button"
                onMouseEnter={() => setActiveCategory(cat)}
                onMouseLeave={() => setActiveCategory(null)}
                onClick={() => handleToggleCategory(cat)}
                className={`flex items-center justify-between gap-4 text-xs px-3 py-2 rounded-[15px] cursor-pointer transition-all text-left ${
                  isSelected
                    ? 'bg-[#f4effe] ring-1 ring-purple-300/80 shadow-xs scale-[1.02]'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="font-semibold text-slate-700">
                    {cat.name}
                  </span>
                </div>
                <span className="font-semibold text-slate-800 text-right">
                  {cat.count} Produk{' '}
                  <span className="text-slate-400 font-normal">
                    ({cat.percent}%)
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer Link */}
      <div className="flex justify-end pt-3">
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#673ee8] hover:text-[#5229c9] flex items-center gap-0.5 cursor-pointer transition-colors"
        >
          <span>Lihat Semua</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

export default ProductDonutChart
