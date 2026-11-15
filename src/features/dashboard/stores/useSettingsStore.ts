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
    username: 'admin_udulfa',
    email: 'admin@udulfa.com',
    whatsapp: '+62 812-3456-7890',
    tanggalDibuat: '12 Oktober 2026',
    statusAkun: 'Aktif',
  },
  securityInfo: {
    passwordMasked: '••••••••••',
    isVerified: true,
    terakhirLogin: '11 November 2026, 08:30 WIB',
    statusSesi: 'Sesi Aktif',
  },
}))

