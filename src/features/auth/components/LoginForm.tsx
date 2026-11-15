import React from 'react'
import { Lock, Eye, EyeOff, CircleUser, Loader2 } from 'lucide-react'
import type { LoginFormData } from '../schemas/loginSchema'

interface LoginFormProps {
  className?: string
  formData: LoginFormData
  errors: Partial<Record<keyof LoginFormData | 'general', string>>
  showPassword: boolean
  isSubmitting: boolean
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onToggleShowPassword: () => void
  onForgotPassword: () => void
  onSubmit: (e: React.FormEvent) => void
}

export function LoginForm({
  className = '',
  formData,
  errors,
  showPassword,
  isSubmitting,
  onInputChange,
  onToggleShowPassword,
  onForgotPassword,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className={`bg-white rounded-[15px] shadow-[0_24px_60px_rgba(101,52,217,0.14),0_10px_30px_rgba(0,0,0,0.04)] border border-slate-100/90 px-6 py-6 w-full max-w-[340px] min-h-[360px] h-auto flex flex-col select-none transition-all ${className}`}>
      <h2 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight text-center">
        Login
      </h2>

      <form onSubmit={onSubmit} className="flex flex-1 flex-col justify-between" noValidate>
        <div>
          {/* Nama Pengguna */}
          <div className="mb-3.5">
            <label
              htmlFor="username"
              className="block text-sm font-bold text-slate-800 mb-1.5"
            >
              Nama Pengguna
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <CircleUser className="w-5 h-5 text-slate-400" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={formData.username}
                onChange={onInputChange}
                placeholder="Masukkan nama pengguna"
                className={`w-full h-10 pl-11 pr-3 text-sm rounded-[10px] border transition-all outline-none bg-white placeholder:text-slate-400 ${
                  errors.username
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-red-900'
                    : 'border-slate-200 focus:border-[#6534d9] focus:ring-2 focus:ring-purple-100 text-slate-800'
                }`}
              />
            </div>
            {errors.username && (
              <p className="text-xs text-red-500 mt-1 font-medium">{errors.username}</p>
            )}
          </div>

          {/* Kata Sandi */}
          <div className="mb-1">
            <label
              htmlFor="password"
              className="block text-sm font-bold text-slate-800 mb-1.5"
            >
              Kata Sandi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5 text-slate-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={formData.password}
                onChange={onInputChange}
                placeholder="Masukkan kata sandi"
                className={`w-full h-10 pl-11 pr-11 text-sm rounded-[10px] border transition-all outline-none bg-white placeholder:text-slate-400 tracking-wider ${
                  errors.password
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-red-900 tracking-normal'
                    : 'border-slate-200 focus:border-[#6534d9] focus:ring-2 focus:ring-purple-100 text-slate-800'
                }`}
              />
              <button
                type="button"
                onClick={onToggleShowPassword}
                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1 font-medium">{errors.password}</p>
            )}

            {/* Lupa Kata Sandi */}
            <div className="flex justify-end mt-2 text-xs">
              <button
                type="button"
                onClick={onForgotPassword}
                className="font-semibold text-[#6534d9] hover:text-[#5324c4] transition-colors cursor-pointer"
              >
                Lupa kata sandi?
              </button>
            </div>
          </div>
        </div>

        {/* Tombol Masuk */}
        <div className="mt-4 pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-5 rounded-[10px] bg-[#6534d9] hover:bg-[#582bc4] active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:shadow-purple-600/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <span>Masuk</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
