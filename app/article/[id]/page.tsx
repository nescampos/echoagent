'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useArticles } from '@/contexts/ArticlesContext';
import AudioPlayer from '@/components/AudioPlayer';

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const { getArticle, removeArticle } = useArticles();
  const article = getArticle(params.id as string);

  if (!article) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Article not found
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          The article you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Go back home
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    removeArticle(article.id);
    router.push('/');
  };

  return (
    <article className="mx-auto max-w-3xl py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to articles
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          {article.title}
        </h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          {article.author && (
            <span>By {article.author}</span>
          )}
          {article.publishedAt && (
            <>
              <span>•</span>
              <time>{new Date(article.publishedAt).toLocaleDateString()}</time>
            </>
          )}
          <span>•</span>
          <span>{article.sourceName}</span>
        </div>
      </header>

      <div className="mb-8">
        <AudioPlayer article={article} />
      </div>

      {article.imageUrl && (
        <div className="mb-8 overflow-hidden rounded-xl">
          <img
            src={article.imageUrl}
            alt=""
            className="w-full object-cover"
          />
        </div>
      )}

      <div className="prose prose-zinc max-w-none dark:prose-invert">
        <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          {article.excerpt}
        </p>
        <div className="mt-6 whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">
          {article.content}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400"
        >
          Read original article →
        </a>
        <button
          onClick={handleDelete}
          className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
