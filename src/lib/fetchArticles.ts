import { Article } from "@/types/article"
import axios, { AxiosResponse } from "axios"

export const getArticles = async (): Promise<Article[]> => {
  const response: AxiosResponse<Article[]> = await axios.get('/api/articles');
  return response.data;
}

export const getArticleById = async (id: string): Promise<Article | null> => {
  const articles = await getArticles()
  return articles.find(article => article.id === id) || null
}

