# Echo - AI News Assistant

Echo is an AI-powered news assistant that uses voice conversation to help you discover and understand current events. Talk to your assistant, tell it what topics you're interested in, and get personalized news summaries.

## Features

- 🎙️ **Voice Conversation** - Talk naturally with an AI assistant using ElevenLabs Agents
- 📰 **Real-time News Search** - Find relevant news articles using Firecrawl web search
- 🔍 **Smart Scraping** - Extract article content from any news website
- 📋 **Article Management** - View and organize search results
- 🎨 **Modern UI** - Clean, responsive design with dark mode support

## How It Works

1. **Start a conversation** - Click the microphone button to begin
2. **Tell the assistant your topic** - Say or type what news you want (e.g., "I want news about technology")
3. **Search & scrape** - The assistant searches the web and extracts article content
4. **Get summaries** - Receive AI-generated summaries of the latest news

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with hooks and Context API
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Type-safe development

## Integrations

### ElevenLabs Agents - Voice Conversation

Echo uses [ElevenLabs Agents](https://elevenlabs.io/docs/eleven-agents) for natural voice conversations.

**Setup:**

1. Create an account at [elevenlabs.io](https://elevenlabs.io)
2. Go to the Agents section and create a new agent
3. Configure your agent with a system prompt like:
   ```
   You are a helpful news assistant. Your job is to help users discover and understand current events.
   When a user tells you a topic they're interested in, respond with a search query in this format:
   [SEARCH:topic name]
   
   After receiving search results, summarize the key points in a clear, conversational way.
   Be concise but informative. Always be friendly and helpful.
   ```
4. Copy your Agent ID from the agent settings
5. Add to `.env.local`:
   ```
   ELEVENLABS_API_KEY=your_api_key_here
   NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_agent_id_here
   ```

### Firecrawl - Web Search & Scraping

Firecrawl is used to search for news articles and extract their content.

**Setup:**

1. Get your API key at [firecrawl.dev](https://firecrawl.dev)
2. Add to `.env.local`:
   ```
   FIRECRAWL_API_KEY=your_api_key_here
   ```

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your API keys:
   ```
   FIRECRAWL_API_KEY=your_firecrawl_key
   ELEVENLABS_API_KEY=your_elevenlabs_key
   NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_agent_id
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
│   │   ├── news/
│   │   │   ├── search/     # Firecrawl news search endpoint
│   │   │   └── scrape/     # Firecrawl article scraping endpoint
│   │   ├── scrape/         # Legacy scraping endpoint
│   │   └── tts/            # Text-to-speech endpoint
│   ├── article/[id]/       # Article detail page
│   ├── about/              # About page
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Home page with conversation UI
├── components/
│   ├── AddArticleForm      # URL input form (legacy)
│   ├── ArticleCard         # Article list item (legacy)
│   ├── AudioPlayer         # TTS player component (legacy)
│   ├── ConversationPanel   # Voice conversation UI
│   ├── Header              # Navigation header
│   ├── NewsResults         # Search results display
│   └── VoiceSessionButton  # Voice session toggle
├── contexts/
│   ├── ArticlesContext     # Legacy article state
│   └── AgentContext        # Agent conversation state
├── types/
│   └── index.ts            # TypeScript types
└── .env.example            # Environment variables template
```

## Conversation Flow

```
┌─────────────────┐
│  User starts    │
│  voice session  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Agent greets   │
│  user           │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  User specifies │
│  news topic     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Agent returns  │
│  search query   │
│  [SEARCH:topic] │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Firecrawl      │
│  searches web   │
│  (4 results)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Firecrawl      │
│  scrapes each   │
│  article        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Agent receives │
│  content &      │
│  summarizes     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  User hears     │
│  summary        │
└─────────────────┘
```

## TODO: Implementation Steps

### ElevenLabs Integration

In `contexts/AgentContext.tsx`:

```typescript
import { useConversation } from '@elevenlabs/react';

const {
  startSession,
  endSession,
  sendEvent,
  isSpeaking,
  isListening,
  isConnected,
} = useConversation({
  agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID,
  onConnect: () => { /* handle connection */ },
  onDisconnect: () => { /* handle disconnection */ },
  onMessage: (message) => { /* handle messages */ },
  onError: (error) => { /* handle errors */ },
});
```

### Firecrawl Integration

In `app/api/news/search/route.ts`:

```typescript
import FirecrawlApp from '@mendable/firecrawl-js';

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

const searchResult = await firecrawl.search(query, {
  limit: 4,
  scrapeOptions: {
    formats: ['markdown', 'metadata'],
  },
});
```

In `app/api/news/scrape/route.ts`:

```typescript
const scrapeResult = await firecrawl.scrapeUrl(url, {
  formats: ['markdown', 'metadata'],
  onlyMainContent: true,
});
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `FIRECRAWL_API_KEY` | Firecrawl API key for web search/scraping | Yes |
| `ELEVENLABS_API_KEY` | ElevenLabs API key for voice | Yes |
| `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` | Your ElevenLabs Agent ID | Yes |

## License

MIT
