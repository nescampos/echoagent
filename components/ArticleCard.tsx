import Link from 'next/link';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    ready: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  const statusLabels = {
    pending: 'Pending',
    processing: 'Processing',
    ready: 'Ready',
    error: 'Error',
  };

  return (
    <article className="group rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <Link href={`/article/${article.id}`}>
            <h3 className="text-lg font-semibold text-zinc-900 line-clamp-2 group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-400">
              {article.title}
            </h3>
          </Link>
          <p className="mt-2 text-sm text-zinc-600 line-clamp-2 dark:text-zinc-400">
            {article.excerpt}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              {article.sourceName}
            </span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
            <span
              className={`ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[article.status]}`}
            >
              {statusLabels[article.status]}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
