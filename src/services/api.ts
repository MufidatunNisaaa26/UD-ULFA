/**
 * API Service untuk UD ULFA
 * Terhubung ke backend https://sliver-impeach-tree.ngrok-free.dev/api
 */

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://sliver-impeach-tree.ngrok-free.dev/api'

// Helper request umum
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('udulfa_token')
  const headers = new Headers(options.headers || {})

  // Bypass halaman peringatan free ngrok
  headers.set('ngrok-skip-browser-warning', '69420')

  // Lampirkan JWT Bearer token jika sudah login
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  // Jika body bukan FormData, tambahkan Content-Type JSON
  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

  const response = await fetch(url, {
    ...options,
    headers,
  })

  // Parse response
  let data: any = null
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    data = await response.json()
  } else {
    data = await response.text()
  }

  if (!response.ok) {
    const errorMsg =
      (data && typeof data === 'object' && (data.error || data.message)) ||
      (typeof data === 'string' && data) ||
      `Request failed with status ${response.status}`
    throw new Error(errorMsg)
  }

  return data as T
}

// Tipe Data Model API
export interface ApiProduct {
  id: number
  nama: string
  kategori: string
  harga_beli?: number
  harga: number
  stok: number
  deskripsi?: string
  gambar?: string | null
  created_at?: string
}

export interface ApiCategory {
  nama: string
  jumlah_produk: number
  total_stok: number
}

export interface ApiDashboardSummary {
  total_produk: number
  stok_menipis: number
  transaksi_hari_ini: number
  pendapatan_hari_ini: number
}

export interface ApiDailyRevenue {
  tanggal: string
  pendapatan: number
  jumlah_transaksi: number
}

export interface ApiTransactionItem {
  produk_id: number
  nama?: string
  jumlah: number
  subtotal?: number
}

export interface ApiTransactionReceipt {
  id: number
  no_transaksi: string
  total_harga: number
  metode_pembayaran: string
  uang_diterima?: number | null
  kembalian?: number | null
  tanggal: string
  items?: ApiTransactionItem[]
}

export interface ApiExpense {
  id: number
  keterangan: string
  jumlah: number
  tanggal: string
}

export interface ApiUser {
  id: number
  username: string
  nama: string
  role: string
  email?: string
}

export interface ApiLoginResponse {
  token: string
  tipe: string
  berlaku_detik: number
  user: ApiUser
}

export const api = {
  // Autentikasi
  auth: {
    login: (body: { username: string; password: string }) =>
      request<ApiLoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    getMe: () => request<{ user: ApiUser }>('/auth/me'),
    logout: () =>
      request<{ message: string }>('/auth/logout', {
        method: 'POST',
      }),
    lupaPassword: (email: string) =>
      request<{ message: string }>('/auth/lupa-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
    resetPassword: (body: { email: string; otp: string; password: string }) =>
      request<{ message: string }>('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  },

  // Produk
  produk: {
    getAll: (params?: { kategori?: string; cari?: string; stok_maks?: number }) => {
      const q = new URLSearchParams()
      if (params?.kategori && params.kategori !== 'Semua') q.append('kategori', params.kategori)
      if (params?.cari) q.append('cari', params.cari)
      if (params?.stok_maks !== undefined) q.append('stok_maks', params.stok_maks.toString())
      const queryStr = q.toString() ? `?${q.toString()}` : ''
      return request<ApiProduct[]>(`/produk${queryStr}`)
    },
    getById: (id: number | string) => request<ApiProduct>(`/produk/${id}`),
    create: (body: FormData | Partial<ApiProduct>) =>
      request<ApiProduct>('/produk', {
        method: 'POST',
        body: body instanceof FormData ? body : JSON.stringify(body),
      }),
    update: (id: number | string, body: FormData | Partial<ApiProduct>) =>
      request<ApiProduct>(`/produk/${id}`, {
        method: 'PUT',
        body: body instanceof FormData ? body : JSON.stringify(body),
      }),
    delete: (id: number | string) =>
      request<{ message: string }>(`/produk/${id}`, {
        method: 'DELETE',
      }),
    updateStok: (
      id: number | string,
      aksi: 'tambah' | 'kurang',
      jumlah: number
    ) =>
      request<{ message: string; stokBaru: number }>(`/produk/${id}/stok`, {
        method: 'PUT',
        body: JSON.stringify({ aksi, jumlah }),
      }),
  },

  // Kategori
  kategori: {
    getAll: () => request<ApiCategory[]>('/kategori'),
  },

  // Transaksi Kasir POS & Laporan
  transaksi: {
    create: (body: {
      items: { produk_id: number; jumlah: number }[]
      metode_pembayaran?: string
      no_transaksi?: string
      uang_diterima?: number
    }) =>
      request<{
        message: string
        id: number
        no_transaksi: string
        total_harga: number
        uang_diterima?: number
        kembalian?: number
      }>('/transaksi', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    void: (id: number | string) =>
      request<{ message: string }>(`/transaksi/${id}`, {
        method: 'DELETE',
      }),
    getLaporan: (params?: { dari?: string; sampai?: string }) => {
      const q = new URLSearchParams()
      if (params?.dari) q.append('dari', params.dari)
      if (params?.sampai) q.append('sampai', params.sampai)
      const queryStr = q.toString() ? `?${q.toString()}` : ''
      return request<ApiTransactionReceipt[]>(`/laporan${queryStr}`)
    },
    getDetailLaporan: (id: number | string) =>
      request<ApiTransactionReceipt>(`/laporan/${id}`),
    downloadCsv: async (params?: { dari?: string; sampai?: string }) => {
      const q = new URLSearchParams()
      if (params?.dari) q.append('dari', params.dari)
      if (params?.sampai) q.append('sampai', params.sampai)
      const queryStr = q.toString() ? `?${q.toString()}` : ''
      const res = await fetch(`${BASE_URL}/laporan/export${queryStr}`, {
        headers: {
          'ngrok-skip-browser-warning': '69420',
        },
      })
      if (!res.ok) throw new Error('Gagal mengunduh laporan CSV')
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `laporan-transaksi-${new Date().toISOString().slice(0, 10)}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    },
  },

  // Pengeluaran / Beban Operasional
  pengeluaran: {
    getAll: (params?: { dari?: string; sampai?: string }) => {
      const q = new URLSearchParams()
      if (params?.dari) q.append('dari', params.dari)
      if (params?.sampai) q.append('sampai', params.sampai)
      const queryStr = q.toString() ? `?${q.toString()}` : ''
      return request<ApiExpense[]>(`/pengeluaran${queryStr}`)
    },
    create: (body: { keterangan: string; jumlah: number; tanggal?: string }) =>
      request<{ message: string; id: number }>('/pengeluaran', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    delete: (id: number | string) =>
      request<{ message: string }>(`/pengeluaran/${id}`, {
        method: 'DELETE',
      }),
  },

  // Dashboard & Statistik
  dashboard: {
    getSummary: () => request<ApiDashboardSummary>('/dashboard'),
    getGrafik: (hari = 7) =>
      request<ApiDailyRevenue[]>(`/dashboard/grafik?hari=${hari}`),
  },
}

export default api
