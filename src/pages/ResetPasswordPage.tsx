import { useResetPassword } from '../features/auth/hooks/useResetPassword'
import { ResetPasswordCard } from '../features/auth/components/ResetPasswordCard'
import { OrganicPurpleBackground } from '../features/auth/components/OrganicPurpleBackground'
import { Store } from 'lucide-react'

export function ResetPasswordPage() {
  const {
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
  } = useResetPassword()

  return (
    <main className="min-h-screen h-screen w-full flex items-center justify-center relative p-4 sm:p-6 lg:p-8 overflow-hidden select-none">
      {/* Code-Generated Organic Vector Waves Background */}
      <OrganicPurpleBackground />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce transition-all">
          <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700/50">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Left Header Logo UD Ulfa */}
      <div className="absolute top-5 sm:top-6 lg:top-7 left-6 sm:left-8 lg:left-10 xl:left-12 flex flex-col items-start z-20">
        <header className="flex items-center gap-2.5 sm:gap-3 select-none">
          <div className="w-10 h-10 rounded-xl bg-[#6534d9] text-white flex items-center justify-center shadow-lg shadow-purple-600/30 shrink-0">
            <Store className="w-5 h-5" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">
              UD ULFA
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5">
              Melayani sepenuh hati
            </p>
          </div>
        </header>
      </div>

      {/* Main Centered Reset Password Card - Pas di Tengah Layar */}
      <div className="w-full flex justify-center items-center z-10 py-6 my-auto">
        <ResetPasswordCard
          formData={formData}
          errors={errors}
          showNewPassword={showNewPassword}
          showConfirmPassword={showConfirmPassword}
          isSubmitting={isSubmitting}
          strengthInfo={strengthInfo}
          onInputChange={handleInputChange}
          onToggleShowNewPassword={toggleShowNewPassword}
          onToggleShowConfirmPassword={toggleShowConfirmPassword}
          onBackToLogin={handleBackToLogin}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Bottom Footer */}
      <footer className="absolute bottom-3 left-0 right-0 text-center text-xs text-slate-400 select-none pointer-events-none z-10">
        <span>© 2024 UD ULFA • Sistem Kasir &amp; Inventaris Terpadu</span>
      </footer>
    </main>
  )
}

export default ResetPasswordPage
