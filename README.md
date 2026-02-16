# Tapir Test Task - Nuxt 4 Приложение

Nuxt-приложение для отображения каталога товаров с SSR-рендерингом на основе макета.

## Технологии

- **Nuxt 4** + **TypeScript**
- **SCSS** для стилизации
- **БЭМ** методология именования CSS-классов
- **Grid + Flex** для верстки

## API

Эндпоинт для получения товаров: `test-task-api.tapir.ws/products`

Примеры использования:
- `test-task-api.tapir.ws/products?page=1`
- `test-task-api.tapir.ws/products?page=2&limit=10`

## Структура проекта

```
├── components/
│   ├── AppButton.vue          # Кнопка с loading state и modifier secondary
│   ├── AppFooter.vue          # Подвал с навигационными ссылками
│   ├── AppHeader.vue          # Шапка с навигацией и бургер-меню
│   └── AppProductCard.vue    # Карточка товара с расчетом цены x2
├── composables/
│   └── useApi.ts             # Composable для работы с API
├── constants/
│   └── index.ts               # Константы приложения
├── pages/
│   ├── index.vue             # Главная страница с переходом в каталог
│   └── catalog.vue            # Страница каталога с пагинацией
├── types/
│   └── api.ts                 # TypeScript интерфейсы для API
├── utils/
│   └── format.ts              # Утилиты для форматирования
├── assets/
│   ├── css/
│   │   ├── main.scss         # Главный файл стилей
│   │   ├── _mixins.scss      # SCSS миксины
│   │   ├── _variables.scss   # CSS переменные
│   │   ├── components/       # Стили компонентов
│   │   │   ├── AppButton.scss
│   │   │   ├── AppFooter.scss
│   │   │   ├── AppHeader.scss
│   │   │   └── AppProductCard.scss
│   │   └── pages/            # Стили страниц
│   │       ├── index.scss
│   │       └── catalog.scss
│   └── images/
│       └── favorite.svg       # Иконка избранного
├── app.vue                     # Корневой компонент
├── nuxt.config.ts              # Конфигурация Nuxt
├── eslint.config.js             # Конфигурация ESLint
├── package.json                # Зависимости проекта
└── README.md                   # Документация проекта
```

## Компоненты

### AppButton
- **Props:** `modifier`, `loading`, `loadingText`, `to`
- **Features:** 
  - Loading state с индикатором
  - Modifier `secondary` для второстепенных кнопок
  - Динамический компонент (button/a)
  - Поддержка ссылок через prop `to`

### AppHeader
- **Features:**
  - Навигационные ссылки
  - Бургер-меню (заглушка)
  - Адаптивная верстка

### AppFooter
- **Features:**
  - Навигационные ссылки
  - Адаптивная верстка

### AppProductCard
- **Props:** `product` с типизацией
- **Features:**
  - Изображение товара с lazy loading
  - Расчет цены "x2" (цена/2, округление вверх)
  - Кнопка избранного (заглушка)
  - ARIA атрибуты для accessibility
  - Ссылка на товар (заглушка)

## Страницы

### Главная страница (index.vue)
- **Features:**
  - AppHeader компонент
  - AppButton с переходом в каталог
  - SSR рендеринг

### Страница каталога (catalog.vue)
- **Features:**
  - SSR рендеринг товаров
  - Пагинация с кнопкой "Показать ещё"
  - Обработка ошибок загрузки
  - Индикаторы загрузки
  - SEO meta теги
  - Использование API composable
  - Computed свойства для оптимизации

## Утилиты

### format.ts
- `formatPrice()` - форматирование цен в рублях
- `formatHalfPrice()` - форматирование половинной цены
- `calculateHalfPrice()` - расчет половинной цены

## Composables

### useApi.ts
- `fetchProducts()` - получение товаров с пагинацией
- Использует константы API
- Обработка ошибок
- TypeScript строгая типизация

## Типы

### api.ts
- `Product` интерфейс для товара
- `ApiResponse` интерфейс для ответа API
- Строгая типизация всех полей

## Константы

### constants/index.ts
- `API_BASE_URL` - базовый URL API
- `DEFAULT_LIMIT` - лимит по умолчанию
- `DEFAULT_PAGE` - страница по умолчанию

## Стили

### SCSS архитектура
- **БЭМ** методология именования
- **Миксины** для адаптивности
- **CSS переменные** для темизации
- **Модульная структура** файлов

### Адаптивность
- **Desktop:** Grid 4 колонки
- **Mobile:** Grid 2 колонки
- **Брейкпоинты:** 360px, 1440px

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для production
npm run build

# Preview production сборки
npm run preview
```

## Технические требования

- **SSR поддержка** обязательна
- **TypeScript** строгая типизация
- **Адаптивная верстка** согласно макету
- **БЭМ** методология CSS-классов
- **SCSS** для стилизации
- **Grid + Flex** для верстки

## Особенности реализации

### Оптимизации
- ✅ **Lazy loading** изображений
- ✅ **SEO meta теги** для поисковиков
- ✅ **ARIA атрибуты** для accessibility
- ✅ **Computed свойства** для производительности
- ✅ **Утилиты форматирования** для переиспользования кода
- ✅ **Composable для API** для разделения логики
- ✅ **Константы** для централизации конфигурации

### TypeScript
- ✅ **Строгая типизация** всех интерфейсов
- ✅ **Централизованные типы** в отдельном файле
- ✅ **Безопасный доступ** к свойствам объектов

### Performance
- ✅ **Lazy loading** для изображений
- ✅ **Оптимизированная пагинация** с реальным лимитом API
- ✅ **Computed кеширование** реактивных свойств
- ✅ **Минимальные перерисовки** компонентов

### Accessibility
- ✅ **ARIA метки** для скринридеров
- ✅ **Семантическая верстка** HTML элементов
- ✅ **Клавиатурная навигация** поддержка

## Результат

Полностью функциональное Nuxt 4 приложение с TypeScript, SCSS и SSR-рендерингом, соответствующее всем требованиям ТЗ.
