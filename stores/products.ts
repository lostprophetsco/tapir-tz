import { defineStore } from 'pinia'
import type { Product, ApiResponse } from '~/types/api'

/**
 * Store для управления состоянием товаров
 */
export const useProductsStore = defineStore('products', () => {
  // State
  const products = ref<Product[]>([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const error = ref<string | null>(null)
  const hasMore = ref(true)
  const apiLimit = ref<number>(10)
  const currentPage = ref(1)

  // Computed
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => !!error.value)
  const hasProducts = computed(() => products.value.length > 0)
  const showLoadMore = computed(() => hasMore.value && !isLoading.value && !hasError.value)
  const isLoadingMore = computed(() => loadingMore.value || loading.value)
  const productsCount = computed(() => products.value.length)

  // Actions
  /**
   * Загрузка товаров с сервера
   */
  const fetchProducts = async (reset = true) => {
    try {
      loading.value = true
      error.value = null

      if (reset) {
        products.value = []
        currentPage.value = 1
      }

      console.log('fetchProducts: Starting fetch...', { reset, page: currentPage.value })

      // Используем useApi только внутри action
      const { fetchProducts: fetchProductsApi } = useApi()
      const response = await fetchProductsApi(currentPage.value, apiLimit.value)

      console.log('Full API Response:', response)
      console.log('Response products:', response.products)
      console.log('Response limit:', response.limit)

      if (response.products) {
        if (reset) {
          products.value = response.products
        } else {
          products.value = [...products.value, ...response.products]
        }
        
        apiLimit.value = response.limit
        hasMore.value = response.products.length === apiLimit.value
        
        console.log('fetchProducts: Products loaded:', response.products.length)
        console.log('fetchProducts: API limit set to:', apiLimit.value)
        console.log('fetchProducts: Total products:', products.value.length)
      } else {
        error.value = 'Ошибка загрузки товаров'
        console.log('fetchProducts: No products in response')
      }
    } catch (err) {
      console.error('API Error:', err)
      error.value = 'Произошла ошибка при загрузке товаров'
    } finally {
      loading.value = false
      console.log('fetchProducts: Finished')
    }
  }

  /**
   * Загрузка дополнительных товаров
   */
  const loadMore = async () => {
    if (loadingMore.value || !hasMore.value) return

    try {
      loadingMore.value = true
      currentPage.value += 1

      console.log('loadMore: Starting load more...')
      console.log('loadMore: Current products count:', products.value.length)
      console.log('loadMore: Fetching page:', currentPage.value)
      console.log('loadMore: Using limit:', apiLimit.value)

      // Используем useApi только внутри action
      const { fetchProducts: fetchProductsApi } = useApi()
      const response = await fetchProductsApi(currentPage.value, apiLimit.value)

      console.log('Load More Response:', response)
      console.log('Load More products:', response.products)

      if (response.products) {
        products.value = [...products.value, ...response.products]
        hasMore.value = response.products.length === apiLimit.value
        console.log('loadMore: Products added, total:', products.value.length)
      } else {
        error.value = 'Ошибка загрузки дополнительных товаров'
        console.log('loadMore: No products in response')
      }
    } catch (err) {
      console.error('API Error:', err)
      error.value = 'Произошла ошибка при загрузке дополнительных товаров'
    } finally {
      loadingMore.value = false
      console.log('loadMore: Finished')
    }
  }

  /**
   * Повторная попытка загрузки
   */
  const retry = () => {
    fetchProducts()
  }

  /**
   * Сброс состояния
   */
  const reset = () => {
    products.value = []
    loading.value = false
    loadingMore.value = false
    error.value = null
    hasMore.value = true
    apiLimit.value = 10
    currentPage.value = 1
  }

  return {
    // State
    products,
    loading,
    loadingMore,
    error,
    hasMore,
    apiLimit,
    currentPage,
    
    // Computed
    isLoading,
    hasError,
    hasProducts,
    showLoadMore,
    isLoadingMore,
    productsCount,
    
    // Actions
    fetchProducts,
    loadMore,
    retry,
    reset
  }
})
