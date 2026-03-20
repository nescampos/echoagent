import { NextRequest, NextResponse } from 'next/server';
import { ScrapedContent } from '@/types';

// TODO: Initialize Firecrawl client
// import FirecrawlApp from '@mendable/firecrawl-js';
// 
// const firecrawl = new FirecrawlApp({
//   apiKey: process.env.FIRECRAWL_API_KEY,
// });

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

    // TODO: Use Firecrawl to scrape the URL
    // const scrapeResult = await firecrawl.scrapeUrl(url, {
    //   formats: ['markdown', 'html'],
    //   onlyMainContent: true,
    // });
    //
    // if (!scrapeResult.success) {
    //   return NextResponse.json(
    //     { error: 'Failed to scrape URL' },
    //     { status: 500 }
    //   );
    // }
    //
    // const content: ScrapedContent = {
    //   title: scrapeResult.metadata?.title || scrapeResult.markdown?.slice(0, 100) || 'Untitled',
    //   content: scrapeResult.markdown || '',
    //   excerpt: scrapeResult.description || scrapeResult.markdown?.slice(0, 300) || '',
    //   author: scrapeResult.metadata?.author,
    //   publishedAt: scrapeResult.metadata?.publishedDate,
    //   imageUrl: scrapeResult.metadata?.image,
    //   sourceName: scrapeResult.metadata?.sourceURL || url,
    // };

    // Placeholder response - remove when Firecrawl is implemented
    await new Promise(resolve => setTimeout(resolve, 500));

    const content: ScrapedContent = {
      title: 'Article Title (TODO: Implement Firecrawl)',
      content: `This is placeholder content. To enable actual scraping, implement the Firecrawl integration in the API route.

The URL you submitted was: ${url}

Once Firecrawl is configured with your API key, this will contain the full article content extracted from the webpage.`,
      excerpt: 'Article excerpt will appear here once Firecrawl is configured.',
      sourceName: new URL(url).hostname,
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
