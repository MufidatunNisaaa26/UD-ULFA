import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, 'Kata sandi baru wajib diisi.')
      .min(6, 'Kata sandi minimal 6 karakter.'),
    confirmPassword: z
      .string()
      .min(1, 'Konfirmasi kata sandi wajib diisi.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Konfirmasi kata sandi tidak cocok.',
    path: ['confirmPassword'],
  })

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

