import Link from 'next/link';
import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>

          <h1 className="mt-6 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            About Echo
          </h1>

          <div className="prose prose-zinc mt-8 dark:prose-invert">
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Echo is an AI-powered news reader that transforms written articles into natural-sounding speech.
            </p>

            <h2>How it works</h2>
            <ol>
              <li>Paste any article URL</li>
              <li>Our system extracts the content using Firecrawl</li>
              <li>ElevenLabs converts the text to lifelike speech</li>
              <li>Listen to your articles on the go</li>
            </ol>

            <h2>Technologies</h2>
            <ul>
              <li>
                <strong>Firecrawl</strong> - Web scraping and content extraction
              </li>
              <li>
                <strong>ElevenLabs</strong> - AI text-to-speech synthesis
              </li>
              <li>
                <strong>Next.js</strong> - React framework for the web interface
              </li>
            </ul>

            <div className="mt-8 rounded-xl bg-zinc-100 p-6 dark:bg-zinc-900">
              <h3 className="mt-0 text-lg font-semibold">Getting Started</h3>
              <p className="mb-0 text-sm text-zinc-600 dark:text-zinc-400">
                To use Echo, you&apos;ll need to set up API keys for both Firecrawl and ElevenLabs.
                Check the README for setup instructions.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
