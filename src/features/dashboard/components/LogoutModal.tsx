import { createPortal } from 'react-dom'
import { LogOut } from 'lucide-react'

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4 select-none animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[24px] p-6 sm:p-7 max-w-[380px] w-full text-center shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-slate-100 flex flex-col items-center animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ikon Logout Bulat */}
        <div className="w-14 h-14 rounded-full bg-[#feeef0] text-[#e11d48] flex items-center justify-center mb-4 shadow-2xs">
          <LogOut className="w-6 h-6 stroke-[2.2] translate-x-0.5" />
        </div>

        {/* Teks Konfirmasi */}
        <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-6">
          Apakah anda yakin ingin keluar?
        </h3>

        {/* Tombol Aksi: Batal & Keluar */}
        <div className="w-full flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 sm:py-3 rounded-[14px] bg-[#f0e9fd] hover:bg-[#e4d8fb] text-[#673ee8] text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-98"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 sm:py-3 rounded-[14px] bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-red-600/20 transition-all cursor-pointer active:scale-98"
          >
            <LogOut className="w-4 h-4 stroke-[2.2]" />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default LogoutModal

