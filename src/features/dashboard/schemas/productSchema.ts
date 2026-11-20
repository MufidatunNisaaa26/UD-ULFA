import { z } from 'zod'

export const productCategories = [
  'ATK',
  'Perlengkapan Sekolah',
  'Perlengkapan Jenazah',
] as const

export type ProductCategory = (typeof productCategories)[number]

export const productSchema = z.object({
  namaProduk: z
    .string()
    .trim()
    .min(1, 'Nama produk wajib diisi'),
  kategori: z.enum(productCategories, {
    message: 'Kategori produk wajib dipilih',
  }),
  hargaBeli: z
    .number({
      message: 'Harga modal/beli harus berupa angka valid',
    })
    .min(0, 'Harga modal tidak boleh negatif')
    .optional(),
  harga: z
    .number({
      message: 'Harga jual produk harus berupa angka valid',
    })
    .min(1, 'Harga produk harus lebih dari 0'),
  stok: z
    .string()
    .trim()
    .min(1, 'Jumlah stok produk wajib diisi'),
})

export type ProductFormValues = z.infer<typeof productSchema>
