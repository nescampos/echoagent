'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { 
  AgentState, 
  ConversationMessage, 
  NewsSearchResult, 
  NewsArticle,
  ConversationPhase 
} from '@/types';

// TODO: Import ElevenLabs conversation hook
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
  const [state, setState] = useState<AgentState>({
    isConnected: false,
    isSpeaking: false,
    isListening: false,
    phase: 'idle',
    messages: [],
    searchResults: [],
    articles: [],
    error: null,
  });

  // TODO: Implement ElevenLabs conversation hook
  const {
    startSession,
    endSession,
    sendEvent,
    isSpeaking,
    isListening,
    isConnected,
    error,
  } = useConversation({
    agentId: AGENT_ID,
    onConnect: () => {
      setState(prev => ({ ...prev, isConnected: true, phase: 'listening' }));
    },
    onDisconnect: () => {
      setState(prev => ({ ...prev, isConnected: false, phase: 'idle' }));
    },
    onMessage: (message) => {
      // Handle messages from the agent
      handleAgentMessage(message);
    },
    onError: (error) => {
      setState(prev => ({ ...prev, error: error.message }));
    },
  });

  const addMessage = useCallback((role: 'user' | 'agent', content: string) => {
    const message: ConversationMessage = {
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: new Date().toISOString(),
    };
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
    return message;
  }, []);

  const handleAgentMessage = useCallback(async (message: string) => {
    // Check if the message contains a search query (indicated by special format from agent)
    // The agent should return search queries in a specific format
    if (message.startsWith('[SEARCH:')) {
      const searchQuery = message.match(/\[SEARCH:(.*?)\]/)?.[1];
      if (searchQuery) {
        setState(prev => ({ ...prev, phase: 'searching' }));
        
        try {
          // Call search API
          const response = await fetch('/api/news/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: searchQuery }),
          });
          const data = await response.json();
          
          setState(prev => ({
            ...prev,
            searchResults: data.results || [],
            phase: 'processing',
          }));

          // Scrape each result
          const scrapedArticles: NewsArticle[] = [];
          for (const result of data.results.slice(0, 4)) {
            const scrapeResponse = await fetch('/api/news/scrape', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url: result.url }),
            });
            const scraped = await scrapeResponse.json();
            if (scraped.content) {
              scrapedArticles.push(scraped);
            }
          }

          setState(prev => ({
            ...prev,
            articles: scrapedArticles,
            phase: 'summarizing',
          }));

          // Send scraped content back to agent for summarization
          // TODO: Send to ElevenLabs agent
          addMessage('agent', `He encontrado ${scrapedArticles.length} artículos sobre "${searchQuery}". Aquí está el resumen...`);
          
          setState(prev => ({ ...prev, phase: 'speaking' }));
        } catch (error) {
          console.error('Search error:', error);
          setState(prev => ({ 
            ...prev, 
            error: 'Failed to search news',
            phase: 'listening'
          }));
        }
      }
    } else {
      addMessage('agent', message);
      setState(prev => ({ ...prev, phase: 'listening' }));
    }
  }, [addMessage]);

  const startConversation = useCallback(async () => {
    setState(prev => ({ ...prev, phase: 'processing', error: null }));
    
    try {
      // TODO: Use ElevenLabs startSession
      // await startSession();
      
      // Placeholder - simulate connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setState(prev => ({
        ...prev,
        isConnected: true,
        phase: 'listening',
        messages: [{
          id: crypto.randomUUID(),
          role: 'agent',
          content: 'Hello! I\'m your news assistant. What topic would you like to hear about today?',
          timestamp: new Date().toISOString(),
        }],
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to start conversation',
        phase: 'idle',
      }));
    }
  }, []);

  const endConversation = useCallback(() => {
    // TODO: Use ElevenLabs endSession
    // endSession();
    
    setState({
      isConnected: false,
      isSpeaking: false,
      isListening: false,
      phase: 'idle',
      messages: [],
      searchResults: [],
      articles: [],
      error: null,
    });
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    addMessage('user', message);
    setState(prev => ({ ...prev, phase: 'processing' }));
    
    // TODO: Send message to ElevenLabs agent
    // sendEvent({ type: 'user_message', text: message });
    
    // Placeholder - simulate agent response
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user is specifying a topic
    const searchKeywords = message.toLowerCase().match(/(?:news|articles|information|tell me|search|find)\s+(?:about|on|regarding)?\s*(.+)/i);
    if (searchKeywords) {
      const topic = searchKeywords[1]?.trim() || message;
      setState(prev => ({ ...prev, phase: 'searching' }));
      
      try {
        const response = await fetch('/api/news/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: topic }),
        });
        const data = await response.json();
        
        setState(prev => ({
          ...prev,
          searchResults: data.results || [],
          phase: 'processing',
        }));

        // Scrape each result (limit to 4)
        const scrapedArticles: NewsArticle[] = [];
        for (const result of (data.results || []).slice(0, 4)) {
          try {
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
          } catch (err) {
            console.error('Failed to scrape:', result.url, err);
          }
        }

        setState(prev => ({
          ...prev,
          articles: scrapedArticles,
          phase: 'summarizing',
        }));

        // Generate summary prompt for agent
        const summaryPrompt = `[SEARCH:${topic}]`;
        addMessage('agent', `I found ${scrapedArticles.length} articles about "${topic}". Let me summarize them for you.`);
        
        // TODO: Send scraped content to ElevenLabs agent for summarization
        setState(prev => ({ ...prev, phase: 'speaking' }));
      } catch (error) {
        console.error('Search error:', error);
        addMessage('agent', 'I apologize, but I encountered an error while searching for news. Please try again.');
        setState(prev => ({ ...prev, phase: 'listening' }));
      }
    } else {
      addMessage('agent', 'I understand. What news topic would you like to explore?');
      setState(prev => ({ ...prev, phase: 'listening' }));
    }
  }, [addMessage]);

  const clearMessages = useCallback(() => {
    setState(prev => ({ ...prev, messages: [] }));
  }, []);

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
