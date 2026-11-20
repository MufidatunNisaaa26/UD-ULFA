import { useState, useMemo, useRef, useEffect } from 'react'
import { useProductStore, type ProductItem } from '../stores/useProductStore'
import { productSchema, type ProductCategory } from '../schemas/productSchema'

export interface UseProductListProps {
  productViewMode?: 'list' | 'create' | 'edit'
  onProductViewModeChange?: (mode: 'list' | 'create' | 'edit') => void
  isCreateMode?: boolean
  onToggleCreateMode?: (createMode: boolean) => void
}

export function useProductList({
  productViewMode,
  onProductViewModeChange,
  isCreateMode,
  onToggleCreateMode,
}: UseProductListProps = {}) {
  const {
    products,
    isLoading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const [internalMode, setInternalMode] = useState<'list' | 'create' | 'edit'>('list')
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null)

  const effectiveMode: 'list' | 'create' | 'edit' =
    productViewMode !== undefined
      ? productViewMode
      : isCreateMode
      ? 'create'
      : internalMode

  const setEffectiveMode = (mode: 'list' | 'create' | 'edit') => {
    setInternalMode(mode)
    onProductViewModeChange?.(mode)
    if (onToggleCreateMode) {
      onToggleCreateMode(mode === 'create')
    }
  }

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('semua')
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false)

  // Form State
  const [formNama, setFormNama] = useState('')
  const [formKategori, setFormKategori] = useState<string>('')
  const [formHargaBeli, setFormHargaBeli] = useState<number | ''>('')
  const [formHarga, setFormHarga] = useState<number | ''>('')
  const [formStok, setFormStok] = useState('')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Upload Foto State
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null)
  const [previewType, setPreviewType] = useState<ProductItem['imageType'] | undefined>(undefined)
  const [isDragging, setIsDragging] = useState(false)

  // Modal Konfirmasi Hapus State
  const [productToDelete, setProductToDelete] = useState<ProductItem | null>(null)

  // Reset form
  const resetForm = () => {
    setEditingProduct(null)
    setFormNama('')
    setFormKategori('')
    setFormHargaBeli('')
    setFormHarga('')
    setFormStok('')
    setFormErrors({})
    setSelectedFile(null)
    setSelectedImagePreview(null)
    setPreviewType(undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Batal dari Create/Edit
  const handleCancel = () => {
    resetForm()
    setEffectiveMode('list')
  }

  // Buka Mode Tambah Produk
  const handleStartCreate = () => {
    resetForm()
    setEffectiveMode('create')
  }

  // Buka Mode Edit Produk
  const handleOpenEdit = (item: ProductItem) => {
    setEditingProduct(item)
    setFormNama(item.namaProduk)
    setFormKategori(item.kategori)
    setFormHargaBeli(item.hargaBeli !== undefined ? item.hargaBeli : '')
    setFormHarga(item.harga)
    setFormStok(item.stokText || `${item.stokJumlah} ${item.stokSatuan}`)
    setSelectedImagePreview(item.customImageUrl || null)
    setPreviewType(item.imageType)
    setFormErrors({})
    setEffectiveMode('edit')
  }

  // Filtered Products
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return products.filter((item) => {
      const matchSearch =
        item.namaProduk.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.kategori.toLowerCase().includes(q)

      const matchCategory =
        categoryFilter === 'semua' || item.kategori === categoryFilter

      return matchSearch && matchCategory
    })
  }, [products, searchQuery, categoryFilter])

  // Submit Form dengan Validasi Zod Schema (SOP Compliance)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationResult = productSchema.safeParse({
      namaProduk: formNama,
      kategori: formKategori as ProductCategory,
      hargaBeli: formHargaBeli === '' ? 0 : formHargaBeli,
      harga: formHarga === '' ? 0 : formHarga,
      stok: formStok,
    })

    if (!validationResult.success) {
      const formattedErrors: Record<string, string> = {}
      validationResult.error.issues.forEach((issue) => {
        const fieldName = String(issue.path[0])
        formattedErrors[fieldName] = issue.message
      })
      setFormErrors(formattedErrors)
      return
    }

    setFormErrors({})
    const validatedData = validationResult.data

    const matchDigits = validatedData.stok.match(/\d+/)
    const parsedNum = matchDigits ? parseInt(matchDigits[0], 10) : 0
    const parsedUnit = validatedData.stok.replace(/^[\d\s.,]+/, '').trim() || 'Pcs'

    if (effectiveMode === 'edit' && editingProduct) {
      await updateProduct(
        editingProduct.id,
        {
          namaProduk: validatedData.namaProduk,
          kategori: validatedData.kategori,
          hargaBeli: validatedData.hargaBeli || 0,
          harga: validatedData.harga,
          stokJumlah: parsedNum,
          stokSatuan: parsedUnit,
          stokText: validatedData.stok,
          customImageUrl: selectedImagePreview || undefined,
          imageType: previewType || editingProduct.imageType,
        },
        selectedFile
      )
    } else {
      await addProduct(
        {
          namaProduk: validatedData.namaProduk,
          kategori: validatedData.kategori,
          hargaBeli: validatedData.hargaBeli || 0,
          harga: validatedData.harga,
          stokJumlah: parsedNum,
          stokSatuan: parsedUnit,
          stokText: validatedData.stok,
          imageType: previewType || 'buku-sidu',
          customImageUrl: selectedImagePreview || undefined,
        },
        selectedFile
      )
    }

    handleCancel()
  }

  // Delete Handlers
  const handleOpenDeleteConfirm = (item: ProductItem) => {
    setIsFilterDropdownOpen(false)
    setProductToDelete(item)
  }

  const handleConfirmDelete = async () => {
    if (!productToDelete) return
    await deleteProduct(productToDelete.id)
    setProductToDelete(null)
  }

  const cancelDelete = () => {
    setProductToDelete(null)
  }

  // Upload Foto Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setSelectedImagePreview(URL.createObjectURL(file))
      setPreviewType(undefined)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setSelectedFile(file)
      setSelectedImagePreview(URL.createObjectURL(file))
      setPreviewType(undefined)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const removePhoto = () => {
    setSelectedFile(null)
    setSelectedImagePreview(null)
    setPreviewType(undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return {
    effectiveMode,
    filteredProducts,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    isFilterDropdownOpen,
    setIsFilterDropdownOpen,
    formNama,
    setFormNama,
    formKategori,
    setFormKategori,
    formHargaBeli,
    setFormHargaBeli,
    formHarga,
    setFormHarga,
    formStok,
    setFormStok,
    formErrors,
    fileInputRef,
    selectedImagePreview,
    previewType,
    isDragging,
    productToDelete,
    handleStartCreate,
    handleOpenEdit,
    handleCancel,
    handleFormSubmit,
    handleOpenDeleteConfirm,
    handleConfirmDelete,
    cancelDelete,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    removePhoto,
  }
}
