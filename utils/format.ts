/**
 * Форматирует цену в рублях
 */
export const formatPrice = (price: number): string => `${price} ₽`

/**
 * Рассчитывает половинную цену (цена/2, округление вверх)
 */
export const calculateHalfPrice = (price: number): number => Math.ceil(price / 2)

/**
 * Форматирует половинную цену
 */
export const formatHalfPrice = (price: number): string => `${calculateHalfPrice(price)} ₽ x 2`
