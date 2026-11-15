import { z } from 'zod'

export const expenseSchema = z.object({
  namaKegiatan: z
    .string()
    .trim()
    .min(1, 'Nama kegiatan / keperluan wajib diisi'),
  tanggal: z
    .string()
    .trim()
    .min(1, 'Tanggal pengeluaran wajib diisi'),
  waktu: z.string().optional(),
  nominal: z
    .number({
      message: 'Nominal harus berupa angka valid',
    })
    .min(1, 'Nominal pengeluaran harus lebih dari 0'),
})

export type ExpenseFormValues = z.infer<typeof expenseSchema>

