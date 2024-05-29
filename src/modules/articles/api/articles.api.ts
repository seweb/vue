import { Api } from '@/api/axios'
import type {
  GetArticlesResponse,
  GetArticlesParams,
  GetArticleResponse,
  GetTagsResponse,
  PostCommentPayload,
  CommentResponse,
  CommentsResponse,
  PostArticlePayload,
  PostArticleResponse
} from '@/modules/articles/types/articlesApiTypes'

export const getArticles = async (
  params: GetArticlesParams
): Promise<GetArticlesResponse> =>
  Api.get<GetArticlesParams, GetArticlesResponse>('/articles', { params })

export const getFeeds = async (
  params: GetArticlesParams
): Promise<GetArticlesResponse> =>
  Api.get<GetArticlesParams, GetArticlesResponse>('/articles/feed', { params })

export const getArticle = async (
  slug: string | string[]
): Promise<GetArticleResponse> =>
  Api.get<never, GetArticleResponse>(`/articles/${slug}`)

export const postArticle = async (
  payload: PostArticlePayload
): Promise<PostArticlePayload> =>
  Api.post<PostArticlePayload, PostArticleResponse>('/articles', payload)

export const updateArticle = async (
  slug: string | string[],
  payload: PostArticlePayload
): Promise<PostArticlePayload> =>
  Api.put<PostArticlePayload, PostArticleResponse>(`/articles/${slug}`, payload)

export const deleteArticle = async (slug: string): Promise<never> =>
  Api.delete<never, never>(`/articles/${slug}`)

export const getTags = async (): Promise<GetTagsResponse> =>
  Api.get<never, GetTagsResponse>('/tags')

export const postComment = async (
  slug: string,
  payload: PostCommentPayload
): Promise<CommentResponse> =>
  Api.post<PostCommentPayload, CommentResponse>(
    `/articles/${slug}/comments`,
    payload
  )

export const getComments = async (slug: string): Promise<CommentsResponse> =>
  Api.get<never, CommentsResponse>(`/articles/${slug}/comments`)

export const deleteComment = async (slug: string, id: number): Promise<never> =>
  Api.delete<never, never>(`/articles/${slug}/comments/${id}`)
