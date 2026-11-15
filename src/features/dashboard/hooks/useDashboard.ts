import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { UserAccount } from '../../auth/data/registeredAccounts'

export type DashboardSubView =
  | 'overview'
  | 'product-detail'
  | 'receipt-detail'
  | 'stock-detail'
  | 'financial-detail'

export type ProductViewMode = 'list' | 'create' | 'edit'

function getFormattedCurrentDate() {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function useDashboard() {
  const navigate = useNavigate()

  const [activeUser] = useState<UserAccount>(() => {
    try {
      const stored =
        localStorage.getItem('udulfa_active_user') ||
        sessionStorage.getItem('udulfa_active_user')
      if (stored) {
        return JSON.parse(stored)
      }
    } catch {
      // ignore parsing error
    }

    return {
      username: 'UDULFA',
      displayName: 'UD ULFA',
      password: '',
      role: 'Owner',
    }
  })

  const [currentTab, setCurrentTab] = useState('dashboard')
  const [dashboardSubView, setDashboardSubView] = useState<DashboardSubView>('overview')
  const [productViewMode, setProductViewMode] = useState<ProductViewMode>('list')
  const [currentDate] = useState(getFormattedCurrentDate)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId)
    if (tabId === 'dashboard') {
      setDashboardSubView('overview')
    }
    if (tabId !== 'produk') {
      setProductViewMode('list')
    }
  }

  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true)
  }

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false)
  }

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false)
    localStorage.removeItem('udulfa_active_user')
    sessionStorage.removeItem('udulfa_active_user')
    navigate('/login')
  }

  return {
    activeUser,
    currentTab,
    setCurrentTab,
    dashboardSubView,
    setDashboardSubView,
    productViewMode,
    setProductViewMode,
    currentDate,
    isLogoutModalOpen,
    handleTabChange,
    handleLogout: handleOpenLogoutModal,
    handleCloseLogoutModal,
    handleConfirmLogout,
  }
}
