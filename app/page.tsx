'use client';

import { useState } from 'react';
import { useAgent } from '@/contexts/AgentContext';
import Header from '@/components/Header';
import VoiceSessionButton from '@/components/VoiceSessionButton';
import ConversationPanel from '@/components/ConversationPanel';
import NewsResults from '@/components/NewsResults';

export default function Home() {
  const { state } = useAgent();
  const [showResults, setShowResults] = useState(false);

  // Show results when articles are available
  useState(() => {
    if (state.articles.length > 0) {
      setShowResults(true);
    }
  });

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Hero section */}
          <section className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              Your AI News Assistant
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Talk to get personalized news summaries powered by AI.
            </p>
          </section>

          {/* Voice session button */}
          <section className="mb-8 flex justify-center">
            <VoiceSessionButton onConversationStart={() => setShowResults(false)} />
          </section>

          {/* Main content area */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Conversation panel */}
            <div className="h-[500px]">
              {state.isConnected ? (
                <ConversationPanel />
              ) : (
                <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
                  <div>
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
                        d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
                      Start a Conversation
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      Click the microphone button above to start talking with your news assistant.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* News results */}
            <div className="h-[500px]">
              {state.articles.length > 0 ? (
                <NewsResults articles={state.articles} />
              ) : (
                <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
                  <div>
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
                      No Articles Yet
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      Tell the assistant what news topic you&apos;re interested in.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search results list */}
          {state.searchResults.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Search Results
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {state.searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                      {result.title}
                    </h3>
                    {result.description && (
                      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {result.description}
                      </p>
                    )}
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                    >
                      Read more →
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="border-t border-zinc-200 py-6 dark:border-zinc-800">
        <div className="mx-auto w-full max-w-7xl px-4 text-center text-sm text-zinc-500 dark:text-zinc-400 sm:px-6 lg:px-8">
          <p>
            Echo - AI News Assistant. Powered by{' '}
            <a
              href="https://elevenlabs.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
            >
              ElevenLabs Agents
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
