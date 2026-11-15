import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'

interface IncomingProduct {
  no: number
  waktuInput: string
  fotoIcon: string
  namaProduk: string
  kategori: 'ATK' | 'Perlengkapan Sekolah' | 'Perlengkapan Jenazah'
  jumlahMasuk: string
  hargaBeli: string
  hargaJual: string
}

const INCOMING_PRODUCTS: IncomingProduct[] = [
  {
    no: 1,
    waktuInput: 'Hari ini, 10:15',
    fotoIcon: '📓',
    namaProduk: 'Buku Tulis Sinar Dunia 38 Lembar',
    kategori: 'ATK',
    jumlahMasuk: '+50 Pcs',
    hargaBeli: 'Rp 3.200',
    hargaJual: 'Rp 4.500',
  },
  {
    no: 2,
    waktuInput: 'Hari ini, 09:30',
    fotoIcon: '🎒',
    namaProduk: 'Tas Sekolah Polo Ransel Hitam',
    kategori: 'Perlengkapan Sekolah',
    jumlahMasuk: '+20 Pcs',
    hargaBeli: 'Rp 75.000',
    hargaJual: 'Rp 95.000',
  },
  {
    no: 3,
    waktuInput: 'Hari ini, 08:45',
    fotoIcon: '🧵',
    namaProduk: 'Kain Kafan Mori Primissima 12m',
    kategori: 'Perlengkapan Jenazah',
    jumlahMasuk: '+15 Roll',
    hargaBeli: 'Rp 110.000',
    hargaJual: 'Rp 135.000',
  },
  {
    no: 4,
    waktuInput: 'Kemarin, 16:20',
    fotoIcon: '🖊️',
    namaProduk: 'Pulpen Standard AE7 Hitam (1 Box)',
    kategori: 'ATK',
    jumlahMasuk: '+30 Box',
    hargaBeli: 'Rp 22.000',
    hargaJual: 'Rp 28.000',
  },
  {
    no: 5,
    waktuInput: 'Kemarin, 14:10',
    fotoIcon: '✏️',
    namaProduk: 'Pensil Warna Faber-Castell 24 Warna',
    kategori: 'Perlengkapan Sekolah',
    jumlahMasuk: '+25 Set',
    hargaBeli: 'Rp 48.000',
    hargaJual: 'Rp 59.000',
  },
  {
    no: 6,
    waktuInput: 'Kemarin, 11:35',
    fotoIcon: '🧴',
    namaProduk: 'Minyak Wangi Non Alkohol Kasturi 100ml',
    kategori: 'Perlengkapan Jenazah',
    jumlahMasuk: '+12 Btl',
    hargaBeli: 'Rp 35.000',
    hargaJual: 'Rp 45.000',
  },
  {
    no: 7,
    waktuInput: '06 Nov, 15:40',
    fotoIcon: '📄',
    namaProduk: 'Kertas HVS PaperOne A4 75gr (1 Rim)',
    kategori: 'ATK',
    jumlahMasuk: '+40 Rim',
    hargaBeli: 'Rp 44.500',
    hargaJual: 'Rp 52.000',
  },
  {
    no: 8,
    waktuInput: '06 Nov, 10:20',
    fotoIcon: '🧊',
    namaProduk: 'Kapur Barus Pengawet Jenazah 500gr',
    kategori: 'Perlengkapan Jenazah',
    jumlahMasuk: '+25 Pcs',
    hargaBeli: 'Rp 18.000',
    hargaJual: 'Rp 24.000',
  },
]

const CATEGORY_STATS = [
  { name: 'ATK', count: 56, percent: 43, color: '#673ee8' },
  { name: 'Perlengkapan Sekolah', count: 48, percent: 37, color: '#8e63f5' },
  { name: 'Perlengkapan Jenazah', count: 26, percent: 20, color: '#bca5fb' },
]

// Geometry constants for Top Card Donut (sama persis dengan halaman awal dashboard)
const SIZE = 180
const CX = SIZE / 2
const CY = SIZE / 2
const STROKE_WIDTH = 24
const RADIUS = 64
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const POP_DISTANCE = 7

function getDonutSegments() {
  let acc = 0
  return CATEGORY_STATS.map((cat) => {
    const length = (cat.percent / 100) * CIRCUMFERENCE
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
}

const SEGMENTS = getDonutSegments()

export function ProductDetailView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  // Kategori aktif untuk visual donut dan strip
  const activeCategory = hoveredCategory || selectedCategory

  // Kategori filter untuk data tabel: mengunci berdasarkan selectedCategory (saat diklik),
  // atau sementara waktu mengikuti hoveredCategory jika belum ada yang diklik
  const effectiveFilterCategory = selectedCategory || hoveredCategory

  const handleToggleCategory = (catName: string) => {
    setSelectedCategory((prev) => (prev === catName ? null : catName))
  }

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return INCOMING_PRODUCTS.filter((prod) => {
      const matchSearch =
        prod.namaProduk.toLowerCase().includes(q) ||
        prod.kategori.toLowerCase().includes(q)
      const matchCategory =
        !effectiveFilterCategory || prod.kategori === effectiveFilterCategory
      return matchSearch && matchCategory
    })
  }, [searchQuery, effectiveFilterCategory])

  return (
    <div className="flex flex-col gap-5 pb-6">
      {/* 1. KARTU ATAS: Donut Chart & 3 Strip Kategori */}
      <div className="bg-white rounded-[15px] p-6 lg:p-7 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/40 flex flex-col md:flex-row items-center justify-around gap-6 lg:gap-12">
        {/* Donut Chart */}
        <div className="relative w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center shrink-0">
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
                stroke="#f4effe"
                strokeWidth={STROKE_WIDTH}
                fill="none"
              />

              {/* Segments with Radial Pop-Out */}
              {SEGMENTS.map((seg) => {
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

            {/* Informative Center Label (Persis seperti di halaman awal dashboard) */}
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
                  {CATEGORY_STATS.find((c) => c.name === activeCategory)?.count}
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

        {/* 3 Horizontal Strips on the Right */}
        <div className="w-full max-w-[500px] flex flex-col gap-3">
          {CATEGORY_STATS.map((cat) => {
            const isSelected = activeCategory === cat.name
            const isFilterLocked = selectedCategory === cat.name

            return (
              <button
                key={cat.name}
                type="button"
                onMouseEnter={() => setHoveredCategory(cat.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => handleToggleCategory(cat.name)}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-[15px] transition-all cursor-pointer text-left ${
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
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-xs"
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
      <div className="bg-white rounded-[15px] p-6 lg:p-7 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/40 flex flex-col">
        {/* Header Kartu: Judul di Kiri & Search Bar di Kanan */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 mb-5">
          <h3 className="text-base sm:text-lg font-bold text-[#1e153b] tracking-tight">
            Riwayat Produk Baru Masuk
          </h3>

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

        {/* Tabel Produk Baru Masuk */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f0e9fd] text-[#673ee8] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-3 text-center w-12 rounded-l-[15px]">NO</th>
                <th className="py-3.5 px-3">WAKTU INPUT</th>
                <th className="py-3.5 px-3 text-center w-16">FOTO</th>
                <th className="py-3.5 px-3">NAMA PRODUK</th>
                <th className="py-3.5 px-3 text-center">KATEGORI</th>
                <th className="py-3.5 px-3 text-center">JUMLAH MASUK</th>
                <th className="py-3.5 px-3 text-right">HARGA BELI</th>
                <th className="py-3.5 px-3 text-right rounded-r-[15px]">HARGA JUAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <tr
                    key={item.no}
                    className="hover:bg-[#faf8fe] transition-colors"
                  >
                    {/* NO */}
                    <td className="py-3.5 px-3 text-center text-slate-500 font-medium">
                      {item.no}
                    </td>

                    {/* WAKTU INPUT */}
                    <td className="py-3.5 px-3 text-slate-500 font-medium whitespace-nowrap">
                      {item.waktuInput}
                    </td>

                    {/* FOTO */}
                    <td className="py-3.5 px-3 text-center">
                      <div className="w-10 h-10 rounded-[15px] bg-purple-50/70 border border-purple-100/60 flex items-center justify-center text-lg shadow-2xs mx-auto">
                        <span>{item.fotoIcon}</span>
                      </div>
                    </td>

                    {/* NAMA PRODUK */}
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-slate-800 leading-snug">
                        {item.namaProduk}
                      </p>
                    </td>

                    {/* KATEGORI */}
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 rounded-[15px] text-[11px] font-semibold ${
                          item.kategori === 'ATK'
                            ? 'bg-[#f4effe] text-[#673ee8]'
                            : item.kategori === 'Perlengkapan Sekolah'
                            ? 'bg-[#f4effe] text-[#8e63f5]'
                            : 'bg-[#f4effe] text-[#7a6b99]'
                        }`}
                      >
                        {item.kategori}
                      </span>
                    </td>

                    {/* JUMLAH MASUK */}
                    <td className="py-3.5 px-3 text-center font-bold text-slate-800 whitespace-nowrap">
                      {item.jumlahMasuk}
                    </td>

                    {/* HARGA BELI */}
                    <td className="py-3.5 px-3 text-right text-slate-600 font-medium whitespace-nowrap">
                      {item.hargaBeli}
                    </td>

                    {/* HARGA JUAL */}
                    <td className="py-3.5 px-3 text-right font-bold text-slate-900 whitespace-nowrap">
                      {item.hargaJual}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="py-8 text-center text-slate-400 font-medium"
                  >
                    Tidak ada produk yang cocok dengan pencarian "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailView
