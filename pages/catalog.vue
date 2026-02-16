<template>
  <div class="catalog">
    <AppHeader />

    <main class="catalog__content">
      <div class="container catalog__container">
        <h1>Каталог товаров</h1>

        <div v-if="isLoading" class="loading">Загрузка...</div>

        <div v-else-if="hasError" class="error">
          <div class="error__message">{{ error }}</div>
          <AppButton @click="retry">Повторить</AppButton>
        </div>

        <template v-else>
          <div class="catalog__grid">
            <AppProductCard v-for="product in products" :key="product.id" :product="product" />
          </div>

          <div v-if="showLoadMore" class="catalog__more">
            <AppButton modifier="secondary" :loading="isLoadingMore" @click="loadMore">
              Показать ещё
            </AppButton>
          </div>
        </template>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import AppButton from '~/components/AppButton.vue'
import AppProductCard from '~/components/AppProductCard.vue'
import AppFooter from '~/components/AppFooter.vue'
import type { Product, ApiResponse } from '~/types/api'
import { useApi } from '~/composables/useApi'

// SEO Meta теги
useHead({
  title: 'Каталог товаров',
  meta: [
    { name: 'description', content: 'Каталог товаров с пагинацией и фильтрацией' },
    { name: 'keywords', content: 'товары, каталог, пагинация, интернет-магазин' },
    { property: 'og:title', content: 'Каталог товаров' },
    { property: 'og:description', content: 'Каталог товаров с пагинацией' },
  ],
})

const { fetchProducts: fetchProductsApi } = useApi()

const products = ref<Product[]>([])
const loading = ref(false)
const loadingMore = ref(false)
const error = ref<string | null>(null)
const hasMore = ref(true)
const apiLimit = ref<number>(10) // Сохраняем реальный лимит из API

const isLoading = computed(() => loading.value)
const hasError = computed(() => !!error.value)
const showLoadMore = computed(() => hasMore.value && !isLoading.value && !hasError.value)
const isLoadingMore = computed(() => loadingMore.value || loading.value)

const fetchProducts = async () => {
  try {
    loading.value = true
    error.value = null

    console.log('fetchProducts: Starting fetch...')

    // Используем API composable
    const response = await fetchProductsApi()

    console.log('Full API Response:', response)
    console.log('Response products:', response.products)
    console.log('Response limit:', response.limit)

    if (response.products) {
      products.value = response.products
      apiLimit.value = response.limit // Сохраняем реальный лимит из API
      console.log('fetchProducts: Products loaded:', response.products.length)
      console.log('fetchProducts: API limit set to:', apiLimit.value)
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

const loadMore = async () => {
  try {
    loadingMore.value = true

    const nextPage = Math.floor(products.value.length / apiLimit.value) + 1

    console.log('loadMore: Starting load more...')
    console.log('loadMore: Current products count:', products.value.length)
    console.log('loadMore: Fetching page:', nextPage)
    console.log('loadMore: Using limit:', apiLimit.value)

    const response = await fetchProductsApi(nextPage, apiLimit.value)

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

const retry = () => {
  fetchProducts()
}

onMounted(() => {
  fetchProducts()
})
</script>
