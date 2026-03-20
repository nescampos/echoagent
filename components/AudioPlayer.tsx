'use client';

import { useArticles } from '@/contexts/ArticlesContext';
import { Article } from '@/types';

interface AudioPlayerProps {
  article: Article;
}

export default function AudioPlayer({ article }: AudioPlayerProps) {
  const { playerState, setPlayerState } = useArticles();

  // TODO: Implement ElevenLabs text-to-speech integration
  // Example using @elevenlabs/react:
  //
  // import { useElevenLabs } from '@elevenlabs/react';
  //
  // const { speak, isSpeaking, stop } = useElevenLabs({
  //   apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
  // });
  //
  // const handlePlay = async () => {
  //   setPlayerState(prev => ({ ...prev, isLoading: true }));
  //   await speak({
  //     text: article.content,
  //     voiceId: 'Josh', // or another voice
  //     modelId: 'eleven_monolingual_v1',
  //   });
  //   setPlayerState(prev => ({ ...prev, isLoading: false, isPlaying: true }));
  // };
  //
  // const handleStop = () => {
  //   stop();
  //   setPlayerState(prev => ({ ...prev, isPlaying: false }));
  // };

  const isCurrentArticle = playerState.articleId === article.id;

  const handlePlay = () => {
    // TODO: Implement ElevenLabs playback
    console.log('Play article:', article.id);
    setPlayerState({
      isPlaying: true,
      isLoading: false,
      currentTime: 0,
      duration: 0,
      articleId: article.id,
    });
  };

  const handleStop = () => {
    // TODO: Implement ElevenLabs stop
    console.log('Stop article:', article.id);
    setPlayerState(prev => ({
      ...prev,
      isPlaying: false,
      articleId: null,
    }));
  };

  if (article.status !== 'ready') {
    return (
      <div className="rounded-lg bg-zinc-100 p-4 text-center text-sm text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
        Audio will be available once the article is processed
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-4">
        <button
          onClick={isCurrentArticle && playerState.isPlaying ? handleStop : handlePlay}
          disabled={playerState.isLoading}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {playerState.isLoading ? (
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : isCurrentArticle && playerState.isPlaying ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="h-5 w-5 ml-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {isCurrentArticle && playerState.isPlaying ? 'Playing...' : 'Ready to play'}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {article.sourceName}
          </p>
        </div>

        {isCurrentArticle && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {formatTime(playerState.currentTime)}
            </span>
            <div className="h-1 w-20 rounded-full bg-zinc-300 dark:bg-zinc-700">
              <div
                className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100"
                style={{ width: `${playerState.duration ? (playerState.currentTime / playerState.duration) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* TODO: Add ElevenLabs voice selection dropdown */}
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
