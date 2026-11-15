import { ArrowLeft, Calendar } from 'lucide-react'
import { useDashboard } from '../features/dashboard/hooks/useDashboard'
import { DashboardSidebar } from '../features/dashboard/components/DashboardSidebar'
import { ProductDonutChart } from '../features/dashboard/components/charts/ProductDonutChart'
import { TransactionReceiptHistory } from '../features/dashboard/components/TransactionReceiptHistory'
import { StockStatusCard } from '../features/dashboard/components/StockStatusCard'
import { FinancialSummaryCard } from '../features/dashboard/components/FinancialSummaryCard'
import { ProductDetailView } from '../features/dashboard/components/ProductDetailView'
import { ProductListView } from '../features/dashboard/components/ProductListView'
import { TransactionPosView } from '../features/dashboard/components/TransactionPosView'
import { TransactionReceiptDetailView } from '../features/dashboard/components/TransactionReceiptDetailView'
import { StockHealthDetailView } from '../features/dashboard/components/StockHealthDetailView'
import { FinanceView } from '../features/dashboard/components/FinanceView'
import { SettingsView } from '../features/dashboard/components/SettingsView'
import { LogoutModal } from '../features/dashboard/components/LogoutModal'
import { OrganicPurpleBackground } from '../features/auth/components/OrganicPurpleBackground'

export function DashboardPage() {
  const {
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
    handleLogout,
    handleCloseLogoutModal,
    handleConfirmLogout,
  } = useDashboard()

  return (
    <div className="h-screen max-h-screen w-full flex relative overflow-hidden select-none">
      {/* Background Organik Ungu (Sama persis dengan halaman Auth) */}
      <OrganicPurpleBackground />

      {/* 1. Sidebar Kiri */}
      <DashboardSidebar
        activeUser={activeUser}
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
      />

      {/* 2. Area Konten Utama */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative z-0">
        <main
          className={`flex-1 min-h-0 px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-3.5 pb-2.5 sm:pb-3 flex flex-col ${
            currentTab === 'transaksi' ||
            currentTab === 'produk' ||
            (currentTab === 'dashboard' &&
              (dashboardSubView === 'receipt-detail' ||
                dashboardSubView === 'stock-detail' ||
                dashboardSubView === 'financial-detail'))
              ? 'overflow-hidden'
              : 'overflow-y-auto'
          }`}
        >
          {/* Header Konten: Breadcrumb di Kiri & Tanggal di Kanan */}
          <header className="w-full flex items-center justify-between pb-2.5 sm:pb-3 shrink-0">
            {currentTab === 'dashboard' && dashboardSubView === 'product-detail' ? (
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500">
                <button
                  type="button"
                  onClick={() => setDashboardSubView('overview')}
                  className="hover:text-[#673ee8] transition-colors cursor-pointer"
                >
                  Dashboard
                </button>
                <span className="text-slate-400 font-normal">&gt;</span>
                <span className="text-slate-700">Detail Total Produk</span>
              </div>
            ) : currentTab === 'dashboard' && dashboardSubView === 'stock-detail' ? (
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500">
                <button
                  type="button"
                  onClick={() => setDashboardSubView('overview')}
                  className="hover:text-[#673ee8] transition-colors cursor-pointer"
                >
                  Dashboard
                </button>
                <span className="text-slate-400 font-normal">&gt;</span>
                <span className="text-slate-700">Status Stok</span>
              </div>
            ) : currentTab === 'dashboard' && dashboardSubView === 'financial-detail' ? (
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500">
                <button
                  type="button"
                  onClick={() => setDashboardSubView('overview')}
                  className="hover:text-[#673ee8] transition-colors cursor-pointer"
                >
                  Dashboard
                </button>
                <span className="text-slate-400 font-normal">&gt;</span>
                <span className="text-slate-700">Detail Keuangan</span>
              </div>
            ) : currentTab === 'dashboard' && dashboardSubView === 'receipt-detail' ? (
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentTab('dashboard')
                    setDashboardSubView('overview')
                  }}
                  className="hover:text-[#673ee8] transition-colors cursor-pointer"
                >
                  Dashboard
                </button>
                <span className="text-slate-400 font-normal">&gt;</span>
                <span className="text-slate-700">Riwayat Transaksi</span>
              </div>
            ) : currentTab === 'produk' && productViewMode !== 'list' ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setProductViewMode('list')}
                  className="w-9 h-9 rounded-full bg-[#f0e9fd] hover:bg-[#e4d8fb] text-[#673ee8] flex items-center justify-center transition-all cursor-pointer shadow-2xs shrink-0"
                  title="Kembali ke Daftar Produk"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1e153b] tracking-tight">
                  {productViewMode === 'edit' ? 'Edit Produk' : 'Tambah Produk Baru'}
                </h2>
              </div>
            ) : (
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1e153b] tracking-tight capitalize">
                {currentTab}
              </h2>
            )}

            {/* Badge Tanggal */}
            <div className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-white shadow-[0_2px_8px_rgba(103,62,232,0.06)] text-xs sm:text-sm font-semibold text-slate-800 shrink-0 ${
              currentTab === 'pengaturan' ? 'rounded-full' : 'rounded-[15px]'
            }`}>
              {currentTab === 'pengaturan' ? (
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              ) : (
                <Calendar className="w-4 h-4 text-[#673ee8] shrink-0" />
              )}
              <span>{currentDate}</span>
            </div>
          </header>

          {/* Area Kartu Konten */}
          <div
            className={`w-full flex-1 min-h-0 flex flex-col ${
              currentTab === 'dashboard' && dashboardSubView === 'product-detail'
                ? 'min-h-full'
                : 'h-full overflow-hidden'
            }`}
          >
            {currentTab === 'dashboard' ? (
              dashboardSubView === 'product-detail' ? (
                <ProductDetailView />
              ) : dashboardSubView === 'receipt-detail' ? (
                <TransactionReceiptDetailView />
              ) : dashboardSubView === 'stock-detail' ? (
                <StockHealthDetailView />
              ) : dashboardSubView === 'financial-detail' ? (
                <FinanceView />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 h-full max-h-full">
                  {/* Kartu 1 (Kiri Atas): Grafik Total Produk */}
                  <div className="h-full min-h-[260px]">
                    <ProductDonutChart
                      onViewAll={() => setDashboardSubView('product-detail')}
                    />
                  </div>

                  {/* Kartu 2 (Kanan Atas): Riwayat Struk Transaksi */}
                  <div className="h-full min-h-[260px]">
                    <TransactionReceiptHistory
                      onViewAll={() => setDashboardSubView('receipt-detail')}
                    />
                  </div>

                  {/* Kartu 3 (Kiri Bawah): Status Stok */}
                  <div className="h-full min-h-[260px]">
                    <StockStatusCard
                      onViewAll={() => setDashboardSubView('stock-detail')}
                    />
                  </div>

                  {/* Kartu 4 (Kanan Bawah): Keuangan & Laba */}
                  <div className="h-full min-h-[260px]">
                    <FinancialSummaryCard
                      onViewAll={() => setDashboardSubView('financial-detail')}
                    />
                  </div>
                </div>
              )
            ) : currentTab === 'produk' ? (
              <ProductListView
                productViewMode={productViewMode}
                onProductViewModeChange={setProductViewMode}
              />
            ) : currentTab === 'transaksi' ? (
              <TransactionPosView />
            ) : currentTab === 'stok' ? (
              <StockHealthDetailView />
            ) : currentTab === 'keuangan' ? (
              <FinanceView />
            ) : currentTab === 'pengaturan' ? (
              <SettingsView />
            ) : (
              /* Fallback tampilan modul lain jika menu sidebar diklik */
              <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-[15px] p-8 border border-purple-100/60 shadow-sm text-center">
                <div className="w-16 h-16 rounded-[15px] bg-[#f2ecfd] text-[#673ee8] flex items-center justify-center font-bold text-2xl mb-4">
                  📦
                </div>
                <h3 className="text-xl font-bold text-slate-900 capitalize">
                  Modul {currentTab}
                </h3>
                <p className="text-sm text-slate-500 max-w-md mt-1 mb-5">
                  Modul ini siap dikembangkan atau dihubungkan dengan data transaksi kasir UD ULFA.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentTab('dashboard')
                    setDashboardSubView('overview')
                  }}
                  className="px-5 py-2.5 rounded-[15px] bg-[#673ee8] text-white text-xs font-semibold shadow-md shadow-purple-600/30 hover:bg-[#582bc4] transition-all cursor-pointer"
                >
                  Kembali ke Dashboard Utama
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Pop-up Dialog Konfirmasi Keluar / Logout */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={handleCloseLogoutModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  )
}

export default DashboardPage
