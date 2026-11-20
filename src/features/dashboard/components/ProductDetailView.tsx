import { useState, useMemo, useEffect } from 'react'
import { Search, Package } from 'lucide-react'
import { useProductStore } from '../stores/useProductStore'

interface IncomingProduct {
  no: number
  waktuInput: string
  fotoIcon: string
  namaProduk: string
  kategori: 'ATK' | 'Perlengkapan Sekolah' | 'Perlengkapan Jenazah'
  jumlahMasuk: string
  hargaBeli: string
  hargaJual: string
  customImageUrl?: string
}

// Geometry constants for Top Card Donut
const SIZE = 180
const CX = SIZE / 2
const CY = SIZE / 2
const STROKE_WIDTH = 24
const RADIUS = 64
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const POP_DISTANCE = 7

export function ProductDetailView() {
  const { products, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  // Kategori aktif untuk visual donut dan strip
  const activeCategory = hoveredCategory || selectedCategory

  // Kategori filter untuk data tabel
  const effectiveFilterCategory = selectedCategory || hoveredCategory

  const incomingProducts = useMemo<IncomingProduct[]>(() => {
    return products.map((prod, idx) => ({
      no: idx + 1,
      waktuInput: 'Tersedia',
      fotoIcon: '📦',
      namaProduk: prod.namaProduk,
      kategori: prod.kategori as 'ATK' | 'Perlengkapan Sekolah' | 'Perlengkapan Jenazah',
      jumlahMasuk: `${prod.stokJumlah} ${prod.stokSatuan}`,
      hargaBeli: `Rp ${(prod.hargaBeli && prod.hargaBeli > 0 ? prod.hargaBeli : Math.round(prod.harga * 0.8)).toLocaleString('id-ID')}`,
      hargaJual: `Rp ${prod.harga.toLocaleString('id-ID')}`,
      customImageUrl: prod.customImageUrl,
    }))
  }, [products])

  const { categories, totalProducts, segments } = useMemo(() => {
    const total = products.length
    const atkCount = products.filter((p) => p.kategori === 'ATK').length
    const sekolahCount = products.filter((p) => p.kategori === 'Perlengkapan Sekolah').length
    const jenazahCount = products.filter((p) => p.kategori === 'Perlengkapan Jenazah').length

    const cats = [
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

  const handleToggleCategory = (catName: string) => {
    setSelectedCategory((prev) => (prev === catName ? null : catName))
  }

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return incomingProducts.filter((prod) => {
      const matchSearch =
        prod.namaProduk.toLowerCase().includes(q) ||
        prod.kategori.toLowerCase().includes(q)
      const matchCategory =
        !effectiveFilterCategory || prod.kategori === effectiveFilterCategory
      return matchSearch && matchCategory
    })
  }, [incomingProducts, searchQuery, effectiveFilterCategory])

  return (
    <div className="flex flex-col gap-4 sm:gap-5 pb-6">
      {/* 1. KARTU ATAS: Donut Chart & 3 Strip Kategori */}
      <div className="bg-white rounded-[15px] p-4 sm:p-6 lg:p-7 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/40 flex flex-col md:flex-row items-center justify-around gap-4 sm:gap-6 lg:gap-10">
        {/* Donut Chart */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 flex items-center justify-center shrink-0">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="overflow-visible"
          >
            <defs>
              <filter id="detailPopGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="4"
                  floodColor="#4f24c7"
                  floodOpacity="0.35"
                />
              </filter>
            </defs>

            <g transform={`rotate(-90 ${CX} ${CY})`}>
              {/* Background Track Ring */}
              <circle
                cx={CX}
                cy={CY}
                r={RADIUS}
                stroke="#ede7fa"
                strokeWidth={STROKE_WIDTH}
                fill="none"
              />

              {/* Segments with Radial Pop-Out saat ada produk */}
              {segments.map((seg) => {
                const isSelected = activeCategory === seg.name

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
                    filter={isSelected ? 'url(#detailPopGlow)' : undefined}
                    transform={
                      isSelected
                        ? `translate(${seg.popX}, ${seg.popY})`
                        : undefined
                    }
                    className="cursor-pointer transition-all duration-300 ease-out"
                    onMouseEnter={() => setHoveredCategory(seg.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    onClick={() => handleToggleCategory(seg.name)}
                  />
                )
              })}
            </g>

            {/* Informative Center Label */}
            <g className="pointer-events-none select-none transition-all duration-300">
              <text
                x={CX}
                y={CY - 6}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#1e153b"
                style={{ fontSize: '24px', fontWeight: 900 }}
              >
                {activeCategory
                  ? categories.find((c) => c.name === activeCategory)?.count ?? 0
                  : totalProducts}
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

        {/* 3 Horizontal Strips on the Right */}
        <div className="w-full max-w-[500px] flex flex-col gap-2.5 sm:gap-3">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.name
            const isFilterLocked = selectedCategory === cat.name

            return (
              <button
                key={cat.name}
                type="button"
                onMouseEnter={() => setHoveredCategory(cat.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => handleToggleCategory(cat.name)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-[12px] sm:rounded-[15px] transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-[#f0e9fd] ring-1.5 ring-purple-300 shadow-sm scale-[1.01]'
                    : 'bg-[#f8f5fe] hover:bg-[#f1ecfc]'
                }`}
                title={
                  isFilterLocked
                    ? `Klik untuk melihat semua kategori`
                    : `Klik untuk memfilter kategori ${cat.name}`
                }
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {cat.name}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  {cat.percent}%
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. KARTU BAWAH: Riwayat Produk Baru Masuk */}
      <div className="bg-white rounded-[15px] p-4 sm:p-6 lg:p-7 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/40 flex flex-col overflow-hidden">
        {/* Header Kartu: Judul di Kiri & Search Bar di Kanan */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <h3 className="text-base sm:text-lg font-bold text-[#1e153b] tracking-tight">
              Riwayat Produk Baru Masuk
            </h3>
            {filteredProducts.length > 0 && (
              <span className="sm:hidden text-[10px] font-semibold text-[#673ee8] bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                Geser &rarr;
              </span>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk baru masuk..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-[15px] bg-[#faf8fe] border border-purple-100 focus:outline-none focus:border-[#673ee8] focus:bg-white text-slate-800 placeholder:text-slate-400 transition-all"
            />
          </div>
        </div>

        {/* Tabel Produk Baru Masuk / State Kosong Responsif */}
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto w-full -mx-1 px-1">
            <table className="w-full min-w-[680px] text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#f0e9fd] text-[#673ee8] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-2.5 text-center w-12 rounded-l-[12px]">NO</th>
                  <th className="py-3 px-3 w-28 whitespace-nowrap">WAKTU INPUT</th>
                  <th className="py-3 px-2.5 text-center w-14">FOTO</th>
                  <th className="py-3 px-3 min-w-[130px]">NAMA PRODUK</th>
                  <th className="py-3 px-3 text-center w-32 whitespace-nowrap">KATEGORI</th>
                  <th className="py-3 px-3 text-center w-28 whitespace-nowrap">JUMLAH MASUK</th>
                  <th className="py-3 px-3 text-right w-28 whitespace-nowrap">HARGA BELI</th>
                  <th className="py-3 px-3 text-right w-28 rounded-r-[12px] whitespace-nowrap">HARGA JUAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {filteredProducts.map((item) => (
                  <tr
                    key={item.no}
                    className="hover:bg-[#faf8fe] transition-colors"
                  >
                    {/* NO */}
                    <td className="py-3 px-2.5 text-center text-slate-500 font-medium">
                      {item.no}
                    </td>

                    {/* WAKTU INPUT */}
                    <td className="py-3 px-3 text-slate-500 font-medium whitespace-nowrap">
                      {item.waktuInput}
                    </td>

                    {/* FOTO */}
                    <td className="py-3 px-2.5 text-center">
                      {item.customImageUrl ? (
                        <img
                          src={item.customImageUrl}
                          alt={item.namaProduk}
                          className="w-8 h-8 rounded-lg object-cover mx-auto border border-purple-100"
                        />
                      ) : (
                        <span className="text-base select-none">{item.fotoIcon}</span>
                      )}
                    </td>

                    {/* NAMA PRODUK */}
                    <td className="py-3 px-3 font-bold text-slate-900 min-w-[130px]">
                      {item.namaProduk}
                    </td>

                    {/* KATEGORI */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-[12px] text-[10px] sm:text-[11px] font-semibold ${
                          item.kategori === 'ATK'
                            ? 'bg-[#f4effe] text-[#673ee8]'
                            : item.kategori === 'Perlengkapan Sekolah'
                            ? 'bg-[#f4effe] text-[#8e63f5]'
                            : 'bg-[#f4effe] text-[#bca5fb]'
                        }`}
                      >
                        {item.kategori}
                      </span>
                    </td>

                    {/* JUMLAH MASUK */}
                    <td className="py-3 px-3 text-center font-bold text-emerald-600 whitespace-nowrap">
                      {item.jumlahMasuk}
                    </td>

                    {/* HARGA BELI */}
                    <td className="py-3 px-3 text-right text-slate-500 font-medium whitespace-nowrap">
                      {item.hargaBeli}
                    </td>

                    {/* HARGA JUAL */}
                    <td className="py-3 px-3 text-right font-bold text-slate-900 whitespace-nowrap">
                      {item.hargaJual}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-10 px-4 rounded-[12px] bg-[#faf8fe] border border-purple-100/60 flex flex-col items-center justify-center text-center my-1">
            <div className="w-10 h-10 rounded-[12px] bg-[#f0e9fd] text-[#673ee8] flex items-center justify-center mb-2">
              <Package className="w-5 h-5 stroke-[1.8]" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">
              {searchQuery
                ? `Tidak ada produk yang cocok dengan pencarian "${searchQuery}"`
                : 'Belum ada riwayat produk baru masuk'}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5 max-w-xs">
              {searchQuery
                ? 'Coba gunakan kata kunci pencarian yang lain'
                : 'Produk yang ditambahkan akan otomatis tercatat di tabel ini'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailView
