# Echo - AI News Reader

Echo is an AI-powered news reader that transforms written articles into natural-sounding speech. Paste any article URL and listen to it with AI-generated speech.

## Features

- 📰 **Article Management** - Save and organize your favorite articles
- 🔊 **Text-to-Speech** - Listen to articles with natural AI voices
- 🎨 **Modern UI** - Clean, responsive design with dark mode support
- 💾 **Local Storage** - Your articles are saved locally in your browser

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with hooks and Context API
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Type-safe development

## Integrations (TODO)

### Firecrawl - Web Scraping
Firecrawl is used to extract article content from URLs.

**Setup:**
1. Get your API key at [firecrawl.dev](https://firecrawl.dev)
2. Add to `.env.local`:
   ```
   FIRECRAWL_API_KEY=your_api_key_here
   ```
3. Implement the Firecrawl client in `app/api/scrape/route.ts`

### ElevenLabs - Text-to-Speech
ElevenLabs provides AI-generated speech for article content.

**Setup:**
1. Get your API key at [elevenlabs.io](https://elevenlabs.io)
2. Add to `.env.local`:
   ```
   ELEVENLABS_API_KEY=your_api_key_here
   ```
3. Implement the ElevenLabs client in `app/api/tts/route.ts` and `components/AudioPlayer.tsx`

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
echo/
├── app/
│   ├── api/
│   │   ├── scrape/     # Firecrawl scraping endpoint
│   │   └── tts/        # ElevenLabs TTS endpoint
│   ├── article/[id]/   # Article detail page
│   ├── about/          # About page
│   ├── layout.tsx      # Root layout with providers
│   └── page.tsx        # Home page
├── components/
│   ├── AddArticleForm  # URL input form
│   ├── ArticleCard     # Article list item
│   ├── AudioPlayer     # TTS player component
│   └── Header          # Navigation header
├── contexts/
│   └── ArticlesContext # Global state management
├── types/
│   └── index.ts        # TypeScript types
└── .env.example        # Environment variables template
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your API keys:

```bash
FIRECRAWL_API_KEY=
ELEVENLABS_API_KEY=
```

## License

MIT
