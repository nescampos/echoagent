'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import {
  AgentState,
  ConversationMessage,
  NewsSearchResult,
  NewsArticle,
  ConversationPhase
} from '@/types';

// Import ElevenLabs conversation hook
import { useConversation } from '@elevenlabs/react';

interface AgentContextType {
  state: AgentState;
  startConversation: () => Promise<void>;
  endConversation: () => void;
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || '';

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [searchResults, setSearchResults] = useState<NewsSearchResult[]>([]);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [phase, setPhase] = useState<ConversationPhase>('idle');
  const [error, setError] = useState<string | null>(null);
  const messageHandlerRef = useRef<((message: string) => void) | null>(null);

  // ElevenLabs conversation hook
  const {
    startSession,
    endSession,
    sendUserMessage,
    isSpeaking,
    status,
  } = useConversation({
    agentId: AGENT_ID,
    onConnect: () => {
      setPhase('listening');
      setError(null);
      // Add greeting message
      const greeting: ConversationMessage = {
        id: crypto.randomUUID(),
        role: 'agent',
        content: 'Hello! I\'m your news assistant. What topic would you like to hear about today?',
        timestamp: new Date().toISOString(),
      };
      setMessages([greeting]);
    },
    onDisconnect: () => {
      setPhase('idle');
    },
    onMessage: (payload) => {
      // Handle messages from the agent - payload has { message, role, source }
      messageHandlerRef.current?.(payload.message);
    },
    onError: (err) => {
      setError(err || 'Connection error');
      setPhase('idle');
    },
  });

  // Derive connection state from status
  const isConnected = status === 'connected';
  const isListening = status === 'connected' && !isSpeaking;

  const addMessage = useCallback((role: 'user' | 'agent', content: string) => {
    const message: ConversationMessage = {
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, message]);
    return message;
  }, []);

  // Set up message handler
  useEffect(() => {
    messageHandlerRef.current = async (message: string) => {
      // Check if the message contains a search query
      if (message.startsWith('[SEARCH:')) {
        const searchQuery = message.match(/\[SEARCH:(.*?)\]/)?.[1];
        if (searchQuery) {
          setPhase('searching');

          try {
            // Call search API
            const response = await fetch('/api/news/search', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ query: searchQuery }),
            });
            const data = await response.json();

            setSearchResults(data.results || []);
            setPhase('processing');

            // Scrape each result
            const scrapedArticles: NewsArticle[] = [];
            for (const result of (data.results || []).slice(0, 4)) {
              const scrapeResponse = await fetch('/api/news/scrape', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: result.url }),
              });
              const scraped = await scrapeResponse.json();
              if (scraped.content) {
                scrapedArticles.push({
                  url: scraped.url || result.url,
                  title: scraped.title || result.title,
                  content: scraped.content,
                  excerpt: scraped.excerpt || scraped.content.slice(0, 200),
                  sourceName: scraped.sourceName || new URL(result.url).hostname,
                });
              }
            }

            setArticles(scrapedArticles);
            setPhase('summarizing');

            // Send acknowledgment to agent
            addMessage('agent', `I found ${scrapedArticles.length} articles about "${searchQuery}". Let me summarize them for you.`);
            setPhase('speaking');
          } catch (err) {
            console.error('Search error:', err);
            setError('Failed to search news');
            setPhase('listening');
          }
        }
      } else {
        addMessage('agent', message);
        setPhase('listening');
      }
    };
  }, [addMessage]);

  const startConversation = useCallback(async () => {
    setError(null);
    setPhase('processing');

    if (!AGENT_ID) {
      setError('ElevenLabs Agent ID is not configured. Please set NEXT_PUBLIC_ELEVENLABS_AGENT_ID in your .env.local file.');
      setPhase('idle');
      return;
    }

    try {
      // Start ElevenLabs conversation session - this will request microphone access
      await startSession({ agentId: AGENT_ID, connectionType: 'webrtc' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start conversation');
      setPhase('idle');
    }
  }, [startSession]);

  const endConversation = useCallback(() => {
    endSession();
    setPhase('idle');
    setMessages([]);
    setSearchResults([]);
    setArticles([]);
    setError(null);
  }, [endSession]);

  const sendMessage = useCallback(async (message: string) => {
    addMessage('user', message);
    setPhase('processing');

    // Send message to ElevenLabs agent
    sendUserMessage(message);
  }, [addMessage, sendUserMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const state: AgentState = {
    isConnected,
    isSpeaking,
    isListening,
    phase,
    messages,
    searchResults,
    articles,
    error,
  };

  return (
    <AgentContext.Provider
      value={{
        state,
        startConversation,
        endConversation,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
}
