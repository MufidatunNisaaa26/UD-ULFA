import { z } from 'zod'

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'Kode OTP harus terdiri dari 6 digit angka.')
    .regex(/^\d{6}$/, 'Kode OTP hanya boleh berisi angka.'),
})

export type OtpFormData = z.infer<typeof otpSchema>

