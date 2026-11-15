import {
  LayoutGrid,
  Package,
  ReceiptText,
  TrendingUp,
  Settings,
  LogOut,
  Store,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'
import type { UserAccount } from '../../auth/data/registeredAccounts'

interface DashboardSidebarProps {
  activeUser?: UserAccount
  currentTab: string
  onTabChange: (tabId: string) => void
  onLogout: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'produk', label: 'Produk', icon: Package },
  { id: 'transaksi', label: 'Transaksi', icon: ReceiptText },
  { id: 'keuangan', label: 'Keuangan', icon: TrendingUp },
  { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
]

export function DashboardSidebar({
  currentTab,
  onTabChange,
  onLogout,
  isCollapsed = false,
  onToggleCollapse,
}: DashboardSidebarProps) {
  return (
    <aside
      className={`${
        isCollapsed ? 'w-20 p-3' : 'w-56 xl:w-64 p-3.5 sm:p-4 md:p-5'
      } bg-[#ede7fa] border-r border-purple-200/40 flex flex-col justify-between select-none shrink-0 h-full relative z-10 transition-all duration-300 ease-in-out`}
    >
      {/* Top Section: Branding & Navigation */}
      <div className="flex flex-col">
        {/* Brand Logo & Name / Toggle Button */}
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-3 px-1 py-1 mb-6">
            <div className="w-10 h-10 rounded-[15px] bg-[#673ee8] text-white flex items-center justify-center shadow-md shadow-purple-600/20 shrink-0">
              <Store className="w-5 h-5" />
            </div>

            {/* Tombol Lebarkan / Expand Sidebar */}
            <button
              type="button"
              onClick={onToggleCollapse}
              title="Lebarkan Sidebar"
              className="w-9 h-9 rounded-[10px] bg-white/70 hover:bg-white text-[#673ee8] shadow-2xs flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 px-1 py-1 mb-6">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-[15px] bg-[#673ee8] text-white flex items-center justify-center shadow-md shadow-purple-600/20 shrink-0">
                <Store className="w-5 h-5" />
              </div>
              <div className="leading-tight truncate">
                <h1 className="text-base font-bold text-[#1e153b] tracking-tight truncate">
                  UD Ulfa
                </h1>
                <p className="text-[11px] text-[#7a6b99] font-medium truncate">
                  Retail &amp; Perlengkapan
                </p>
              </div>
            </div>

            {/* Tombol Tutup / Collapse Sidebar */}
            <button
              type="button"
              onClick={onToggleCollapse}
              title="Tutup Sidebar"
              className="w-8 h-8 rounded-[10px] text-[#673ee8] hover:bg-white/60 flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Menu Navigation */}
        <nav className="space-y-1.5" aria-label="Menu Utama">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = currentTab === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                title={item.label}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center px-2' : 'justify-start gap-3.5 px-3'
                } py-2.5 rounded-[15px] text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#1e153b] shadow-[0_2px_10px_rgba(103,62,232,0.08)]'
                    : 'text-[#4a4267] hover:text-[#1e153b] hover:bg-white/40'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-[#673ee8]' : 'text-[#584e79]'
                  }`}
                />
                {!isCollapsed && <span className="inline truncate">{item.label}</span>}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Bottom Section: Log Out */}
      <div className="pt-4">
        <button
          type="button"
          onClick={onLogout}
          title="Log Out"
          className={`w-full flex items-center ${
            isCollapsed ? 'justify-center px-2' : 'justify-start gap-3.5 px-3'
          } py-2.5 rounded-[15px] text-sm font-semibold text-[#e11d48] bg-white hover:bg-rose-50/50 hover:text-rose-700 shadow-[0_2px_10px_rgba(103,62,232,0.08)] transition-all cursor-pointer active:scale-98`}
        >
          <LogOut className="w-4 h-4 shrink-0 text-[#e11d48]" />
          {!isCollapsed && <span className="inline">Log Out</span>}
        </button>
      </div>
    </aside>
  )
}

export default DashboardSidebar
