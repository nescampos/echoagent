'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Article, ArticleStatus, PlayerState } from '@/types';

interface ArticlesContextType {
  articles: Article[];
  addArticle: (url: string) => Promise<void>;
  removeArticle: (id: string) => void;
  getArticle: (id: string) => Article | undefined;
  updateArticleStatus: (id: string, status: ArticleStatus) => void;
  playerState: PlayerState;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  isLoading: boolean;
  error: string | null;
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined);

const STORAGE_KEY = 'echo_articles';

export function ArticlesProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    isLoading: false,
    currentTime: 0,
    duration: 0,
    articleId: null,
  });

  // Load articles from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setArticles(parsed);
      }
    } catch (e) {
      console.error('Failed to load articles from localStorage', e);
    }
  }, []);

  // Save articles to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    } catch (e) {
      console.error('Failed to save articles to localStorage', e);
    }
  }, [articles]);

  const addArticle = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Call API endpoint that uses Firecrawl to scrape the URL
      // const response = await fetch('/api/scrape', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ url }),
      // });
      // const data = await response.json();

      // Placeholder - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newArticle: Article = {
        id: crypto.randomUUID(),
        url,
        title: 'Article Title (TODO: Fetch from Firecrawl)',
        content: 'Article content will be fetched using Firecrawl. This is a placeholder text that will be replaced with the actual scraped content from the provided URL.',
        excerpt: 'Article excerpt (TODO: Fetch from Firecrawl)',
        sourceName: new URL(url).hostname,
        createdAt: new Date().toISOString(),
        status: 'pending',
      };

      setArticles(prev => [newArticle, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add article');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeArticle = useCallback((id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id));
    setPlayerState(prev => 
      prev.articleId === id 
        ? { ...prev, isPlaying: false, articleId: null }
        : prev
    );
  }, []);

  const getArticle = useCallback((id: string): Article | undefined => {
    return articles.find(article => article.id === id);
  }, [articles]);

  const updateArticleStatus = useCallback((id: string, status: ArticleStatus) => {
    setArticles(prev => prev.map(article => 
      article.id === id ? { ...article, status } : article
    ));
  }, []);

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        addArticle,
        removeArticle,
        getArticle,
        updateArticleStatus,
        playerState,
        setPlayerState,
        isLoading,
        error,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticles() {
  const context = useContext(ArticlesContext);
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticlesProvider');
  }
  return context;
}
