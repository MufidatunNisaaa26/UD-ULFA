import { z } from 'zod'

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'Nama Pengguna / ID Kasir wajib diisi.')
    .min(3, 'Minimal 3 karakter.'),
  password: z
    .string()
    .min(1, 'Kata sandi wajib diisi.')
    .min(4, 'Kata sandi minimal 4 karakter.'),
  rememberDevice: z.boolean().default(true),
})

export type LoginFormData = z.infer<typeof loginSchema>

