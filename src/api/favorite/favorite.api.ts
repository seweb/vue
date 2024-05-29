import { Api } from '@/api/axios'
import type { GetArticlesResponse } from '@/modules/articles/types/articlesApiTypes'
export const postFavorite = async (
  slug: string
): Promise<GetArticlesResponse> =>
  Api.post<never, GetArticlesResponse>(`articles/${slug}/favorite`)

export const postUnFavorite = async (
  slug: string
): Promise<GetArticlesResponse> =>
  Api.delete<never, GetArticlesResponse>(`articles/${slug}/favorite`)
