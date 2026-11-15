import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from '../schemas/resetPasswordSchema'
import { registeredAccounts } from '../data/registeredAccounts'

export function useResetPassword() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    newPassword: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ResetPasswordFormData, string>>>({})
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev))
    }, 4000)
  }

  // Hitung kekuatan kata sandi
  const strengthInfo = useMemo(() => {
    const pw = formData.newPassword
    if (!pw) {
      return { score: 0, label: '', color: 'bg-slate-200' }
    }

    let score = 0
    if (pw.length >= 6) score += 1
    if (/[A-Z]/.test(pw) || /[a-z]/.test(pw)) score += 1
    if (/\d/.test(pw) || /[^A-Za-z0-9]/.test(pw)) score += 1

    if (score === 1) {
      return { score: 1, label: 'Lemah', color: 'bg-red-500' }
    }
    if (score === 2) {
      return { score: 2, label: 'Sedang', color: 'bg-amber-500' }
    }
    return { score: 3, label: 'Kuat', color: 'bg-emerald-500' }
  }, [formData.newPassword])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name as keyof ResetPasswordFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const toggleShowNewPassword = () => {
    setShowNewPassword((prev) => !prev)
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  const handleBackToLogin = () => {
    navigate('/verify-otp')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const result = resetPasswordSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ResetPasswordFormData, string>> = {}
      for (const issue of result.error.issues) {
        const path = issue.path[0] as keyof ResetPasswordFormData
        if (path && !fieldErrors[path]) {
          fieldErrors[path] = issue.message
        }
      }
      setErrors(fieldErrors)
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)

      // Update password di registeredAccounts untuk UDULFA
      const account = registeredAccounts.find((acc) => acc.username === 'UDULFA')
      if (account) {
        account.password = formData.newPassword
      }

      showToast('🎉 Kata sandi berhasil diperbarui! Mengalihkan ke login...')
      setTimeout(() => {
        navigate('/login')
      }, 1200)
    }, 900)
  }

  return {
    formData,
    errors,
    showNewPassword,
    showConfirmPassword,
    isSubmitting,
    toastMessage,
    strengthInfo,
    handleInputChange,
    toggleShowNewPassword,
    toggleShowConfirmPassword,
    handleBackToLogin,
    handleSubmit,
  }
}

