import React from 'react'
import {
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react'
import type { ResetPasswordFormData } from '../schemas/resetPasswordSchema'

interface ResetPasswordCardProps {
  formData: ResetPasswordFormData
  errors: Partial<Record<keyof ResetPasswordFormData, string>>
  showNewPassword: boolean
  showConfirmPassword: boolean
  isSubmitting: boolean
  strengthInfo?: {
    score: number
    label: string
    color: string
  }
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onToggleShowNewPassword: () => void
  onToggleShowConfirmPassword: () => void
  onBackToLogin?: () => void
  onSubmit: (e: React.FormEvent) => void
}

export function ResetPasswordCard({
  formData,
  errors,
  showNewPassword,
  showConfirmPassword,
  isSubmitting,
  onInputChange,
  onToggleShowNewPassword,
  onToggleShowConfirmPassword,
  onBackToLogin,
  onSubmit,
}: ResetPasswordCardProps) {
  return (
    <div className="w-full max-w-[350px] bg-white rounded-[15px] shadow-[0_24px_60px_rgba(101,52,217,0.14),0_10px_30px_rgba(0,0,0,0.04)] border border-slate-100/90 px-6 py-6 select-none transition-all">
      {/* Title */}
      <h2 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight text-center">
        Buat Kata Sandi Baru
      </h2>

      {/* Form Fields */}
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {/* Field 1: Kata Sandi Baru */}
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-bold text-slate-800 mb-1.5 text-left"
          >
            Kata Sandi Baru
          </label>
          <div className="relative">
            <input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={formData.newPassword}
              onChange={onInputChange}
              placeholder="Masukkan kata sandi baru"
              className={`h-10 w-full pl-3 pr-10 text-sm rounded-[10px] border transition-all outline-none bg-[#f8f7fd] placeholder:text-slate-400 ${
                errors.newPassword
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-red-900 bg-red-50/20'
                  : 'border-purple-100/70 focus:border-[#6534d9] focus:ring-2 focus:ring-purple-100 text-slate-800 focus:bg-white'
              }`}
            />
            <button
              type="button"
              onClick={onToggleShowNewPassword}
              aria-label={showNewPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {showNewPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-xs text-red-500 mt-1 font-medium text-left">{errors.newPassword}</p>
          )}
        </div>

        {/* Field 2: Konfirmasi Kata Sandi Baru */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-bold text-slate-800 mb-1.5 text-left"
          >
            Konfirmasi Kata Sandi Baru
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={onInputChange}
              placeholder="Konfirmasi kata sandi baru"
              className={`h-10 w-full pl-3 pr-10 text-sm rounded-[10px] border transition-all outline-none bg-[#f8f7fd] placeholder:text-slate-400 ${
                errors.confirmPassword
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-red-900 bg-red-50/20'
                  : 'border-purple-100/70 focus:border-[#6534d9] focus:ring-2 focus:ring-purple-100 text-slate-800 focus:bg-white'
              }`}
            />
            <button
              type="button"
              onClick={onToggleShowConfirmPassword}
              aria-label={showConfirmPassword ? 'Sembunyikan konfirmasi' : 'Tampilkan konfirmasi'}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1 font-medium text-left">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Action Buttons: Kembali & Simpan */}
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
                <span>Menyimpan...</span>
              </>
            ) : (
              <span>Simpan</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ResetPasswordCard
