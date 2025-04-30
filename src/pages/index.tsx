import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import ArticleCard from '@/components/ArticleCard';
import { getAllArticles } from '@/lib/articles';
import { Article } from '@/types/article';

export const getStaticProps: GetStaticProps<{
  articles: Article[];
}> = async () => {
  const articles = await getAllArticles();

  return {
    props: {
      articles,
    },
    revalidate: 60, // ISR
  };
};

export default function HomePage({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Blog - Accueil</title>
      </Head>
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-8 text-left">Articles récents</h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </main>
    </>
  );
}
