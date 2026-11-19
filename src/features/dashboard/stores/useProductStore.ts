import { create } from 'zustand'
import { api, type ApiProduct } from '../../../services/api'
import type { ProductCategory } from '../schemas/productSchema'

export interface ProductItem {
  id: string
  no: number
  sku: string
  namaProduk: string
  kategori: ProductCategory
  harga: number
  stokJumlah: number
  stokSatuan: string
  stokText?: string
  imageType:
    | 'buku-sidu'
    | 'kain-kafan'
    | 'seragam-pramuka'
    | 'pensil-faber'
    | 'spidol-snowman'
    | 'minyak-wangi'
    | 'tas-ransel'
    | 'kapas-medis'
    | 'penghapus-joyko'
    | 'seragam-merah-putih'
    | 'tikar-pandan'
    | 'pulpen-standard'
  customImageUrl?: string
}

function mapApiToProductItem(item: ApiProduct, idx: number): ProductItem {
  const kategori = (
    item.kategori === 'Perlengkapan Sekolah' ||
    item.kategori === 'Perlengkapan Jenazah'
      ? item.kategori
      : 'ATK'
  ) as ProductCategory

  return {
    id: String(item.id),
    no: idx + 1,
    sku: `PRD-${String(item.id).padStart(4, '0')}`,
    namaProduk: item.nama,
    kategori,
    harga: Number(item.harga) || 0,
    stokJumlah: Number(item.stok) || 0,
    stokSatuan: 'Pcs',
    stokText: `${item.stok} Pcs`,
    imageType: 'buku-sidu',
    customImageUrl:
      item.gambar && !item.gambar.includes('placehold.co')
        ? item.gambar
        : undefined,
  }
}

interface ProductState {
  products: ProductItem[]
  isLoading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  addProduct: (
    newProduct: Omit<ProductItem, 'id' | 'no' | 'sku'>,
    imageFile?: File | null
  ) => Promise<boolean>
  updateProduct: (
    id: string,
    updated: Partial<ProductItem>,
    imageFile?: File | null
  ) => Promise<boolean>
  deleteProduct: (id: string) => Promise<boolean>
  resetProducts: () => void
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await api.produk.getAll()
      const mapped = data.map(mapApiToProductItem)
      set({ products: mapped, isLoading: false })
    } catch (err: any) {
      console.error('Failed to fetch products from API:', err)
      set({ error: err.message || 'Gagal memuat produk', isLoading: false })
    }
  },

  addProduct: async (newProduct, imageFile) => {
    set({ isLoading: true, error: null })
    try {
      if (imageFile) {
        const formData = new FormData()
        formData.append('nama', newProduct.namaProduk)
        formData.append('kategori', newProduct.kategori)
        formData.append('harga', String(newProduct.harga))
        formData.append('stok', String(newProduct.stokJumlah))
        formData.append('deskripsi', '-')
        formData.append('gambar', imageFile)
        await api.produk.create(formData)
      } else {
        await api.produk.create({
          nama: newProduct.namaProduk,
          kategori: newProduct.kategori,
          harga: newProduct.harga,
          stok: newProduct.stokJumlah,
          deskripsi: '-',
        })
      }
      await get().fetchProducts()
      return true
    } catch (err: any) {
      console.error('Failed to add product via API:', err)
      // Fallback local update
      const id = `PRD-${Date.now().toString().slice(-4)}`
      const sku = `SKU-${Date.now().toString().slice(-4)}`
      const item: ProductItem = {
        ...newProduct,
        id,
        sku,
        no: 1,
      }
      const updatedList = [item, ...get().products].map((p, idx) => ({
        ...p,
        no: idx + 1,
      }))
      set({ products: updatedList, isLoading: false })
      return false
    }
  },

  updateProduct: async (id, updated, imageFile) => {
    set({ isLoading: true, error: null })
    try {
      if (imageFile) {
        const formData = new FormData()
        if (updated.namaProduk) formData.append('nama', updated.namaProduk)
        if (updated.kategori) formData.append('kategori', updated.kategori)
        if (updated.harga !== undefined)
          formData.append('harga', String(updated.harga))
        if (updated.stokJumlah !== undefined)
          formData.append('stok', String(updated.stokJumlah))
        formData.append('gambar', imageFile)
        await api.produk.update(id, formData)
      } else {
        await api.produk.update(id, {
          nama: updated.namaProduk,
          kategori: updated.kategori,
          harga: updated.harga,
          stok: updated.stokJumlah,
        })
      }
      await get().fetchProducts()
      return true
    } catch (err: any) {
      console.error('Failed to update product via API:', err)
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? { ...p, ...updated } : p
        ),
        isLoading: false,
      }))
      return false
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await api.produk.delete(id)
      await get().fetchProducts()
      return true
    } catch (err: any) {
      console.error('Failed to delete product via API:', err)
      set((state) => ({
        products: state.products
          .filter((p) => p.id !== id)
          .map((p, idx) => ({ ...p, no: idx + 1 })),
        isLoading: false,
      }))
      return false
    }
  },

  resetProducts: () => set({ products: [] }),
}))
