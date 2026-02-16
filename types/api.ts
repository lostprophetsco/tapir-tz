export interface Product {
  id: number
  name: string
  price: number
  image: string
  category?: string
}

export interface ApiResponse {
  currentPage: number
  limit: number
  products: Product[]
  total: number
  totalPages: number
}
