'use client';

import { useArticles } from '@/contexts/ArticlesContext';
import Header from '@/components/Header';
import AddArticleForm from '@/components/AddArticleForm';
import ArticleCard from '@/components/ArticleCard';

export default function Home() {
  const { articles } = useArticles();

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Hero section */}
          <section className="mb-12">
            <div className="rounded-2xl bg-zinc-50 p-6 dark:bg-zinc-900/50">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Your News Reader
              </h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Paste any article URL and listen to it with AI-generated speech.
              </p>
              <div className="mt-6">
                <AddArticleForm />
              </div>
            </div>
          </section>

          {/* Articles list */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Your Articles
              </h2>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {articles.length} {articles.length === 1 ? 'article' : 'articles'}
              </span>
            </div>

            {articles.length === 0 ? (
              <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
                <svg
                  className="mx-auto h-12 w-12 text-zinc-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  No articles yet
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Add your first article by pasting a URL above.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="border-t border-zinc-200 py-6 dark:border-zinc-800">
        <div className="mx-auto w-full max-w-5xl px-4 text-center text-sm text-zinc-500 dark:text-zinc-400 sm:px-6 lg:px-8">
          <p>
            Echo - AI News Reader. Powered by{' '}
            <a
              href="https://elevenlabs.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
            >
              ElevenLabs
            </a>{' '}
            and{' '}
            <a
              href="https://firecrawl.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
            >
              Firecrawl
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
