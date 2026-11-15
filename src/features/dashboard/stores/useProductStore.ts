import { create } from 'zustand'
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

const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'PRD-001',
    no: 1,
    sku: 'ATK-SIDU-38',
    namaProduk: 'Buku Tulis SiDU',
    kategori: 'ATK',
    harga: 35000,
    stokJumlah: 48,
    stokSatuan: 'Pak',
    imageType: 'buku-sidu',
  },
  {
    id: 'PRD-002',
    no: 2,
    sku: 'PJN-MORI-12',
    namaProduk: 'Kain Kafan Mori',
    kategori: 'Perlengkapan Jenazah',
    harga: 565000,
    stokJumlah: 14,
    stokSatuan: 'Roll',
    imageType: 'kain-kafan',
  },
  {
    id: 'PRD-003',
    no: 3,
    sku: 'PAK-PRAMUKA-L',
    namaProduk: 'Seragam Pramuka',
    kategori: 'Perlengkapan Sekolah',
    harga: 75000,
    stokJumlah: 4,
    stokSatuan: 'Pcs',
    imageType: 'seragam-pramuka',
  },
  {
    id: 'PRD-004',
    no: 4,
    sku: 'ATK-FABER-2B',
    namaProduk: 'Pensil 2B Faber',
    kategori: 'ATK',
    harga: 52000,
    stokJumlah: 28,
    stokSatuan: 'Lusin',
    imageType: 'pensil-faber',
  },
  {
    id: 'PRD-005',
    no: 5,
    sku: 'ATK-SNOWMAN-M',
    namaProduk: 'Spidol Snowman',
    kategori: 'ATK',
    harga: 11000,
    stokJumlah: 85,
    stokSatuan: 'Pcs',
    imageType: 'spidol-snowman',
  },
  {
    id: 'PRD-006',
    no: 6,
    sku: 'PJN-KASTURI-100',
    namaProduk: 'Minyak Wangi Jenazah',
    kategori: 'Perlengkapan Jenazah',
    harga: 45000,
    stokJumlah: 19,
    stokSatuan: 'Botol',
    imageType: 'minyak-wangi',
  },
  {
    id: 'PRD-007',
    no: 7,
    sku: 'PRL-TAS-POLO',
    namaProduk: 'Tas Ransel Sekolah',
    kategori: 'Perlengkapan Sekolah',
    harga: 135000,
    stokJumlah: 0,
    stokSatuan: 'Pcs',
    imageType: 'tas-ransel',
  },
  {
    id: 'PRD-008',
    no: 8,
    sku: 'PJN-KAPAS-500',
    namaProduk: 'Kapas Gulung Medis',
    kategori: 'Perlengkapan Jenazah',
    harga: 28000,
    stokJumlah: 32,
    stokSatuan: 'Roll',
    imageType: 'kapas-medis',
  },
  {
    id: 'PRD-009',
    no: 9,
    sku: 'ATK-JOYKO-B40',
    namaProduk: 'Penghapus Joyko',
    kategori: 'ATK',
    harga: 18000,
    stokJumlah: 50,
    stokSatuan: 'Pak',
    imageType: 'penghapus-joyko',
  },
  {
    id: 'PRD-010',
    no: 10,
    sku: 'PAK-SD-MP-02',
    namaProduk: 'Seragam Merah Putih',
    kategori: 'Perlengkapan Sekolah',
    harga: 70000,
    stokJumlah: 6,
    stokSatuan: 'Pcs',
    imageType: 'seragam-merah-putih',
  },
  {
    id: 'PRD-011',
    no: 11,
    sku: 'PJN-TIKAR-2M',
    namaProduk: 'Tikar Pandan Jenazah',
    kategori: 'Perlengkapan Jenazah',
    harga: 85000,
    stokJumlah: 8,
    stokSatuan: 'Lembar',
    imageType: 'tikar-pandan',
  },
  {
    id: 'PRD-012',
    no: 12,
    sku: 'ATK-STD-AE7',
    namaProduk: 'Pulpen Standard AE7',
    kategori: 'ATK',
    harga: 24000,
    stokJumlah: 40,
    stokSatuan: 'Lusin',
    imageType: 'pulpen-standard',
  },
]

interface ProductState {
  products: ProductItem[]
  addProduct: (newProduct: Omit<ProductItem, 'id' | 'no' | 'sku'>) => void
  updateProduct: (id: string, updated: Partial<ProductItem>) => void
  deleteProduct: (id: string) => void
  resetProducts: () => void
}

export const useProductStore = create<ProductState>((set) => ({
  products: INITIAL_PRODUCTS,

  addProduct: (newProduct) =>
    set((state) => {
      const id = `PRD-${Date.now().toString().slice(-4)}`
      const sku = `SKU-${Date.now().toString().slice(-4)}`
      const item: ProductItem = {
        ...newProduct,
        id,
        sku,
        no: 1,
      }
      const updatedList = [item, ...state.products].map((p, idx) => ({
        ...p,
        no: idx + 1,
      }))
      return { products: updatedList }
    }),

  updateProduct: (id, updated) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updated } : p
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products
        .filter((p) => p.id !== id)
        .map((p, idx) => ({ ...p, no: idx + 1 })),
    })),

  resetProducts: () => set({ products: INITIAL_PRODUCTS }),
}))

