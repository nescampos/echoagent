'use client';

import { useState } from 'react';
import { useArticles } from '@/contexts/ArticlesContext';

export default function AddArticleForm() {
  const [url, setUrl] = useState('');
  const { addArticle, isLoading, error } = useArticles();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!url.trim()) {
      setLocalError('Please enter a URL');
      return;
    }

    try {
      new URL(url);
    } catch {
      setLocalError('Please enter a valid URL');
      return;
    }

    await addArticle(url);
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste article URL here..."
          disabled={isLoading}
          className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </div>
      {(localError || error) && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {localError || error}
        </p>
      )}
    </form>
  );
}
