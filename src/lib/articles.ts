import { Article } from '@/types/article';
import axios, { AxiosResponse } from 'axios';

const baseUrl = 'http://localhost:3000';

export const getAllArticles = async (): Promise<Article[]> => {
  const url = `${baseUrl}/api/articles`;
  const response: AxiosResponse = await axios.get<Article[]>(url);
  return response.data;
};

export const getArticleById = async (id: string): Promise<Article | null> => {
  const url = `${baseUrl}/api/articles/${id}`;

  try {
    const response: AxiosResponse<Article> = await axios.get<Article>(url);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'article avec l'ID ${id}:`, error);
    return null;
  }
};
