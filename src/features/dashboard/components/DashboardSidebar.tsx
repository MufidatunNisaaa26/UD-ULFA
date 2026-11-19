import {
  LayoutGrid,
  Package,
  ReceiptText,
  TrendingUp,
  Settings,
  LogOut,
  Store,
} from 'lucide-react'

interface DashboardSidebarProps {
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
      className={`flex flex-col justify-between select-none shrink-0 h-full overflow-y-auto transition-all duration-300 ease-in-out ${
        isCollapsed
          ? 'fixed -translate-x-full md:relative md:translate-x-0 w-0 p-0 overflow-hidden md:w-16 md:pl-3.5 md:pr-1 md:pt-3 md:pb-3 bg-transparent md:bg-transparent border-0 md:border-transparent z-10 shadow-none'
          : 'fixed inset-y-0 left-0 z-50 w-64 p-4 bg-[#ede7fa] shadow-2xl translate-x-0 md:relative md:z-10 md:shadow-none md:w-56 xl:w-64 md:p-4 md:border-r md:border-purple-200/40'
      }`}
    >
      {/* Top Section: Branding & Navigation */}
      <div className="flex flex-col">
        {/* Brand Logo & Name (KLIK LOGO UNTUK BUKA / TUTUP SEMUA MENU) */}
        <button
          type="button"
          onClick={onToggleCollapse}
          title={
            isCollapsed
              ? 'Klik logo untuk membuka menu'
              : 'Klik logo untuk menutup menu'
          }
          className={`flex items-center text-left transition-all cursor-pointer group ${
            isCollapsed ? 'justify-center p-0' : 'justify-start gap-3 px-1 py-1 mb-6'
          }`}
        >
          <div className="w-10 h-10 rounded-[15px] bg-[#673ee8] group-hover:bg-[#582bc4] text-white flex items-center justify-center shadow-md shadow-purple-600/20 shrink-0 transition-all group-active:scale-95">
            <Store className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="leading-tight block overflow-hidden">
              <h1 className="text-base font-bold text-[#1e153b] tracking-tight truncate">
                UD Ulfa
              </h1>
              <p className="text-[11px] text-[#7a6b99] font-medium truncate">
                Retail &amp; Perlengkapan
              </p>
            </div>
          )}
        </button>

        {/* Menu Navigation: DITUTUP SEMUA KETIKA LOGO DI-KLIK */}
        {!isCollapsed && (
          <nav className="space-y-1.5 animate-in fade-in duration-200" aria-label="Menu Utama">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = currentTab === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  title={item.label}
                  className={`w-full flex items-center justify-start gap-3.5 px-3 py-2.5 rounded-[15px] text-sm font-semibold transition-all cursor-pointer ${
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
                  <span className="inline truncate">{item.label}</span>
                </button>
              )
            })}
          </nav>
        )}
      </div>

      {/* Bottom Section: Log Out - DITUTUP KETIKA LOGO DI-KLIK */}
      {!isCollapsed && (
        <div className="pt-4 animate-in fade-in duration-200">
          <button
            type="button"
            onClick={onLogout}
            title="Log Out"
            className="w-full flex items-center justify-start gap-3.5 px-3 py-2.5 rounded-[15px] text-sm font-semibold text-[#e11d48] bg-white hover:bg-rose-50/50 hover:text-rose-700 shadow-[0_2px_10px_rgba(103,62,232,0.08)] transition-all cursor-pointer active:scale-98"
          >
            <LogOut className="w-4 h-4 shrink-0 text-[#e11d48]" />
            <span className="inline">Log Out</span>
          </button>
        </div>
      )}
    </aside>
  )
}

export default DashboardSidebar
