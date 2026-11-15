import { CheckCircle2 } from 'lucide-react'
import { useSettings } from '../hooks/useSettings'

export function SettingsView() {
  const { accountInfo, securityInfo } = useSettings()

  return (
    <div className="w-full h-full min-h-0 select-none overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {/* 1. Kartu Informasi Akun */}
        <div className="bg-white rounded-[24px] p-6 sm:p-7 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/50 flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-4">
              Informasi Akun
            </h3>

            <div className="divide-y divide-purple-50/80">
              {/* USERNAME */}
              <div className="flex items-center justify-between py-3.5 sm:py-4">
                <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  USERNAME
                </span>
                <span className="px-3.5 py-1.5 rounded-[10px] bg-[#f3edfd] text-[#673ee8] font-bold text-xs">
                  {accountInfo.username}
                </span>
              </div>

              {/* EMAIL AKUN */}
              <div className="flex items-center justify-between py-3.5 sm:py-4">
                <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  EMAIL AKUN
                </span>
                <span className="font-bold text-slate-800 text-xs sm:text-sm">
                  {accountInfo.email}
                </span>
              </div>

              {/* NOMOR WHATSAPP */}
              <div className="flex items-center justify-between py-3.5 sm:py-4">
                <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  NOMOR WHATSAPP
                </span>
                <span className="font-bold text-slate-800 text-xs sm:text-sm">
                  {accountInfo.whatsapp}
                </span>
              </div>

              {/* TANGGAL AKUN DIBUAT */}
              <div className="flex items-center justify-between py-3.5 sm:py-4">
                <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  TANGGAL AKUN DIBUAT
                </span>
                <span className="font-semibold text-slate-700 text-xs sm:text-sm">
                  {accountInfo.tanggalDibuat}
                </span>
              </div>

              {/* STATUS AKUN */}
              <div className="flex items-center justify-between py-3.5 sm:py-4">
                <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  STATUS AKUN
                </span>
                <span className="px-3 py-1 rounded-full bg-[#e6f9f0] text-[#059669] font-bold text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                  <span>{accountInfo.statusAkun}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Kartu Keamanan */}
        <div className="bg-white rounded-[24px] p-6 sm:p-7 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/50 flex flex-col justify-start">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-4">
            Keamanan
          </h3>

          <div className="divide-y divide-purple-50/80">
            {/* PASSWORD */}
            <div className="flex items-center justify-between py-3.5 sm:py-4">
              <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                PASSWORD
              </span>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-800 tracking-widest text-sm sm:text-base">
                  {securityInfo.passwordMasked}
                </span>
                {securityInfo.isVerified && (
                  <CheckCircle2 className="w-4 h-4 text-slate-400 stroke-[2]" />
                )}
              </div>
            </div>

            {/* TERAKHIR LOGIN */}
            <div className="flex items-center justify-between py-3.5 sm:py-4">
              <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                TERAKHIR LOGIN
              </span>
              <span className="font-semibold text-slate-700 text-xs sm:text-sm">
                {securityInfo.terakhirLogin}
              </span>
            </div>

            {/* STATUS SESI */}
            <div className="flex items-center justify-between py-3.5 sm:py-4">
              <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                STATUS SESI
              </span>
              <span className="px-3 py-1 rounded-full bg-[#f3edfd] text-[#673ee8] font-bold text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#673ee8]" />
                <span>{securityInfo.statusSesi}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsView

