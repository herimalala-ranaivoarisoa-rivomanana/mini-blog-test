// pages/api/articles.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { getArticles } from "@/lib/fetchArticles"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const articles = await getArticles()
  res.status(200).json(articles)
}
