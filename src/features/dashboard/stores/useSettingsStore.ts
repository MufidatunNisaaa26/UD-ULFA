import { create } from 'zustand'

export interface AccountInfo {
  username: string
  email: string
  whatsapp: string
  tanggalDibuat: string
  statusAkun: string
}

export interface SecurityInfo {
  passwordMasked: string
  isVerified: boolean
  terakhirLogin: string
  statusSesi: string
}

interface SettingsState {
  accountInfo: AccountInfo
  securityInfo: SecurityInfo
}

export const useSettingsStore = create<SettingsState>(() => ({
  accountInfo: {
    username: 'UDULFA',
    email: 'Belum didaftarkan',
    whatsapp: 'Belum didaftarkan',
    tanggalDibuat: '19 November 2026',
    statusAkun: 'Aktif',
  },
  securityInfo: {
    passwordMasked: '••••••••••',
    isVerified: true,
    terakhirLogin: '11 November 2026, 08:30 WIB',
    statusSesi: 'Sesi Aktif',
  },
}))

