import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Article } from '@/types/article';
import { getAllArticles, getArticleById } from '@/lib/articles';
import dayjs from 'dayjs';
import Head from 'next/head';

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getAllArticles();

  return {
    paths: articles.map(article => ({
      params: { id: article.id },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<{ article: Article | null }> = async (context) => {
  const id = context.params?.id as string;
  const article = await getArticleById(id);

  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: { article },
    revalidate: 60, // ISR (une fois par minute)
  };
};

export default function ArticlePage({
  article,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Chargement...</p>;
  }

  if (!article) {
    return <p>Article introuvable.</p>;
  }

  return (
    <>
    <Head>
      <title>Blog - Article - Details</title>
      <meta name="description" content={`Test d'valuation `} />
    </Head>
    <article className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      <Image
        src={article.image}
        alt={article.title}
        width={800}
        height={400}
        className="rounded-md mb-4"
      />

      <p className="text-gray-500 text-sm mb-2 text-white">
        Publié le {dayjs(article.createdAt).format('DD/MM/YYYY')}
      </p>

      <p className="text-lg leading-relaxed text-white">{article.content}</p>
    </article>
    </>
  );
}
