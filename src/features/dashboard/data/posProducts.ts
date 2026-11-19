export interface PosProductItem {
  id: string
  name: string
  category: 'ATK' | 'Perlengkapan Sekolah' | 'Perlengkapan Jenazah'
  price: number
  imageUrl: string
  stock: number
  unit: string
}

export const POS_PRODUCTS: PosProductItem[] = []
