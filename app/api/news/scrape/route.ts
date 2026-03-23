import { NextRequest, NextResponse } from 'next/server';
import { ScrapedContent } from '@/types';

// Initialize Firecrawl client
import FirecrawlApp from '@mendable/firecrawl-js';

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Use Firecrawl to scrape the URL
    const scrapeResult = await firecrawl.scrape(url, {
      formats: ['markdown'],
      onlyMainContent: true,
    });

    if (!scrapeResult || !scrapeResult.markdown) {
      return NextResponse.json(
        { error: 'Failed to scrape URL' },
        { status: 500 }
      );
    }

    const content: ScrapedContent = {
      title: (scrapeResult.metadata?.title as string) || scrapeResult.markdown?.slice(0, 100) || 'Untitled',
      content: scrapeResult.markdown || '',
      excerpt: scrapeResult.markdown?.slice(0, 300) || '',
      author: scrapeResult.metadata?.author as string,
      publishedAt: scrapeResult.metadata?.publishedDate as string,
      imageUrl: scrapeResult.metadata?.image as string,
      sourceName: (scrapeResult.metadata?.sourceURL as string) || new URL(url).hostname,
    };

    return NextResponse.json(content);
  } catch (error) {
    console.error('Scrape API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
