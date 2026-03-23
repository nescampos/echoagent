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

    // TODO: Use Firecrawl to search for news
    // The firecrawl.search() method can be used to search the web
    //
    const searchResult = await firecrawl.search(query, {
      limit: 4,  // Limit to 4 results as specified
      scrapeOptions: {
        formats: ['html', 'markdown'],
      },
      sources: ["news"]
    });
    
    if (!searchResult) {
      return NextResponse.json(
        { error: 'Failed to search' },
        { status: 500 }
      );
    }
    
    const results = searchResult.news?.map((item) => ({
      url: 'url' in item ? (item.url || '') : '',
      title: 'title' in item ? (item.title || 'Untitled') : '',
      description: 'snippet' in item ? (item.snippet || '') : '',
    })) || [];
    
    return NextResponse.json({ results });

    // Placeholder response - remove when Firecrawl is implemented
    //await new Promise(resolve => setTimeout(resolve, 800));

    // Simulated search results based on query
    // const mockResults = [
    //   {
    //     url: `https://example.com/news/${query.replace(/\s+/g, '-')}-1`,
    //     title: `${query} - Latest Updates and News`,
    //     description: `Stay informed with the latest news about ${query}. Comprehensive coverage and analysis.`,
    //   },
    //   {
    //     url: `https://example.com/news/${query.replace(/\s+/g, '-')}-2`,
    //     title: `Breaking: ${query} Development`,
    //     description: `Recent developments in ${query}. Expert opinions and detailed reporting.`,
    //   },
    //   {
    //     url: `https://example.com/news/${query.replace(/\s+/g, '-')}-3`,
    //     title: `${query}: What You Need to Know`,
    //     description: `Essential information about ${query}. Key facts and insights.`,
    //   },
    //   {
    //     url: `https://example.com/news/${query.replace(/\s+/g, '-')}-4`,
    //     title: `In-Depth: ${query} Analysis`,
    //     description: `A comprehensive look at ${query}. Background, context, and implications.`,
    //   },
    // ];

    // return NextResponse.json({ 
    //   results: mockResults.slice(0, 4),
    //   query,
    //   todo: 'Implement Firecrawl search in /api/news/search/route.ts'
    // });
  } catch (error) {
    console.error('News search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
