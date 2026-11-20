import { createPortal } from 'react-dom'
import {
  Search,
  SlidersHorizontal,
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  Check,
  Package,
  Camera,
} from 'lucide-react'
import {
  useProductList,
  type UseProductListProps,
} from '../hooks/useProductList'
import type { ProductItem } from '../stores/useProductStore'

export type ProductListViewProps = UseProductListProps
export type { ProductItem }

// Render Product Thumbnail Kecil (di Tabel)
function ProductThumbnail({
  type,
  customImageUrl,
}: {
  type?: ProductItem['imageType']
  customImageUrl?: string
}) {
  if (customImageUrl) {
    return (
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] bg-slate-100 border border-purple-200/50 flex items-center justify-center shadow-2xs shrink-0 overflow-hidden">
        <img
          src={customImageUrl}
          alt="Thumbnail Produk"
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  const baseStyle =
    'w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs border'

  switch (type) {
    case 'buku-sidu':
      return (
        <div className={`${baseStyle} bg-[#f5efe6] border-[#e6dac7] text-[#4a3b32]`}>
          <div className="flex flex-col items-center leading-none">
            <span className="text-[10px]">📓</span>
            <span className="text-[7px] font-black tracking-tighter">SiDU</span>
          </div>
        </div>
      )
    case 'kain-kafan':
      return (
        <div className={`${baseStyle} bg-[#eef7f9] border-[#d4ebf0] text-[#1e5b66]`}>
          <span className="text-sm">🧵</span>
        </div>
      )
    case 'seragam-pramuka':
      return (
        <div className={`${baseStyle} bg-[#fef5e7] border-[#f8e4c3] text-[#784612]`}>
          <span className="text-sm">👔</span>
        </div>
      )
    case 'pensil-faber':
      return (
        <div className={`${baseStyle} bg-[#eafaf1] border-[#cbf2db] text-[#196f3d]`}>
          <div className="flex flex-col items-center leading-none">
            <span className="text-xs">✏️</span>
            <span className="text-[7px] font-black">2B</span>
          </div>
        </div>
      )
    case 'spidol-snowman':
      return (
        <div className={`${baseStyle} bg-[#e8f4fc] border-[#c8e4f7] text-[#1b4f72]`}>
          <span className="text-sm">🖊️</span>
        </div>
      )
    case 'minyak-wangi':
      return (
        <div className={`${baseStyle} bg-[#fef0f2] border-[#fcd5dc] text-[#900c3f]`}>
          <span className="text-sm">🧴</span>
        </div>
      )
    case 'tas-ransel':
      return (
        <div className={`${baseStyle} bg-[#fcedee] border-[#f9cbd0] text-[#78281f]`}>
          <span className="text-sm">🎒</span>
        </div>
      )
    case 'kapas-medis':
      return (
        <div className={`${baseStyle} bg-[#f4f6f7] border-[#d5dbdb] text-[#424949]`}>
          <span className="text-sm">🧻</span>
        </div>
      )
    case 'penghapus-joyko':
      return (
        <div className={`${baseStyle} bg-[#fbfcfc] border-[#eaeded] text-[#2c3e50]`}>
          <span className="text-xs font-bold">Joyko</span>
        </div>
      )
    case 'seragam-merah-putih':
      return (
        <div className={`${baseStyle} bg-[#fdedec] border-[#fadbd8] text-[#922b21]`}>
          <span className="text-sm">👕</span>
        </div>
      )
    case 'tikar-pandan':
      return (
        <div className={`${baseStyle} bg-[#f9ebea] border-[#f2d7d5] text-[#641e16]`}>
          <span className="text-sm">🎋</span>
        </div>
      )
    case 'pulpen-standard':
      return (
        <div className={`${baseStyle} bg-[#ebf5fb] border-[#d6eaf8] text-[#1f618d]`}>
          <span className="text-sm">✒️</span>
        </div>
      )
    default:
      return (
        <div className={`${baseStyle} bg-purple-50 border-purple-100 text-[#673ee8]`}>
          <Package className="w-4 h-4" />
        </div>
      )
  }
}

// Render Thumbnail Ukuran Besar untuk Form Tambah / Edit Produk
function ProductThumbnailLarge({ type }: { type?: ProductItem['imageType'] }) {
  const baseStyle =
    'w-full h-full flex flex-col items-center justify-center select-none'

  switch (type) {
    case 'buku-sidu':
      return (
        <div className={`${baseStyle} bg-[#f5efe6] text-[#4a3b32]`}>
          <span className="text-6xl sm:text-7xl mb-2">📓</span>
          <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-[#735e52]">
            SiDU Book
          </span>
        </div>
      )
    case 'kain-kafan':
      return (
        <div className={`${baseStyle} bg-[#eef7f9] text-[#1e5b66]`}>
          <span className="text-6xl sm:text-7xl mb-2">🧵</span>
          <span className="text-xs sm:text-sm font-bold tracking-wider text-[#2d7d8c]">
            Kain Mori
          </span>
        </div>
      )
    case 'seragam-pramuka':
      return (
        <div className={`${baseStyle} bg-[#fef5e7] text-[#784612]`}>
          <span className="text-6xl sm:text-7xl mb-2">👔</span>
          <span className="text-xs sm:text-sm font-bold tracking-wider text-[#9a5b18]">
            Seragam Pramuka
          </span>
        </div>
      )
    case 'pensil-faber':
      return (
        <div className={`${baseStyle} bg-[#eafaf1] text-[#196f3d]`}>
          <span className="text-6xl sm:text-7xl mb-2">✏️</span>
          <span className="text-xs sm:text-sm font-black tracking-wider text-[#1e8449]">
            Faber Castell 2B
          </span>
        </div>
      )
    case 'spidol-snowman':
      return (
        <div className={`${baseStyle} bg-[#e8f4fc] text-[#1b4f72]`}>
          <span className="text-6xl sm:text-7xl mb-2">🖊️</span>
          <span className="text-xs sm:text-sm font-bold tracking-wider text-[#2471a3]">
            Snowman Marker
          </span>
        </div>
      )
    case 'minyak-wangi':
      return (
        <div className={`${baseStyle} bg-[#fef0f2] text-[#900c3f]`}>
          <span className="text-6xl sm:text-7xl mb-2">🧴</span>
          <span className="text-xs sm:text-sm font-bold tracking-wider text-[#b0134e]">
            Kasturi Oil
          </span>
        </div>
      )
    case 'tas-ransel':
      return (
        <div className={`${baseStyle} bg-[#fcedee] text-[#78281f]`}>
          <span className="text-6xl sm:text-7xl mb-2">🎒</span>
          <span className="text-xs sm:text-sm font-bold tracking-wider text-[#943126]">
            Backpack
          </span>
        </div>
      )
    case 'kapas-medis':
      return (
        <div className={`${baseStyle} bg-[#f4f6f7] text-[#424949]`}>
          <span className="text-6xl sm:text-7xl mb-2">🧻</span>
          <span className="text-xs sm:text-sm font-bold tracking-wider text-[#566573]">
            Kapas Gulung
          </span>
        </div>
      )
    case 'penghapus-joyko':
      return (
        <div className={`${baseStyle} bg-[#fbfcfc] text-[#2c3e50]`}>
          <span className="text-6xl sm:text-7xl mb-2">🧼</span>
          <span className="text-xs sm:text-sm font-black tracking-widest text-[#34495e]">
            JOYKO
          </span>
        </div>
      )
    case 'seragam-merah-putih':
      return (
        <div className={`${baseStyle} bg-[#fdedec] text-[#922b21]`}>
          <span className="text-6xl sm:text-7xl mb-2">👕</span>
          <span className="text-xs sm:text-sm font-bold tracking-wider text-[#b03a2e]">
            Merah Putih
          </span>
        </div>
      )
    case 'tikar-pandan':
      return (
        <div className={`${baseStyle} bg-[#f9ebea] text-[#641e16]`}>
          <span className="text-6xl sm:text-7xl mb-2">🎋</span>
          <span className="text-xs sm:text-sm font-bold tracking-wider text-[#7b241c]">
            Tikar Pandan
          </span>
        </div>
      )
    case 'pulpen-standard':
      return (
        <div className={`${baseStyle} bg-[#ebf5fb] text-[#1f618d]`}>
          <span className="text-6xl sm:text-7xl mb-2">✒️</span>
          <span className="text-xs sm:text-sm font-bold tracking-wider text-[#2980b9]">
            Standard AE7
          </span>
        </div>
      )
    default:
      return (
        <div className={`${baseStyle} bg-purple-50 text-[#673ee8]`}>
          <Package className="w-16 h-16 sm:w-20 sm:h-20 mb-2 stroke-[1.5]" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-purple-600">
            Foto Produk
          </span>
        </div>
      )
  }
}

export function ProductListView(props: ProductListViewProps = {}) {
  const {
    effectiveMode,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    isFilterDropdownOpen,
    setIsFilterDropdownOpen,
    formNama,
    setFormNama,
    formKategori,
    setFormKategori,
    formHargaBeli,
    setFormHargaBeli,
    formHarga,
    setFormHarga,
    formStok,
    setFormStok,
    formErrors,
    fileInputRef,
    selectedImagePreview,
    previewType,
    isDragging,
    productToDelete,
    handleStartCreate,
    handleOpenEdit,
    handleCancel,
    handleFormSubmit,
    handleOpenDeleteConfirm,
    handleConfirmDelete,
    cancelDelete,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    removePhoto,
  } = useProductList(props)

  // JIKA DALAM MODE TAMBAH ATAU EDIT PRODUK -> TAMPILKAN HALAMAN FORM FULL SCREEN
  if (effectiveMode === 'create' || effectiveMode === 'edit') {
    const hasPhoto = Boolean(selectedImagePreview || previewType)

    return (
      <div className="w-full h-full min-h-0 bg-white rounded-[15px] p-4 sm:p-7 lg:p-8 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/40 select-none flex flex-col justify-between overflow-y-auto lg:overflow-hidden">
        <form onSubmit={handleFormSubmit} className="flex-1 flex flex-col justify-between min-h-0">
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 min-h-0">
            {/* Baris 1: Nama Produk & Kategori */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6">
              {/* Nama Produk */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-slate-800 mb-2">
                  Nama Produk
                </label>
                <input
                  type="text"
                  placeholder="Masukan nama produk"
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  className={`w-full text-sm sm:text-base px-4 py-3 sm:py-3.5 rounded-[15px] bg-[#f8f7fd] border focus:bg-white text-slate-800 placeholder:text-slate-400 outline-none transition-all ${
                    formErrors.namaProduk
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-purple-100/60 focus:border-[#673ee8]'
                  }`}
                />
                {formErrors.namaProduk && (
                  <p className="text-rose-600 text-xs mt-1.5 font-medium">
                    {formErrors.namaProduk}
                  </p>
                )}
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-slate-800 mb-2">
                  Kategori
                </label>
                <div className="relative">
                  <select
                    value={formKategori}
                    onChange={(e) => setFormKategori(e.target.value)}
                    className={`w-full text-sm sm:text-base px-4 py-3 sm:py-3.5 rounded-[15px] bg-[#f8f7fd] border focus:bg-white outline-none transition-all appearance-none cursor-pointer pr-10 ${
                      formErrors.kategori
                        ? 'border-rose-400 focus:border-rose-500'
                        : 'border-purple-100/60 focus:border-[#673ee8]'
                    } ${formKategori ? 'text-slate-800' : 'text-slate-400'}`}
                  >
                    <option value="" disabled>Pilih Kategori Produk</option>
                    <option value="ATK" className="text-slate-800">ATK</option>
                    <option value="Perlengkapan Sekolah" className="text-slate-800">Perlengkapan Sekolah</option>
                    <option value="Perlengkapan Jenazah" className="text-slate-800">Perlengkapan Jenazah</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
                {formErrors.kategori && (
                  <p className="text-rose-600 text-xs mt-1.5 font-medium">
                    {formErrors.kategori}
                  </p>
                )}
              </div>
            </div>

            {/* Baris 2: Harga Modal, Harga Jual, & Stok */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5">
              {/* Harga Modal (Beli) */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-slate-800 mb-2">
                  Harga Modal (Beli)
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm sm:text-base text-slate-400 font-medium pointer-events-none">
                    Rp
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={formHargaBeli === '' ? '' : formHargaBeli.toLocaleString('id-ID')}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '')
                      setFormHargaBeli(raw === '' ? '' : Number(raw))
                    }}
                    className={`w-full text-sm sm:text-base pl-12 pr-4 py-3 sm:py-3.5 rounded-[15px] bg-[#f8f7fd] border focus:bg-white text-slate-800 placeholder:text-slate-400 outline-none transition-all ${
                      formErrors.hargaBeli
                        ? 'border-rose-400 focus:border-rose-500'
                        : 'border-purple-100/60 focus:border-[#673ee8]'
                    }`}
                  />
                </div>
                {formErrors.hargaBeli && (
                  <p className="text-rose-600 text-xs mt-1.5 font-medium">
                    {formErrors.hargaBeli}
                  </p>
                )}
              </div>

              {/* Harga Jual */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-slate-800 mb-2">
                  Harga Jual
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm sm:text-base text-slate-400 font-medium pointer-events-none">
                    Rp
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={formHarga === '' ? '' : formHarga.toLocaleString('id-ID')}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '')
                      setFormHarga(raw === '' ? '' : Number(raw))
                    }}
                    className={`w-full text-sm sm:text-base pl-12 pr-4 py-3 sm:py-3.5 rounded-[15px] bg-[#f8f7fd] border focus:bg-white text-slate-800 placeholder:text-slate-400 outline-none transition-all ${
                      formErrors.harga
                        ? 'border-rose-400 focus:border-rose-500'
                        : 'border-purple-100/60 focus:border-[#673ee8]'
                    }`}
                  />
                </div>
                {formErrors.harga && (
                  <p className="text-rose-600 text-xs mt-1.5 font-medium">
                    {formErrors.harga}
                  </p>
                )}
              </div>

              {/* Stok */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-slate-800 mb-2">
                  Stok
                </label>
                <input
                  type="text"
                  placeholder="jumlah stok: 1pak"
                  value={formStok}
                  onChange={(e) => setFormStok(e.target.value)}
                  className={`w-full text-sm sm:text-base px-4 py-3 sm:py-3.5 rounded-[15px] bg-[#f8f7fd] border focus:bg-white text-slate-800 placeholder:text-slate-400 outline-none transition-all ${
                    formErrors.stok
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-purple-100/60 focus:border-[#673ee8]'
                  }`}
                />
                {formErrors.stok && (
                  <p className="text-rose-600 text-xs mt-1.5 font-medium">
                    {formErrors.stok}
                  </p>
                )}
              </div>
            </div>

            {/* Baris 3: Foto Produk */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-slate-800 mb-2">
                Foto Produk
              </label>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                className="hidden"
              />

              {hasPhoto ? (
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="inline-flex flex-col items-start gap-2.5 p-3 rounded-[15px] border-2 border-purple-200/80 bg-[#faf8fe] shadow-2xs shrink-0">
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-56 lg:h-56 aspect-square rounded-[12px] overflow-hidden border border-purple-200/70 bg-[#faf8fe] shadow-xs group flex items-center justify-center">
                      {selectedImagePreview ? (
                        <img
                          src={selectedImagePreview}
                          alt={formNama || 'Pratinjau Foto Produk'}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <ProductThumbnailLarge type={previewType} />
                      )}
                      <div className="absolute top-2.5 right-2.5 bg-emerald-500 text-white rounded-full p-1.5 shadow-xs">
                        <Check className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-[12px] bg-white hover:bg-purple-50 text-[#673ee8] text-xs sm:text-sm font-semibold border border-purple-200 transition-all cursor-pointer shadow-2xs"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Ganti Foto</span>
                      </button>

                      <button
                        type="button"
                        onClick={removePhoto}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-[12px] bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs sm:text-sm font-semibold border border-rose-200/60 transition-all cursor-pointer"
                        title="Hapus Foto"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-end gap-3 shrink-0 self-end sm:self-auto w-full sm:w-auto mt-2 sm:mt-0">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 rounded-[15px] text-sm sm:text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300/80 shadow-2xs transition-all cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-3 rounded-[15px] bg-[#673ee8] hover:bg-[#582bc4] text-white text-sm sm:text-base font-semibold shadow-md shadow-purple-600/20 transition-all cursor-pointer"
                    >
                      {effectiveMode === 'edit' ? 'Simpan Perubahan' : 'Simpan Produk'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full border-2 border-dashed rounded-[15px] p-8 sm:p-10 lg:p-12 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-[#673ee8] bg-purple-50/70'
                        : 'border-purple-200/80 bg-[#faf8fe] hover:bg-purple-50/40'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-[14px] bg-[#f0e9fd] text-[#673ee8] flex items-center justify-center mb-3 shadow-2xs">
                        <Camera className="w-6 h-6" />
                      </div>
                      <p className="text-sm sm:text-base text-slate-700 font-semibold">
                        Seret foto ke sini atau unggah
                      </p>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        PNG, JPG, atau WEBP (Maks. 2MB)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 rounded-[15px] text-sm sm:text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300/80 shadow-2xs transition-all cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-3 rounded-[15px] bg-[#673ee8] hover:bg-[#582bc4] text-white text-sm sm:text-base font-semibold shadow-md shadow-purple-600/20 transition-all cursor-pointer"
                    >
                      {effectiveMode === 'edit' ? 'Simpan Perubahan' : 'Simpan Produk'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-4 h-full min-h-0 select-none pb-1 overflow-hidden">
      {/* 1. Bar Kontrol: Search Bar, Tombol Filter, & Tombol Tambah Produk */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 shrink-0">
        {/* Kolom Kiri: Input Pencarian */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama produk, SKU, atau kategori..."
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-[15px] bg-white border border-purple-100/80 shadow-[0_2px_12px_rgba(103,62,232,0.04)] focus:outline-none focus:border-[#673ee8] text-slate-800 placeholder:text-slate-400 transition-all"
          />
        </div>

        {/* Kolom Kanan: Tombol Filter & Tambah Produk */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 self-end sm:self-auto">
          {/* Tombol Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-[15px] text-xs font-semibold border transition-all cursor-pointer ${
                categoryFilter !== 'semua'
                  ? 'bg-purple-50 border-[#673ee8] text-[#673ee8]'
                  : 'bg-white border-purple-100/80 hover:bg-slate-50 text-slate-700 shadow-2xs'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter</span>
              {categoryFilter !== 'semua' && (
                <span className="w-2 h-2 rounded-full bg-[#673ee8]" />
              )}
            </button>

            {/* Dropdown Filter: Khusus 3 Kategori Utama */}
            {isFilterDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-[15px] shadow-xl border border-purple-100 p-2.5 z-30 animate-in fade-in zoom-in-95 duration-100">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 mb-1">
                  Kategori
                </div>
                <div className="flex flex-col gap-1">
                  {[
                    { id: 'semua', label: 'Semua Kategori' },
                    { id: 'ATK', label: 'ATK' },
                    { id: 'Perlengkapan Sekolah', label: 'Perlengkapan Sekolah' },
                    { id: 'Perlengkapan Jenazah', label: 'Perlengkapan Jenazah' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategoryFilter(cat.id)
                        setIsFilterDropdownOpen(false)
                      }}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-[10px] text-xs font-semibold text-left transition-all cursor-pointer ${
                        categoryFilter === cat.id
                          ? 'bg-[#f0e9fd] text-[#673ee8]'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {categoryFilter === cat.id && (
                        <Check className="w-3.5 h-3.5 text-[#673ee8]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tombol Tambah Produk */}
          <button
            type="button"
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-[15px] bg-[#673ee8] hover:bg-[#582bc4] text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Produk</span>
          </button>
        </div>
      </div>

      {/* 2. Kartu Tabel Produk: Full Width, Border 15px, Scrollable Table */}
      <div className="flex-1 bg-white rounded-[15px] p-3 sm:p-4 lg:p-5 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/40 flex flex-col min-h-0 overflow-hidden">
        <div className="flex-1 flex flex-col min-h-0 overflow-x-auto">
          <div className="min-w-[680px] flex-1 flex flex-col min-h-0">
            {/* Table Header Row Berwarna (Fixed di atas) */}
            <div className="shrink-0 mb-1 pr-1">
              <table className="w-full text-left text-xs border-collapse table-fixed">
                <thead>
                  <tr className="bg-[#f0e9fd] text-[#673ee8] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-3 px-3 text-center w-[7%] min-w-[50px] rounded-l-[15px]">NO.</th>
                    <th className="py-3 px-3 text-center w-[10%] min-w-[70px]">GAMBAR</th>
                    <th className="py-3 px-4 text-left w-[23%]">NAMA PRODUK</th>
                    <th className="py-3 px-4 text-left w-[20%]">KATEGORI</th>
                    <th className="py-3 px-3 text-center w-[14%]">HARGA</th>
                    <th className="py-3 px-3 text-center w-[14%]">STOK</th>
                    <th className="py-3 px-3 text-center w-[12%] min-w-[75px] rounded-r-[15px]">AKSI</th>
                  </tr>
                </thead>
              </table>
            </div>

            {/* Area Scroll Daftar Produk */}
            <div className="overflow-y-auto flex-1 min-h-0 pr-1">
              <table className="w-full text-left text-xs border-collapse table-fixed">
                <tbody className="divide-y divide-slate-100/80">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                    Tidak ada produk ditemukan.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((item) => {
                  const isOutOfStock = item.stokJumlah === 0
                  const isJenazahOrRoll =
                    item.kategori === 'Perlengkapan Jenazah' ||
                    item.stokSatuan === 'Roll' ||
                    item.stokSatuan === 'Botol' ||
                    item.stokSatuan === 'Lembar'

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-[#faf8fe] transition-colors"
                    >
                      {/* NO */}
                      <td className="py-3.5 px-3 text-center text-slate-500 font-medium w-[7%] min-w-[50px]">
                        {item.no}
                      </td>

                      {/* GAMBAR */}
                      <td className="py-2.5 px-3 text-center w-[10%] min-w-[70px]">
                        <div className="flex justify-center">
                          <ProductThumbnail
                            type={item.imageType}
                            customImageUrl={item.customImageUrl}
                          />
                        </div>
                      </td>

                      {/* NAMA PRODUK */}
                      <td className="py-3.5 px-4 text-left w-[23%]">
                        <p className="font-bold text-xs sm:text-[13px] text-slate-800">
                          {item.namaProduk}
                        </p>
                      </td>

                      {/* KATEGORI (RATA KIRI) */}
                      <td className="py-3.5 px-4 text-left w-[20%]">
                        <span className="inline-block px-3 py-1 rounded-[15px] text-[11px] font-semibold bg-[#f0e9fd] text-[#673ee8]">
                          {item.kategori}
                        </span>
                      </td>

                      {/* HARGA */}
                      <td className="py-3.5 px-3 text-center font-bold text-slate-800 text-xs sm:text-[13px] w-[14%]">
                        {item.harga.toLocaleString('id-ID')}
                      </td>

                      {/* STOK DENGAN PILL BERWARNA */}
                      <td className="py-3.5 px-3 text-center w-[14%]">
                        <span
                          className={`inline-block px-3 py-1 rounded-[15px] text-[11px] font-bold ${
                            isOutOfStock
                              ? 'bg-rose-100 text-rose-700'
                              : isJenazahOrRoll
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-[#f0e9fd] text-[#673ee8]'
                          }`}
                        >
                          {item.stokText || `${item.stokJumlah} ${item.stokSatuan}`}
                        </span>
                      </td>

                      {/* AKSI: EDIT & HAPUS */}
                      <td className="py-3.5 px-3 text-center w-[12%] min-w-[75px]">
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                          {/* Tombol Edit */}
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            title="Edit Produk"
                            className="p-1.5 rounded-[8px] text-[#673ee8] hover:bg-purple-100 transition-colors cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>

                          {/* Tombol Hapus */}
                          <button
                            type="button"
                            onClick={() => handleOpenDeleteConfirm(item)}
                            title="Hapus Produk"
                            className="p-1.5 rounded-[8px] text-rose-500 hover:bg-rose-100 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

      {/* POPUP MODAL KONFIRMASI HAPUS PRODUK: DIPORTAL KE BODY, FULL CENTER, BACKGROUND GELAP NON-BLUR */}
      {productToDelete &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4"
            onClick={cancelDelete}
          >
            <div
              className="bg-white rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-slate-100 h-[200px] max-w-[340px] w-full flex flex-col justify-center items-center text-center select-none p-5 sm:px-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Grup Ikon & Teks Pertanyaan (Jarak Rapat) */}
              <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                {/* Ikon Peringatan Segitiga Merah */}
                <div className="flex items-center justify-center text-[#b91c1c]">
                  <svg
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[50px] h-[50px] text-[#b91c1c] drop-shadow-[0_2px_6px_rgba(185,28,28,0.12)]"
                  >
                    <path
                      d="M 31.60 15.20 A 5 5 0 0 1 40.40 15.20 L 61.04 53.63 A 5 5 0 0 1 56.64 61.00 L 15.36 61.00 A 5 5 0 0 1 10.96 53.63 Z"
                      stroke="currentColor"
                      strokeWidth="3.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="36"
                      y1="25"
                      x2="36"
                      y2="38"
                      stroke="currentColor"
                      strokeWidth="3.6"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="36"
                      cy="48"
                      r="2"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                {/* Teks Pertanyaan */}
                <h3 className="text-slate-900 font-bold text-sm leading-snug">
                  Apakah anda yakin ingin
                  <br />
                  menghapus produk ini?
                </h3>
              </div>

              {/* Tombol Aksi: Batal & Hapus (Jarak Rapat dengan Teks) */}
              <div className="grid grid-cols-2 gap-3 w-full mt-3.5 sm:mt-4">
                <button
                  type="button"
                  onClick={cancelDelete}
                  className="w-full py-2 px-4 rounded-[12px] bg-white border border-slate-300/80 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="w-full py-2 px-4 rounded-[12px] bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default ProductListView
