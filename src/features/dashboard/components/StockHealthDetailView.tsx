import { useState, useMemo, useRef, useEffect } from 'react'
import { Search, ChevronDown, Check, Package } from 'lucide-react'
import { useProductStore } from '../stores/useProductStore'

export interface StockItem {
  no: number
  sku: string
  namaProduk: string
  kategori: 'Peralatan Kematian' | 'ATK' | 'Peralatan Sekolah'
  sisaStok: string
  sisaStokQty: number
  status: 'Stok Kritis' | 'Menipis' | 'Habis' | 'Tersedia'
}

const CATEGORY_OPTIONS = [
  'Semua Kategori',
  'Peralatan Kematian',
  'ATK',
  'Peralatan Sekolah',
] as const

export function StockHealthDetailView() {
  const { products, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Kategori')
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string | null>(null)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const stockItems = useMemo<StockItem[]>(() => {
    return products.map((p, idx) => {
      let status: 'Stok Kritis' | 'Menipis' | 'Habis' | 'Tersedia' = 'Tersedia'
      if (p.stokJumlah === 0) {
        status = 'Habis'
      } else if (p.stokJumlah <= 3) {
        status = 'Stok Kritis'
      } else if (p.stokJumlah <= 10) {
        status = 'Menipis'
      }

      const kategori = (
        p.kategori === 'Perlengkapan Sekolah'
          ? 'Peralatan Sekolah'
          : p.kategori === 'Perlengkapan Jenazah'
          ? 'Peralatan Kematian'
          : 'ATK'
      ) as 'Peralatan Kematian' | 'ATK' | 'Peralatan Sekolah'

      return {
        no: idx + 1,
        sku: p.sku,
        namaProduk: p.namaProduk,
        kategori,
        sisaStok: `${p.stokJumlah} ${p.stokSatuan}`,
        sisaStokQty: p.stokJumlah,
        status,
      }
    })
  }, [products])

  const countTersedia = useMemo(
    () => stockItems.filter((i) => i.status === 'Tersedia').length,
    [stockItems]
  )
  const countMenipis = useMemo(
    () =>
      stockItems.filter(
        (i) => i.status === 'Menipis' || i.status === 'Stok Kritis'
      ).length,
    [stockItems]
  )
  const countHabis = useMemo(
    () => stockItems.filter((i) => i.status === 'Habis').length,
    [stockItems]
  )

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false)
      }
    }
    if (isCategoryOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCategoryOpen])

  // Filter daftar stok
  const filteredStock = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return stockItems.filter((item) => {
      const matchSearch =
        item.namaProduk.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q)
      const matchCat =
        selectedCategory === 'Semua Kategori' ||
        item.kategori === selectedCategory
      const matchStatus =
        !selectedStatusFilter ||
        (selectedStatusFilter === 'Menipis'
          ? item.status === 'Menipis' || item.status === 'Stok Kritis'
          : item.status === selectedStatusFilter)

      return matchSearch && matchCat && matchStatus
    })
  }, [stockItems, searchQuery, selectedCategory, selectedStatusFilter])

  return (
    <div className="flex flex-col gap-4 sm:gap-5 h-full min-h-0 select-none pb-1 overflow-hidden">
      {/* 1. Baris Atas: 3 Kartu Metrik Status Stok */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 shrink-0">
        {/* Tersedia */}
        <div
          onClick={() =>
            setSelectedStatusFilter((prev) =>
              prev === 'Tersedia' ? null : 'Tersedia'
            )
          }
          className={`rounded-[15px] bg-[#ecfdf5] border p-2.5 sm:p-5 flex flex-col items-center justify-center text-center transition-all cursor-pointer shadow-xs ${
            selectedStatusFilter === 'Tersedia'
              ? 'ring-2 ring-emerald-500 border-emerald-400 bg-emerald-100/60'
              : 'border-emerald-200/60 hover:bg-emerald-50/90'
          }`}
        >
          <p className="text-[11px] sm:text-sm font-semibold text-emerald-800">
            Tersedia
          </p>
          <p className="text-xl sm:text-4xl font-extrabold text-[#059669] my-0.5 sm:my-1 tracking-tight">
            {countTersedia}
          </p>
          <p className="text-[10px] sm:text-xs font-semibold text-emerald-700">
            Produk
          </p>
        </div>

        {/* Menipis */}
        <div
          onClick={() =>
            setSelectedStatusFilter((prev) =>
              prev === 'Menipis' ? null : 'Menipis'
            )
          }
          className={`rounded-[15px] bg-[#fffbeb] border p-2.5 sm:p-5 flex flex-col items-center justify-center text-center transition-all cursor-pointer shadow-xs ${
            selectedStatusFilter === 'Menipis'
              ? 'ring-2 ring-amber-500 border-amber-400 bg-amber-100/60'
              : 'border-amber-200/60 hover:bg-amber-50/90'
          }`}
        >
          <p className="text-[11px] sm:text-sm font-semibold text-amber-800">
            Menipis
          </p>
          <p className="text-xl sm:text-4xl font-extrabold text-[#d97706] my-0.5 sm:my-1 tracking-tight">
            {countMenipis}
          </p>
          <p className="text-[10px] sm:text-xs font-semibold text-amber-700">
            Produk
          </p>
        </div>

        {/* Habis */}
        <div
          onClick={() =>
            setSelectedStatusFilter((prev) =>
              prev === 'Habis' ? null : 'Habis'
            )
          }
          className={`rounded-[15px] bg-[#fff1f2] border p-2.5 sm:p-5 flex flex-col items-center justify-center text-center transition-all cursor-pointer shadow-xs ${
            selectedStatusFilter === 'Habis'
              ? 'ring-2 ring-rose-500 border-rose-400 bg-rose-100/60'
              : 'border-rose-200/60 hover:bg-rose-50/90'
          }`}
        >
          <p className="text-[11px] sm:text-sm font-semibold text-rose-800">
            Habis
          </p>
          <p className="text-xl sm:text-4xl font-extrabold text-[#e11d48] my-0.5 sm:my-1 tracking-tight">
            {countHabis}
          </p>
          <p className="text-[10px] sm:text-xs font-semibold text-rose-700">
            Produk
          </p>
        </div>
      </div>

      {/* 2. Kartu Tabel: Semua Stok */}
      <div className="bg-white rounded-[15px] p-4 sm:p-5 lg:p-6 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/40 flex flex-col flex-1 min-h-0 overflow-hidden">
        {/* Header Bar Kontrol di Dalam Kartu */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3.5 shrink-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {selectedStatusFilter ? `Stok ${selectedStatusFilter}` : 'Semua Stok'}
          </h3>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-60 md:w-68">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama barang / SKU..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-[15px] bg-[#faf8fe] border border-purple-100/80 focus:outline-none focus:border-[#673ee8] focus:bg-white text-slate-800 placeholder:text-slate-400 transition-all"
              />
            </div>

            {/* Dropdown Kategori */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsCategoryOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-[15px] bg-[#faf8fe] border border-purple-100/80 hover:bg-white text-xs font-semibold text-slate-700 transition-all cursor-pointer shadow-2xs shrink-0"
              >
                <span>{selectedCategory}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isCategoryOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-[15px] shadow-[0_8px_30px_rgba(103,62,232,0.12)] border border-purple-100/80 p-1.5 z-50">
                  {CATEGORY_OPTIONS.map((cat) => {
                    const isSelected = selectedCategory === cat
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat)
                          setIsCategoryOpen(false)
                        }}
                        className={`w-[calc(100%-12px)] mx-1.5 my-0.5 px-3 py-2 rounded-[15px] text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors text-left ${
                          isSelected
                            ? 'bg-[#f4effe] text-[#673ee8]'
                            : 'text-slate-700 hover:bg-[#faf8fe] hover:text-[#673ee8]'
                        }`}
                      >
                        <span>{cat}</span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-[#673ee8]" />
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Tabel Stok Produk / State Kosong Responsif */}
        {filteredStock.length === 0 ? (
          <div className="h-full flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#faf8fe] rounded-[15px] border border-purple-100/60 my-1">
            <div className="w-12 h-12 rounded-[15px] bg-[#f0e9fd] text-[#673ee8] flex items-center justify-center mb-3 shadow-2xs">
              <Package className="w-6 h-6 stroke-[1.8]" />
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-800">
              {searchQuery || selectedCategory !== 'Semua Kategori' || selectedStatusFilter
                ? 'Tidak ada produk stok yang cocok'
                : 'Belum ada data stok produk'}
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              {searchQuery || selectedCategory !== 'Semua Kategori' || selectedStatusFilter
                ? 'Coba ubah kata kunci pencarian atau bersihkan filter status'
                : 'Data stok akan otomatis diperbarui sesuai produk di toko'}
            </p>
            {(searchQuery || selectedCategory !== 'Semua Kategori' || selectedStatusFilter) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('Semua Kategori')
                  setSelectedStatusFilter(null)
                }}
                className="mt-3 px-3.5 py-1.5 rounded-[10px] bg-[#673ee8] text-white text-xs font-semibold cursor-pointer shadow-xs active:scale-95 transition-all"
              >
                Reset Filter &amp; Pencarian
              </button>
            )}
          </div>
        ) : (
          <div className="flex-1 min-h-0 overflow-x-auto overflow-y-auto pr-1">
            <table className="w-full min-w-[580px] text-left text-xs border-collapse">
              <thead className="sticky top-0 z-10 bg-white">
                <tr className="bg-[#f0e9fd] text-[#673ee8] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-2 text-center w-14 rounded-l-[15px]">NO</th>
                  <th className="py-3 px-4 w-[33%] text-left">NAMA PRODUK</th>
                  <th className="py-3 px-4 w-[24%] text-left">KATEGORI</th>
                  <th className="py-3 px-4 w-[18%] text-left">SISA STOK</th>
                  <th className="py-3 px-4 text-left rounded-r-[15px]">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {filteredStock.map((item) => (
                  <tr
                    key={item.no}
                    className="hover:bg-[#faf8fe] transition-colors"
                  >
                    {/* NO */}
                    <td className="py-3.5 px-2 text-center text-slate-500 font-medium w-14">
                      {item.no}
                    </td>

                    {/* NAMA PRODUK */}
                    <td className="py-3.5 px-4 w-[33%] text-left">
                      <p className="font-bold text-slate-800 text-xs sm:text-[13px] leading-snug">
                        {item.namaProduk}
                      </p>
                    </td>

                    {/* KATEGORI (Digeser ke kiri & text-left) */}
                    <td className="py-3.5 px-4 w-[24%] text-left whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 rounded-[15px] text-[11px] font-semibold ${
                          item.kategori === 'ATK'
                            ? 'bg-[#f4effe] text-[#673ee8]'
                            : item.kategori === 'Peralatan Sekolah'
                            ? 'bg-[#f4effe] text-[#8e63f5]'
                            : 'bg-[#f4effe] text-[#7a6b99]'
                        }`}
                      >
                        {item.kategori}
                      </span>
                    </td>

                    {/* SISA STOK (Digeser ke kiri & text-left) */}
                    <td className="py-3.5 px-4 w-[18%] text-left font-bold text-slate-800 text-xs sm:text-[13px] whitespace-nowrap">
                      {item.sisaStok}
                    </td>

                    {/* STATUS BADGE (Digeser ke kiri & text-left) */}
                    <td className="py-3.5 px-4 text-left whitespace-nowrap">
                      {item.status === 'Habis' ? (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-[15px] bg-[#991b1b] text-white text-[11px] font-semibold shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                          <span>Habis</span>
                        </span>
                      ) : item.status === 'Stok Kritis' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[15px] bg-[#ffe4e6] text-[#e11d48] border border-rose-200/60 text-[11px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48] shrink-0" />
                          <span>Stok Kritis</span>
                        </span>
                      ) : item.status === 'Menipis' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[15px] bg-[#fef3c7] text-[#b45309] border border-amber-200/60 text-[11px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] shrink-0" />
                          <span>Menipis</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[15px] bg-[#ecfdf5] text-[#059669] border border-emerald-200/60 text-[11px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0" />
                          <span>Tersedia</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default StockHealthDetailView

