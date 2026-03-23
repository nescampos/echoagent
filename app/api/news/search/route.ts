import { NextRequest, NextResponse } from 'next/server';

// Initialize Firecrawl client
import FirecrawlApp from '@mendable/firecrawl-js';

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Use Firecrawl to search for news
    const searchResult = await firecrawl.search(query, {
      limit: 4,  // Limit to 4 results as specified
      scrapeOptions: {
        formats: ['markdown'],
        onlyMainContent: true,
      }
    });
    
    if (!searchResult || !searchResult.web) {
      return NextResponse.json(
        { error: 'Failed to search' },
        { status: 500 }
      );
    }
    
    const results = searchResult.web?.map((item: any) => ({
      url: item.url || '',
      title: item.title || item.metadata?.title || 'Untitled',
      description: item.description || item.snippet || item.markdown?.slice(0, 200) || '',
    })) || [];
    
    return NextResponse.json({ results });

  } catch (error) {
    console.error('News search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
