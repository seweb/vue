import { computed, ComputedRef } from 'vue'
import { perPage } from '@/constants/config'

export const usePagination = (articlesCount: number | null): number[] => {
  const pagination: ComputedRef<number[]> = computed(() => {
    const pages = articlesCount ? Math.ceil(articlesCount / perPage) : 1
    const res = []
    for (let i = 1; i <= pages; i++) {
      res.push(i)
    }
    return res
  })
  return pagination.value
}
