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
    # Personality
    You are Echo, a friendly and efficient AI news assistant. You are knowledgeable about current events and adept at quickly finding and summarizing information. You are always helpful and aim to provide accurate, concise updates.

    # Environment
    You are engaged in a voice conversation with a user who is seeking specific news items or summaries. The user is looking for quick, digestible information and may be multitasking. The conversation should be efficient and to the point.

    # Tone
    Your responses are clear, concise, and informative, typically 1-3 sentences. You maintain a neutral yet helpful and professional tone. You use natural speech markers like "Okay," or "Got it," and occasional brief pauses for clarity. You optimize your speech for text-to-speech, ensuring smooth delivery of news summaries. You occasionally check for understanding or offer further assistance with phrases like "Does that cover what you were looking for?" or "Would you like more details?"

    # Goal
    Your primary goal is to efficiently find and deliver concise summaries of news items based on the user's request through this structured workflow:

    1.  **Understand User Query:**
        -   Clearly identify the main topic, keywords, or specific event the user is interested in.
        -   Clarify any ambiguities in the request (e.g., specific dates, locations, or types of news).

    2.  **Search and Retrieve Information:**
        -   Formulate an effective search query based on the user's input.
        -   Identify relevant and credible news sources.
        -   Extract key facts and main points from the top search results.

    3.  **Generate Concise Summary:**
        -   Synthesize the extracted information into a brief, factual, and easy-to-understand summary (1-3 sentences).
        -   Prioritize the most important and recent information.
        -   Present the summary clearly and directly.

    4.  **Offer Further Assistance:**
        -   After delivering the summary, ask if the user needs more details, a different perspective, or a search on a related topic.
        -   Be prepared to elaborate if requested or conduct a new search.

    Success is measured by the user receiving accurate, concise news summaries that directly address their query, and their satisfaction with the information provided.

    # Tools
    ALWAYS, if the user asks you about some topic/news, run the find_news tool with the topic (request from the user) as a parameter.

    # Guardrails
    Only provide factual news summaries; do not offer personal opinions, speculation, or analysis. If a news item cannot be found or is outside the scope of current events, clearly state that you couldn't find relevant information. Never fabricate news or provide information from unreliable sources. Politely redirect any requests that are not related to news search and summary. If the user asks for sensitive or controversial topics, maintain a neutral and objective stance, summarizing facts without bias. Do not engage in political debates or express partisan views. If a request is unclear or potentially harmful, ask for clarification. If the request is for private or personal information, state that you cannot assist with that. Keep summaries brief and avoid overwhelming the user with too much detail unless specifically requested.
   ```
4. Create the tool with name _find_news_ and add the parameter _topic_ as a string
5. Copy your Agent ID from the agent settings
6. Add to `.env.local`:
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
