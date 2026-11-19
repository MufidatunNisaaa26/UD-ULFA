import { useState, useEffect } from 'react'
import { ReceiptText, ChevronRight } from 'lucide-react'
import { api } from '../../../services/api'

interface TransactionReceiptHistoryProps {
  onViewAll?: () => void
}

interface ReceiptItem {
  id: string
  itemsSummary: string
  time: string
  amount: string
  method: string
}

export function TransactionReceiptHistory({
  onViewAll,
}: TransactionReceiptHistoryProps) {
  const [receipts, setReceipts] = useState<ReceiptItem[]>([])

  useEffect(() => {
    api.transaksi
      .getLaporan()
      .then((data) => {
        const mapped = data.slice(0, 5).map((r) => {
          const d = new Date(r.tanggal)
          const time = d.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          })
          return {
            id: r.no_transaksi,
            itemsSummary: 'Transaksi Kasir POS',
            time,
            amount: `Rp ${Number(r.total_harga).toLocaleString('id-ID')}`,
            method: r.metode_pembayaran || 'Tunai',
          }
        })
        setReceipts(mapped)
      })
      .catch((err) => {
        console.warn('Gagal memuat riwayat transaksi:', err)
      })
  }, [])

  return (
    <div className="bg-white rounded-[15px] p-4 sm:p-6 shadow-[0_4px_24px_rgba(103,62,232,0.04)] border border-purple-100/40 flex flex-col justify-between h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[15px] bg-[#f2ecfd] text-[#673ee8] flex items-center justify-center shrink-0">
            <ReceiptText className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#1e153b] tracking-tight">
            Riwayat Struk Transaksi
          </h3>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        {/* Table Head */}
        <div className="grid grid-cols-12 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100 px-1">
          <div className="col-span-5">No. Struk</div>
          <div className="col-span-2 text-center">Waktu</div>
          <div className="col-span-3 text-right">Nominal</div>
          <div className="col-span-2 text-right">Metode</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100/80">
          {receipts.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400 font-medium">
              Belum ada riwayat transaksi
            </div>
          ) : (
            receipts.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 items-center py-2.5 px-1 hover:bg-[#faf8fe] rounded-[15px] transition-colors"
              >
                <div className="col-span-5 pr-2">
                  <p className="text-xs font-bold text-slate-800 leading-tight">
                    {item.id}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                    {item.itemsSummary}
                  </p>
                </div>

                <div className="col-span-2 text-center text-xs font-medium text-slate-500">
                  {item.time}
                </div>

                <div className="col-span-3 text-right text-xs font-bold text-slate-800">
                  {item.amount}
                </div>

                <div className="col-span-2 text-right">
                  <span className="inline-block px-2.5 py-0.5 rounded-[15px] bg-[#f4effe] text-[#673ee8] text-[10px] sm:text-[11px] font-semibold">
                    {item.method}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer Link */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#673ee8] hover:text-[#5229c9] flex items-center gap-0.5 cursor-pointer transition-colors"
        >
          <span>Lihat Semua Struk</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

export default TransactionReceiptHistory
