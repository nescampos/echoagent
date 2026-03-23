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

// Agent & Conversation types
export type ConversationPhase = 'idle' | 'listening' | 'processing' | 'speaking' | 'searching' | 'summarizing';

export interface NewsSearchResult {
  url: string;
  title: string;
  description?: string;
}

export interface NewsArticle {
  url: string;
  title: string;
  content: string;
  excerpt: string;
  sourceName: string;
}

export interface AgentState {
  isConnected: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  phase: ConversationPhase;
  messages: ConversationMessage[];
  searchResults: NewsSearchResult[];
  articles: NewsArticle[];
  error: string | null;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
}
