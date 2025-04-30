import { Article } from "@/types/article"
import {articles} from "@/lib/articles"

export const getArticles = async (): Promise<Article[]> => {
  return articles
}

export const getArticleById = async (id: string): Promise<Article | null> => {
  const articles = await getArticles()
  return articles.find(article => article.id === id) || null
}
