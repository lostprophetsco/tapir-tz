import type { ApiResponse } from '~/types/api'
import { API_BASE_URL, DEFAULT_LIMIT, DEFAULT_PAGE } from '~/constants'

/**
 * Composable для работы с API
 */
export const useApi = () => {
  /**
   * Получение товаров с пагинацией
   */
  const fetchProducts = async (page: number = DEFAULT_PAGE, limit: number = DEFAULT_LIMIT): Promise<ApiResponse> => {
    const url = page === DEFAULT_PAGE 
      ? `${API_BASE_URL}/products`
      : `${API_BASE_URL}/products?page=${page}&limit=${limit}`
    
    try {
      const response = await $fetch<ApiResponse>(url)
      return response
    } catch (error) {
      console.error('API Error:', error)
      throw new Error('Failed to fetch products')
    }
  }

  return {
    fetchProducts
  }
}
