import { Article } from '@/types/article'

export const articles: Article[] = [
  {
    id: '1',
    title: 'Elon Wears Two Hats During Trump Meeting in Desperate Bid for Attention',
    description: 'Meanwhile, Trump acknowledged that Christmas this year may not be so merry.',
    image: 'https://gizmodo.com/app/uploads/2025/04/elon-musk-two-hats-double-april-30-2025.jpg',
    content: 'Voici le contenu détaillé du premier article.',
    createdAt: '2025-04-30T20:20:53Z',
  },
  {
    id: '2',
    title: 'Sheryl Crow Says an Armed Man Got On Her Property After She Ditched Her Tesla',
    description: 'Sheryl Crow said an armed intruder got onto her property after she publicly sold her Tesla in protest of Elon Musk and Donald Trump.',
    image: 'https://www.rollingstone.com/wp-content/uploads/2025/04/GettyImages-2198304896.jpg?w=1600&h=900&crop=1',
    content: 'Sheryl Crow said she caught an armed man on her property in Tennessee after publicly ditching her Tesla in protest of Elon Musk and President Donald Trump’s efforts to gut governmentprograms through … [+1767 chars',
    createdAt: '2025-04-30T20:26:25Z',
  },
]

export function getAllArticles(): Promise<Article[]> {
    return Promise.resolve(articles);
  }
  
  export function getArticleById(id: string): Promise<Article | null> {
    const article = articles.find((a) => a.id === id);
    return Promise.resolve(article || null);
  }
