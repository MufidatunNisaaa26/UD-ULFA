import { z } from 'zod'

export const transactionItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  name: z.string().min(1, 'Nama produk wajib ada'),
  unitPrice: z.number().min(0, 'Harga unit tidak valid'),
  quantity: z.number().min(1, 'Jumlah barang minimal 1'),
  subtotal: z.number().min(0),
  imageUrl: z.string().optional(),
  category: z.string().optional(),
})

export const checkoutSchema = z
  .object({
    transactionNumber: z.string().min(1),
    items: z.array(transactionItemSchema).min(1, 'Keranjang transaksi tidak boleh kosong'),
    subtotal: z.number().min(0),
    discount: z.number().min(0).default(0),
    totalBayar: z.number().min(1, 'Total bayar tidak valid'),
    cashReceived: z.number().min(0, 'Nominal pembayaran wajib diisi'),
    change: z.number(),
    paymentMethod: z.literal('Tunai').default('Tunai'),
  })
  .refine((data) => data.cashReceived >= data.totalBayar, {
    message: 'Uang yang diterima kurang dari total bayar',
    path: ['cashReceived'],
  })

export type TransactionItem = z.infer<typeof transactionItemSchema>
export type CheckoutFormValues = z.infer<typeof checkoutSchema>

