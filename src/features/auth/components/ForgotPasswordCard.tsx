import React from 'react'
import {
  MessageSquare,
  Mail,
  Phone,
  Loader2,
} from 'lucide-react'
import type { ForgotPasswordFormData } from '../schemas/forgotPasswordSchema'

interface ForgotPasswordCardProps {
  formData: ForgotPasswordFormData
  errors: Partial<Record<keyof ForgotPasswordFormData, string>>
  isSubmitting: boolean
  isOtpSent?: boolean
  onMethodChange: (method: 'whatsapp' | 'email') => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBackToLogin?: () => void
  onContactSupervisor?: () => void
  onSubmit: (e: React.FormEvent) => void
}

export function ForgotPasswordCard({
  formData,
  errors,
  isSubmitting,
  onMethodChange,
  onInputChange,
  onBackToLogin,
  onSubmit,
}: ForgotPasswordCardProps) {
  return (
    <div className="w-full max-w-[340px] bg-white rounded-[15px] shadow-[0_24px_60px_rgba(101,52,217,0.14),0_10px_30px_rgba(0,0,0,0.04)] border border-slate-100/90 px-6 py-6 select-none transition-all">
      {/* Title */}
      <h2 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight text-center">
        Lupa Kata Sandi?
      </h2>

      {/* Tab Switcher WhatsApp & Email Admin */}
      <div className="bg-[#f3effd] p-1 rounded-[10px] grid grid-cols-2 gap-1 mb-4 select-none">
        <button
          type="button"
          onClick={() => onMethodChange('whatsapp')}
          className={`py-2 px-2.5 rounded-[8px] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            formData.method === 'whatsapp'
              ? 'bg-white text-[#6534d9] shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#6534d9]" />
          <span>WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={() => onMethodChange('email')}
          className={`py-2 px-2.5 rounded-[8px] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            formData.method === 'email'
              ? 'bg-white text-[#6534d9] shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Mail className="w-3.5 h-3.5 text-[#6534d9]" />
          <span>Email</span>
        </button>
      </div>

      {/* Form Fields */}
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {/* WhatsApp / Email Field */}
        {formData.method === 'whatsapp' ? (
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-bold text-slate-800 mb-1.5 text-left"
            >
              Nomor WhatsApp
            </label>
            <div
              className={`h-10 flex items-center bg-white border rounded-[10px] px-3 transition-all ${
                errors.phoneNumber
                  ? 'border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100'
                  : 'border-slate-200 focus-within:border-[#6534d9] focus-within:ring-2 focus-within:ring-purple-100'
              }`}
            >
              <Phone className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
              <span className="text-sm font-semibold text-slate-700 mr-2 select-none shrink-0">
                +62
              </span>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={onInputChange}
                placeholder="812-3456-7890"
                className="w-full h-full text-sm text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-xs text-red-500 mt-1 font-medium text-left">{errors.phoneNumber}</p>
            )}
          </div>
        ) : (
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-slate-800 mb-1.5 text-left"
            >
              Email
            </label>
            <div
              className={`h-10 flex items-center bg-white border rounded-[10px] px-3 transition-all ${
                errors.email
                  ? 'border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100'
                  : 'border-slate-200 focus-within:border-[#6534d9] focus-within:ring-2 focus-within:ring-purple-100'
              }`}
            >
              <Mail className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={onInputChange}
                placeholder="admin.kasir@udulfa.com"
                className="w-full h-full text-sm text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 font-medium text-left">{errors.email}</p>
            )}
          </div>
        )}

        {/* Action Buttons: Kembali & Kirim Kode OTP */}
        <div className="pt-2 grid grid-cols-2 gap-2.5">
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
              <span>Kirim OTP</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPasswordCard
