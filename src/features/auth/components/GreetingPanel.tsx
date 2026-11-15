import { Store } from 'lucide-react'
import heroIllustration from '../../../assets/login-hero-transparent.png'

export function GreetingPanel() {
  return (
    <div
      className="lg:col-span-7 flex flex-col justify-between items-start text-left h-full min-h-0 self-stretch pl-0 ml-0 relative"
      style={{ paddingBottom: 0, marginBottom: 0 }}
    >
      {/* Brand Header */}
      <div className="w-full text-left shrink-0 pl-0 ml-0">
        {/* Brand Logo UD ULFA (Lebih Besar & Menonjol) */}
        <div className="flex items-center gap-2.5 sm:gap-3 select-none mb-3.5 sm:mb-4 lg:mb-5 text-left">
          <div className="w-10 h-10 rounded-xl bg-[#6534d9] text-white flex items-center justify-center shadow-lg shadow-purple-600/30 shrink-0">
            <Store className="w-5 h-5" />
          </div>
          <div className="flex flex-col justify-center text-left">
            <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight text-left">
              UD ULFA
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5 text-left">
              Melayani sepenuh hati
            </p>
          </div>
        </div>

      </div>

      {/* Illustration centered in the remaining left-panel space */}
      <div
        className="w-full flex-1 min-h-0 flex items-center justify-center mt-auto overflow-visible relative bottom-0"
        style={{
          paddingBottom: 0,
          marginBottom: 0,
          bottom: 0,
        }}
      >
        <img
          src={heroIllustration}
          alt="Ilustrasi Kasir UD ULFA"
          className="block w-[480px] h-[480px] max-w-full object-contain drop-shadow-2xl select-none pointer-events-none"
          style={{
            marginLeft: 0,
            marginBottom: 0,
            paddingBottom: 0,
            bottom: 0,
          }}
        />
      </div>
    </div>
  )
}

export default GreetingPanel
