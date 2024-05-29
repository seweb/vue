type Author = {
  username: string
  bio: string
  image: string
  following: boolean
}

export type Article = {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Author
}

export type GetArticlesParams = {
  limit: number
  offset: number
  tag?: string
}

export type GetArticlesResponse = {
  data: {
    articles: Article[]
    articlesCount: number
  }
}

export type GetArticleResponse = {
  data: {
    article: {
      slug: string
      title: string
      description: string
      body: string
      tagList: string[]
      createdAt: string
      updatedAt: string
      favorited: boolean
      favoritesCount: number
      author: Author
    }
  }
}

export type GetTagsResponse = {
  data: {
    tags: string[]
  }
}

export type PostCommentPayload = {
  comment: {
    body: string
  }
}

export type Comment = {
  id: number
  createdAt: string
  updatedAt: string
  body: string
  author: Author
}

export type CommentResponse = {
  comment: Comment
}

export type CommentsResponse = {
  data: {
    comments: Comment
  }
}

export type NewArticle = {
  title: string
  description: string
  body: string
  tagList: string
}

//export type NewArticleResponse = NewArticle & { tagList: string[] }
export type NewArticleResponse = {
  title: string
  description: string
  body: string
  tagList: string[]
}

export type PostArticlePayload = {
  article: {
    title: string
    description: string
    body: string
    tagList: string[]
  }
}

export type PostArticleResponse = {
  article: {
    slug: string
    title: string
    description: string
    body: string
    tagList: string[]
    createdAt: string
    updatedAt: string
    favorited: boolean
    favoritesCount: number
    author: Author
  }
}
