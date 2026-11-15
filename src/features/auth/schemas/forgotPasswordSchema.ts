import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  idKasir: z.string().trim().optional(),
  method: z.enum(['whatsapp', 'email']),
  phoneNumber: z
    .string()
    .trim()
    .optional(),
  email: z
    .string()
    .trim()
    .optional(),
}).superRefine((data, ctx) => {
  if (data.method === 'whatsapp') {
    if (!data.phoneNumber || data.phoneNumber.trim().length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['phoneNumber'],
        message: 'Nomor WhatsApp terdaftar wajib diisi minimal 8 digit.',
      })
    }
  } else if (data.method === 'email') {
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['email'],
        message: 'Alamat email admin tidak valid.',
      })
    }
  }
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

