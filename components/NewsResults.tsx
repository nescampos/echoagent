'use client';

import { NewsArticle } from '@/types';
import { useState } from 'react';

interface NewsResultsProps {
  articles: NewsArticle[];
}

export default function NewsResults({ articles }: NewsResultsProps) {
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

  return (
    <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
          News Articles
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {articles.length} article{articles.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {articles.map((article, index) => (
            <div
              key={index}
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                    {article.title}
                  </h4>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {article.sourceName}
                  </p>
                </div>
                <button
                  onClick={() => setExpandedArticle(expandedArticle === index ? null : index)}
                  className="rounded p-1 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
                >
                  {expandedArticle === index ? (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                </button>
              </div>

              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {article.excerpt}
              </p>

              {expandedArticle === index && (
                <div className="mt-3 border-t border-zinc-200 pt-3 dark:border-zinc-700">
                  <p className="max-h-48 overflow-y-auto text-sm text-zinc-700 dark:text-zinc-300">
                    {article.content}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                  >
                    Read original article
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
