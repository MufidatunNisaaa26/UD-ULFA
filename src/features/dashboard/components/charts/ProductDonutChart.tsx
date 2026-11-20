import { useState, useMemo } from 'react'
import { Package, ChevronRight } from 'lucide-react'
import { useProductStore } from '../../stores/useProductStore'

interface ProductDonutChartProps {
  onViewAll?: () => void
}

interface CategoryItem {
  name: string
  count: number
  percent: number
  color: string
}

// Geometry constants
const SIZE = 180
const CX = SIZE / 2
const CY = SIZE / 2
const STROKE_WIDTH = 24
const RADIUS = 64
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const POP_DISTANCE = 7

export function ProductDonutChart({ onViewAll }: ProductDonutChartProps) {
  const { products } = useProductStore()
  const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(null)

  const { categories, totalProducts, segments } = useMemo(() => {
    const total = products.length
    const atkCount = products.filter((p) => p.kategori === 'ATK').length
    const sekolahCount = products.filter((p) => p.kategori === 'Perlengkapan Sekolah').length
    const jenazahCount = products.filter((p) => p.kategori === 'Perlengkapan Jenazah').length

    const cats: CategoryItem[] = [
      {
        name: 'ATK',
        count: atkCount,
        percent: total > 0 ? Math.round((atkCount / total) * 100) : 0,
        color: '#673ee8',
      },
      {
        name: 'Perlengkapan Sekolah',
        count: sekolahCount,
        percent: total > 0 ? Math.round((sekolahCount / total) * 100) : 0,
        color: '#8e63f5',
      },
      {
        name: 'Perlengkapan Jenazah',
        count: jenazahCount,
        percent: total > 0 ? Math.round((jenazahCount / total) * 100) : 0,
        color: '#bca5fb',
      },
    ]

    // Hitung segmen SVG dinamis
    let acc = 0
    const segs = total > 0
      ? cats
          .filter((c) => c.count > 0)
          .map((cat) => {
            const length = (cat.count / total) * CIRCUMFERENCE
            const offset = acc

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
      : []

    return {
      categories: cats,
      totalProducts: total,
      segments: segs,
    }
  }, [products])

  const handleToggleCategory = (cat: CategoryItem) => {
    setActiveCategory((prev) => (prev?.name === cat.name ? null : cat))
  }

  return (
    <div className="bg-white rounded-[15px] p-3.5 sm:p-5 lg:p-4 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/40 flex flex-col justify-between h-full select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[15px] bg-[#f2ecfd] text-[#673ee8] flex items-center justify-center shrink-0">
            <Package className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#1e153b] tracking-tight">
            Grafik Total Produk
          </h3>
        </div>

        <span className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#f4effe] text-[#673ee8]">
          3 Kategori
        </span>
      </div>

      {/* Donut Chart & Legend Visual Selalu Ditampilkan */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-around gap-3 sm:gap-6 my-auto min-h-0">
        {/* Donut Ring */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 xl:w-40 xl:h-40 flex items-center justify-center shrink-0">
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
              {/* Background Track Ring (Placeholder lingkaran saat data kosong) */}
              <circle
                cx={CX}
                cy={CY}
                r={RADIUS}
                stroke="#ede7fa"
                strokeWidth={STROKE_WIDTH}
                fill="none"
              />

              {/* Slices with Radial Pop-Out saat ada data produk */}
              {segments.map((seg) => {
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

            {/* Center Label: Menampilkan angka produk riil (0 jika belum ada produk) */}
            <g className="pointer-events-none select-none transition-all duration-300">
              <text
                x={CX}
                y={CY - 6}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#1e153b"
                style={{ fontSize: '24px', fontWeight: 900 }}
              >
                {activeCategory ? activeCategory.count : totalProducts}
              </text>
              <text
                x={CX}
                y={CY + 14}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#7a6b99"
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              >
                PRODUK
              </text>
            </g>
          </svg>
        </div>

        {/* Legend 3 Kategori */}
        <div className="flex flex-col gap-2 w-full sm:w-auto min-w-0 sm:min-w-[190px]">
          {categories.map((cat) => {
            const isSelected = activeCategory?.name === cat.name

            return (
              <button
                key={cat.name}
                type="button"
                onMouseEnter={() => setActiveCategory(cat)}
                onMouseLeave={() => setActiveCategory(null)}
                onClick={() => handleToggleCategory(cat)}
                className={`flex items-center justify-between gap-3 text-xs px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-[12px] cursor-pointer transition-all text-left ${
                  isSelected
                    ? 'bg-[#f4effe] ring-1 ring-purple-300/80 shadow-xs scale-[1.01]'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="font-semibold text-slate-700 truncate">
                    {cat.name}
                  </span>
                </div>
                <span className="font-semibold text-slate-800 text-right shrink-0 pl-1">
                  {cat.count} <span className="hidden sm:inline">Produk</span>{' '}
                  <span className="text-slate-400 font-normal">
                    ({cat.percent}%)
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer Link: Teks Lihat Semua di background putih responsif */}
      <div className="flex items-center justify-end pt-2 sm:pt-2.5 shrink-0">
        <button
          type="button"
          onClick={onViewAll}
          className="bg-white hover:bg-purple-50/80 border border-purple-200/90 hover:border-[#673ee8] text-xs font-bold text-[#673ee8] hover:text-[#5229c9] px-3.5 py-1.5 rounded-full shadow-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
        >
          <span>Lihat Semua</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  )
}

export default ProductDonutChart
