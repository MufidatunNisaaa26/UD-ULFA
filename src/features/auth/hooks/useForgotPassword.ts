import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from '../schemas/forgotPasswordSchema'

export function useForgotPassword() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    idKasir: '',
    method: 'whatsapp',
    phoneNumber: '',
    email: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ForgotPasswordFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev))
    }, 4000)
  }

  const setMethod = (method: 'whatsapp' | 'email') => {
    setFormData((prev) => ({
      ...prev,
      method,
    }))
    setErrors({})
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name as keyof ForgotPasswordFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleBackToLogin = () => {
    navigate('/login')
  }

  const handleContactSupervisor = () => {
    showToast('📞 Menghubungi Supervisor: Pak Rahmad (+62 812-8899-0011)...')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const result = forgotPasswordSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ForgotPasswordFormData, string>> = {}
      for (const issue of result.error.issues) {
        const path = issue.path[0] as keyof ForgotPasswordFormData
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
      setIsOtpSent(true)
      const target =
        formData.method === 'whatsapp'
          ? `nomor WhatsApp +62 ${formData.phoneNumber}`
          : `email ${formData.email}`
      showToast(`📲 Kode OTP 6-digit berhasil dikirimkan ke ${target}!`)
      setTimeout(() => {
        navigate('/verify-otp')
      }, 700)
    }, 900)
  }

  return {
    formData,
    errors,
    isSubmitting,
    isOtpSent,
    toastMessage,
    setMethod,
    handleInputChange,
    handleBackToLogin,
    handleContactSupervisor,
    handleSubmit,
  }
}

