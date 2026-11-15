import React from 'react'
import { Loader2 } from 'lucide-react'

interface OtpVerificationCardProps {
  otpDigits: string[]
  activeIndex: number
  error: string | null
  isSubmitting: boolean
  expireSeconds: number
  resendSeconds: number
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>
  formatTime?: (seconds: number) => string
  onDigitChange: (index: number, value: string) => void
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void
  onSetActiveIndex: (index: number) => void
  onResendOtp: () => void
  onAlternateVoiceSms?: () => void
  onBackToLogin?: () => void
  onEditPhoneNumber?: () => void
  onSubmit: (e: React.FormEvent) => void
}

export function OtpVerificationCard({
  otpDigits,
  activeIndex,
  error,
  isSubmitting,
  resendSeconds,
  inputRefs,
  onDigitChange,
  onKeyDown,
  onSetActiveIndex,
  onResendOtp,
  onBackToLogin,
  onSubmit,
}: OtpVerificationCardProps) {
  return (
    <div className="w-full max-w-[380px] bg-white rounded-[15px] shadow-[0_24px_60px_rgba(101,52,217,0.14),0_10px_30px_rgba(0,0,0,0.04)] border border-slate-100/90 px-6 py-6 select-none transition-all">
      {/* Title & Subtitle */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Verifikasi Kode OTP
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed mt-2">
          Masukkan 6 digit kode OTP yang telah dikirimkan ke WhatsApp Anda di{' '}
          <span className="font-semibold text-slate-700">+62 *******7890</span>.
        </p>
      </div>

      {/* OTP Input Form */}
      <form onSubmit={onSubmit} noValidate>
        {/* 6 Digit Input Boxes */}
        <div className="flex items-center justify-between gap-2 mb-2">
          {otpDigits.map((digit, index) => {
            const isCurrentActive = activeIndex === index
            const isFilled = digit.length > 0

            return (
              <div key={index} className="relative flex-1">
                <input
                  ref={(el) => {
                    inputRefs.current[index] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onClick={() => onSetActiveIndex(index)}
                  onChange={(e) => onDigitChange(index, e.target.value)}
                  onKeyDown={(e) => onKeyDown(index, e)}
                  aria-label={`Digit OTP ke-${index + 1}`}
                  className={`w-full h-11 text-center text-lg font-bold rounded-[10px] transition-all outline-none cursor-pointer ${
                    isCurrentActive
                      ? 'border-2 border-[#6534d9] bg-white ring-2 ring-purple-100 text-slate-900 shadow-sm'
                      : isFilled
                      ? 'border border-[#6534d9]/50 bg-white text-slate-900'
                      : 'border border-purple-100/80 bg-[#f8f7fd] text-slate-400 hover:border-purple-200'
                  }`}
                />
                {!isFilled && !isCurrentActive && (
                  <span className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold pointer-events-none select-none">
                    •
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Error message */}
        {error && (
          <p className="text-center text-xs text-red-500 font-medium mt-1">{error}</p>
        )}

        {/* Teks Kirim Ulang Simpel di Bawah Kotak OTP */}
        <div className="text-center text-xs text-slate-500 my-4 select-none">
          <span>Tidak menerima kode? </span>
          {resendSeconds > 0 ? (
            <span>
              Kirim ulang{' '}
              <span className="font-semibold text-[#6534d9]">
                ({resendSeconds}s)
              </span>
            </span>
          ) : (
            <button
              type="button"
              onClick={onResendOtp}
              className="font-semibold text-[#6534d9] hover:text-[#5324c4] transition-colors cursor-pointer underline ml-1"
            >
              Kirim ulang
            </button>
          )}
        </div>

        {/* Action Buttons: Kembali & Verifikasi */}
        <div className="pt-1 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full py-2.5 px-3 rounded-[10px] border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.99] text-slate-700 font-bold text-sm shadow-sm transition-all flex items-center justify-center cursor-pointer"
          >
            <span>Kembali</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-3 rounded-[10px] bg-[#6534d9] hover:bg-[#582bc4] active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:shadow-purple-600/40 transition-all flex items-center justify-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <span>Verifikasi</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default OtpVerificationCard
