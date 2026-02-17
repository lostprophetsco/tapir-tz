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
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import AppButton from '~/components/AppButton.vue'
import AppProductCard from '~/components/AppProductCard.vue'
import AppFooter from '~/components/AppFooter.vue'
import { useProductsStore } from '~/stores/products'

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

// Используем Pinia store - теперь работает с @pinia/nuxt
const productsStore = useProductsStore()

// Используем storeToRefs для сохранения реактивности
const {
  products,
  isLoading,
  hasError,
  error,
  showLoadMore,
  isLoadingMore
} = storeToRefs(productsStore)

// Actions вызываем напрямую из store
const { fetchProducts, loadMore, retry } = productsStore

onMounted(() => {
  fetchProducts()
})
</script>
