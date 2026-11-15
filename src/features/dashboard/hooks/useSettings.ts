import { useSettingsStore } from '../stores/useSettingsStore'

export function useSettings() {
  const accountInfo = useSettingsStore((state) => state.accountInfo)
  const securityInfo = useSettingsStore((state) => state.securityInfo)

  return {
    accountInfo,
    securityInfo,
  }
}

