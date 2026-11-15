import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginSchema, type LoginFormData } from '../schemas/loginSchema'
import { registeredAccounts, type UserAccount } from '../data/registeredAccounts'

export function useLoginForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    rememberDevice: true,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData | 'general', string>>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const stored = localStorage.getItem('udulfa_active_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev))
    }, 4000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (errors[name as keyof LoginFormData] || errors.general) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
        general: undefined,
      }))
    }
  }

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleForgotPassword = () => {
    navigate('/forgot-password')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const result = loginSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {}
      for (const issue of result.error.issues) {
        const path = issue.path[0] as keyof LoginFormData
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

      const matchedAccount = registeredAccounts.find(
        (acc) =>
          acc.username.trim().toLowerCase() === formData.username.trim().toLowerCase(),
      )

      if (!matchedAccount) {
        setErrors({
          username: 'Akun tidak terdaftar. Gunakan "kasir_siti" atau "UDULFA".',
        })
        showToast('❌ Akun tidak ditemukan. Gunakan kasir_siti atau UDULFA')
        return
      }

      if (matchedAccount.password !== formData.password) {
        setErrors({
          password: 'Kata sandi tidak sesuai. Silakan periksa kembali.',
        })
        showToast('❌ Kata sandi tidak sesuai!')
        return
      }

      // Login berhasil
      setCurrentUser(matchedAccount)
      try {
        if (formData.rememberDevice) {
          localStorage.setItem('udulfa_active_user', JSON.stringify(matchedAccount))
        } else {
          sessionStorage.setItem('udulfa_active_user', JSON.stringify(matchedAccount))
        }
      } catch {
        // ignore storage error
      }

      showToast(`✅ Login berhasil! Selamat datang, ${matchedAccount.displayName} (${matchedAccount.role}).`)
      navigate('/dashboard')
    }, 600)
  }

  return {
    formData,
    errors,
    showPassword,
    isSubmitting,
    toastMessage,
    currentUser,
    handleInputChange,
    toggleShowPassword,
    handleForgotPassword,
    handleSubmit,
  }
}
