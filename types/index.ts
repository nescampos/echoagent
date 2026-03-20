export interface Article {
  id: string;
  url: string;
  title: string;
  content: string;
  excerpt: string;
  author?: string;
  publishedAt?: string;
  imageUrl?: string;
  sourceName?: string;
  createdAt: string;
  status: ArticleStatus;
}

export type ArticleStatus = 'pending' | 'processing' | 'ready' | 'error';

export interface ScrapedContent {
  title: string;
  content: string;
  excerpt: string;
  author?: string;
  publishedAt?: string;
  imageUrl?: string;
  sourceName?: string;
}

export interface PlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  articleId: string | null;
}
