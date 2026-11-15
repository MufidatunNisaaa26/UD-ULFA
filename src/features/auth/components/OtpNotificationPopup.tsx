import { MessageSquare, Clock, Copy, Check, X, ArrowDownToLine } from 'lucide-react'

interface OtpNotificationPopupProps {
  currentOtp: string
  otpDisplaySeconds: number
  isOtpCopied: boolean
  isDismissed: boolean
  onClose: () => void
  onCopyOtp: () => void
  onAutoFillOtp: () => void
}

export function OtpNotificationPopup({
  currentOtp,
  otpDisplaySeconds,
  isOtpCopied,
  isDismissed,
  onClose,
  onCopyOtp,
  onAutoFillOtp,
}: OtpNotificationPopupProps) {
  if (otpDisplaySeconds <= 0 || isDismissed) {
    return null
  }

  return (
    <aside
      aria-label="Notifikasi WhatsApp OTP Masuk"
      className="fixed top-5 right-5 sm:right-6 z-50 max-w-sm sm:max-w-md w-[calc(100vw-2.5rem)] transition-all animate-bounce-short"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-emerald-950/15 border border-emerald-200/90 p-4 transition-all">
        {/* Header row */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block leading-tight">
                WhatsApp Toko • Notifikasi Masuk
              </span>
              <span className="text-[10px] text-emerald-600 font-medium">Baru saja</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-600" />
              <span>{otpDisplaySeconds}s</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              title="Tutup notifikasi"
              aria-label="Tutup notifikasi OTP"
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content row */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Kode OTP Verifikasi
            </span>
            <span className="text-2xl font-extrabold text-emerald-700 tracking-widest font-mono">
              {currentOtp}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onCopyOtp}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1"
            >
              {isOtpCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Salin</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onAutoFillOtp}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1"
            >
              <ArrowDownToLine className="w-3.5 h-3.5" />
              <span>Gunakan Kode</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

