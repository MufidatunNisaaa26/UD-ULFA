import { create } from 'zustand'
import type { TransactionItem, CheckoutFormValues } from '../schemas/transactionSchema'

export interface CompletedTransaction extends CheckoutFormValues {
  id: string
  date: string
  time: string
  cashierName: string
}

interface TransactionState {
  cartItems: TransactionItem[]
  transactionCount: number
  completedTransactions: CompletedTransaction[]
  addItem: (product: { id: string; name: string; price: number; imageUrl?: string; category?: string }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  clearCart: () => void
  saveTransaction: (checkout: CheckoutFormValues, cashierName?: string) => CompletedTransaction
}

const INITIAL_CART: TransactionItem[] = [
  {
    id: 'cart-1',
    productId: 'POS-010',
    name: 'Lem Kertas Glukol Sedang',
    unitPrice: 4500,
    quantity: 2,
    subtotal: 9000,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
    category: 'ATK',
  },
  {
    id: 'cart-2',
    productId: 'POS-011',
    name: 'Lakban Hitam Daimaru',
    unitPrice: 12500,
    quantity: 1,
    subtotal: 12500,
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=80',
    category: 'ATK',
  },
]

export const useTransactionStore = create<TransactionState>((set) => ({
  cartItems: INITIAL_CART,
  transactionCount: 8,
  completedTransactions: [],

  addItem: (product) => {
    set((state) => {
      const existing = state.cartItems.find((item) => item.productId === product.id)
      if (existing) {
        const updatedQty = existing.quantity + 1
        return {
          cartItems: state.cartItems.map((item) =>
            item.productId === product.id
              ? {
                  ...item,
                  quantity: updatedQty,
                  subtotal: updatedQty * item.unitPrice,
                }
              : item
          ),
        }
      }

      const newItem: TransactionItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity: 1,
        subtotal: product.price,
        imageUrl: product.imageUrl,
        category: product.category,
      }
      return { cartItems: [...state.cartItems, newItem] }
    })
  },

  removeItem: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }))
  },

  updateQuantity: (id, delta) => {
    set((state) => {
      const item = state.cartItems.find((i) => i.id === id)
      if (!item) return state

      const nextQty = item.quantity + delta
      if (nextQty <= 0) {
        return {
          cartItems: state.cartItems.filter((i) => i.id !== id),
        }
      }

      return {
        cartItems: state.cartItems.map((i) =>
          i.id === id
            ? {
                ...i,
                quantity: nextQty,
                subtotal: nextQty * i.unitPrice,
              }
            : i
        ),
      }
    })
  },

  clearCart: () => {
    set({ cartItems: [] })
  },

  saveTransaction: (checkout, cashierName = 'Kasir UD Ulfa') => {
    const now = new Date()
    const record: CompletedTransaction = {
      ...checkout,
      id: `TRX-${Date.now()}`,
      date: now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      time: now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WIB',
      cashierName,
    }

    set((state) => ({
      transactionCount: state.transactionCount + 1,
      completedTransactions: [record, ...state.completedTransactions],
      cartItems: [],
    }))

    return record
  },
}))
