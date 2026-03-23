'use client';

import { useAgent } from '@/contexts/AgentContext';

interface VoiceSessionButtonProps {
  onConversationStart?: () => void;
}

export default function VoiceSessionButton({ onConversationStart }: VoiceSessionButtonProps) {
  const { state, startConversation, endConversation } = useAgent();

  const handleToggle = async () => {
    if (state.isConnected) {
      endConversation();
    } else {
      await startConversation();
      onConversationStart?.();
    }
  };

  const getStatusColor = () => {
    switch (state.phase) {
      case 'listening':
        return 'bg-green-500 animate-pulse';
      case 'speaking':
        return 'bg-blue-500 animate-pulse';
      case 'processing':
      case 'searching':
      case 'summarizing':
        return 'bg-yellow-500 animate-pulse';
      case 'idle':
        return 'bg-zinc-400';
      default:
        return 'bg-zinc-400';
    }
  };

  const getStatusText = () => {
    switch (state.phase) {
      case 'listening':
        return 'Listening...';
      case 'speaking':
        return 'Speaking...';
      case 'processing':
        return 'Processing...';
      case 'searching':
        return 'Searching news...';
      case 'summarizing':
        return 'Summarizing...';
      case 'idle':
        return state.isConnected ? 'Connected' : 'Start Conversation';
      default:
        return 'Start Conversation';
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={state.phase === 'processing' || state.phase === 'searching' || state.phase === 'summarizing'}
      className={`
        relative flex items-center gap-3 rounded-full px-6 py-4 
        transition-all duration-300
        ${state.isConnected 
          ? 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200' 
          : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700'
        }
        disabled:cursor-not-allowed disabled:opacity-70
      `}
    >
      {/* Status indicator */}
      <span className={`relative flex h-3 w-3`}>
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${getStatusColor()}`}></span>
        <span className={`relative inline-flex h-3 w-3 rounded-full ${getStatusColor()}`}></span>
      </span>
      
      <span className="font-medium">{getStatusText()}</span>

      {/* Microphone icon */}
      {state.isConnected ? (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      )}
    </button>
  );
}
