import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { otpSchema } from '../schemas/otpSchema'

export function useOtpVerification() {
  const navigate = useNavigate()
  // Awal form dibuat kosong (tanpa 4 angka awal)
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', ''])
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Kode OTP yang sedang aktif
  const [currentOtp, setCurrentOtp] = useState<string>('482910')
  // Waktu tampil notifikasi popup kode OTP (60 detik)
  const [otpDisplaySeconds, setOtpDisplaySeconds] = useState<number>(60)
  const [isOtpCopied, setIsOtpCopied] = useState<boolean>(false)
  const [isPopupDismissed, setIsPopupDismissed] = useState<boolean>(false)

  // Timer kedaluwarsa sesi (162 detik = 02:42)
  const [expireSeconds, setExpireSeconds] = useState(162)
  // Timer kirim ulang (42 detik)
  const [resendSeconds, setResendSeconds] = useState(42)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev))
    }, 4000)
  }

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setExpireSeconds((prev) => (prev > 0 ? prev - 1 : 0))
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0))
      setOtpDisplaySeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Auto focus input on mount or active change
  useEffect(() => {
    if (inputRefs.current[activeIndex]) {
      inputRefs.current[activeIndex]?.focus()
    }
  }, [activeIndex])

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  const handleDigitChange = (index: number, value: string) => {
    setError(null)
    const cleaned = value.replace(/\D/g, '')

    // Handle single digit input
    if (cleaned.length <= 1) {
      const newDigits = [...otpDigits]
      newDigits[index] = cleaned
      setOtpDigits(newDigits)

      if (cleaned && index < 5) {
        setActiveIndex(index + 1)
      }
      return
    }

    // Handle paste multiple digits
    const pasted = cleaned.slice(0, 6).split('')
    const newDigits = [...otpDigits]
    pasted.forEach((char, i) => {
      if (index + i < 6) {
        newDigits[index + i] = char
      }
    })
    setOtpDigits(newDigits)
    const nextIndex = Math.min(index + pasted.length, 5)
    setActiveIndex(nextIndex)
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        const newDigits = [...otpDigits]
        newDigits[index - 1] = ''
        setOtpDigits(newDigits)
        setActiveIndex(index - 1)
      } else {
        const newDigits = [...otpDigits]
        newDigits[index] = ''
        setOtpDigits(newDigits)
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setActiveIndex(index - 1)
    } else if (e.key === 'ArrowRight' && index < 5) {
      setActiveIndex(index + 1)
    }
  }

  const handleAutoFillOtp = () => {
    const digits = currentOtp.split('')
    setOtpDigits(digits)
    setActiveIndex(5)
    setError(null)
    showToast(`✅ Kode OTP ${currentOtp} berhasil ditempelkan!`)
  }

  const handleCopyOtp = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentOtp)
    }
    setIsOtpCopied(true)
    showToast(`📋 Kode OTP ${currentOtp} disalin ke clipboard!`)
    setTimeout(() => setIsOtpCopied(false), 2000)
  }

  const handleDismissPopup = () => {
    setIsPopupDismissed(true)
  }

  const handleResendOtp = () => {
    if (resendSeconds > 0) {
      return
    }
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setCurrentOtp(newOtp)
    setOtpDisplaySeconds(60)
    setIsPopupDismissed(false)
    setResendSeconds(60)
    setExpireSeconds(180)
    setOtpDigits(['', '', '', '', '', ''])
    setActiveIndex(0)
    showToast(`📲 Kode OTP baru (${newOtp}) telah dikirimkan ke WhatsApp!`)
  }

  const handleAlternateVoiceSms = () => {
    showToast('📞 Mengirimkan kode verifikasi via Panggilan Suara Otomatis...')
  }

  const handleBackToLogin = () => {
    navigate('/forgot-password')
  }

  const handleEditPhoneNumber = () => {
    navigate('/forgot-password')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const fullOtp = otpDigits.join('')
    const result = otpSchema.safeParse({ otp: fullOtp })

    if (!result.success) {
      setError(result.error.issues[0]?.message || 'Lengkapi 6 digit kode OTP.')
      return
    }

    if (fullOtp !== currentOtp) {
      setError(`Kode OTP salah. Masukkan kode verifikasi yang benar: ${currentOtp}`)
      showToast('❌ Kode OTP tidak cocok!')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      showToast('✅ Kode OTP Berhasil Diverifikasi! Membuka sesi buat kata sandi baru...')
      setTimeout(() => {
        navigate('/reset-password')
      }, 700)
    }, 800)
  }

  return {
    otpDigits,
    activeIndex,
    error,
    isSubmitting,
    toastMessage,
    currentOtp,
    otpDisplaySeconds,
    isOtpCopied,
    isPopupDismissed,
    expireSeconds,
    resendSeconds,
    inputRefs,
    formatTime,
    setActiveIndex,
    handleDigitChange,
    handleKeyDown,
    handleAutoFillOtp,
    handleCopyOtp,
    handleDismissPopup,
    handleResendOtp,
    handleAlternateVoiceSms,
    handleBackToLogin,
    handleEditPhoneNumber,
    handleSubmit,
  }
}
