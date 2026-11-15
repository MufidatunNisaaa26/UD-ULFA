import { useLoginForm } from '../features/auth/hooks/useLoginForm'
import { LoginForm } from '../features/auth/components/LoginForm'
import { GreetingPanel } from '../features/auth/components/GreetingPanel'
import { OrganicPurpleBackground } from '../features/auth/components/OrganicPurpleBackground'

export function LoginPage() {
  const {
    formData,
    errors,
    showPassword,
    isSubmitting,
    toastMessage,
    handleInputChange,
    toggleShowPassword,
    handleForgotPassword,
    handleSubmit,
  } = useLoginForm()

  return (
    <main
      className="h-screen max-h-screen w-full flex flex-col justify-between relative overflow-hidden pl-6 sm:pl-8 lg:pl-10 xl:pl-12 pr-6 sm:pr-8 lg:pr-12 xl:pr-16 pt-5 sm:pt-6 lg:pt-7 pb-0 select-none"
      style={{ paddingBottom: 0, marginBottom: 0 }}
    >
      {/* Code-Generated Organic Vector Waves Background */}
      <OrganicPurpleBackground />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-bounce transition-all">
          <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700/50">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Content Area - Grid Mentok ke Kiri & Bottom-Aligned untuk Ilustrasi */}
      <div
        className="w-full h-full flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-end justify-between z-10 pb-0"
        style={{ paddingBottom: 0, marginBottom: 0 }}
      >
        {/* Left Column: Brand Logo + Greeting & Illustration (55% -> col-span-7) */}
        <GreetingPanel />

        {/* Right Column: Login Card - Vertically Centered & Slightly Centered in Right Area */}
        <div className="lg:col-span-5 flex justify-center items-center self-center shrink-0 lg:-translate-x-8">
          <LoginForm
            formData={formData}
            errors={errors}
            showPassword={showPassword}
            isSubmitting={isSubmitting}
            onInputChange={handleInputChange}
            onToggleShowPassword={toggleShowPassword}
            onForgotPassword={handleForgotPassword}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  )
}

export default LoginPage
