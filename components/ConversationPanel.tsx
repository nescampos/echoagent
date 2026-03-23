'use client';

import { useAgent } from '@/contexts/AgentContext';
import { useState } from 'react';

export default function ConversationPanel() {
  const { state, sendMessage, endConversation } = useAgent();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && state.isConnected) {
      sendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const phaseIcons = {
    idle: null,
    listening: (
      <div className="flex items-center justify-center gap-1">
        <div className="h-8 w-1 animate-[pulse_1s_ease-in-out_infinite] bg-green-500 rounded-full"></div>
        <div className="h-12 w-1 animate-[pulse_1.2s_ease-in-out_infinite] bg-green-500 rounded-full"></div>
        <div className="h-6 w-1 animate-[pulse_0.8s_ease-in-out_infinite] bg-green-500 rounded-full"></div>
        <div className="h-10 w-1 animate-[pulse_1.1s_ease-in-out_infinite] bg-green-500 rounded-full"></div>
        <div className="h-8 w-1 animate-[pulse_1s_ease-in-out_infinite] bg-green-500 rounded-full"></div>
      </div>
    ),
    speaking: (
      <div className="flex items-center justify-center gap-1">
        <div className="h-8 w-1 animate-[pulse_0.9s_ease-in-out_infinite] bg-blue-500 rounded-full"></div>
        <div className="h-12 w-1 animate-[pulse_1.1s_ease-in-out_infinite] bg-blue-500 rounded-full"></div>
        <div className="h-6 w-1 animate-[pulse_0.7s_ease-in-out_infinite] bg-blue-500 rounded-full"></div>
        <div className="h-10 w-1 animate-[pulse_1s_ease-in-out_infinite] bg-blue-500 rounded-full"></div>
        <div className="h-8 w-1 animate-[pulse_0.8s_ease-in-out_infinite] bg-blue-500 rounded-full"></div>
      </div>
    ),
    processing: (
      <svg className="h-8 w-8 animate-spin text-yellow-500" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    ),
    searching: (
      <svg className="h-8 w-8 animate-spin text-yellow-500" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    ),
    summarizing: (
      <svg className="h-8 w-8 animate-spin text-yellow-500" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    ),
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 p-4 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-100">
            <svg className="h-5 w-5 text-white dark:text-zinc-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">News Assistant</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {state.isConnected ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
        
        {state.isConnected && (
          <button
            onClick={endConversation}
            className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
          >
            End Call
          </button>
        )}
      </div>

      {/* Visualizer */}
      <div className="flex h-24 items-center justify-center border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50">
        {phaseIcons[state.phase] || (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {state.isConnected ? 'Tap the microphone to start talking' : 'Press the microphone button to start'}
          </p>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {state.messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Messages will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {state.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    message.role === 'user'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                      : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message or news topic..."
            disabled={!state.isConnected}
            className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
          />
          <button
            type="submit"
            disabled={!state.isConnected || !inputValue.trim()}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
