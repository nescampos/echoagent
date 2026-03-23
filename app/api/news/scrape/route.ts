import { NextRequest, NextResponse } from 'next/server';

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
    //   formats: ['markdown', 'metadata'],
    //   onlyMainContent: true,
    //   removeTags: ['nav', 'footer', 'aside', 'script', 'style'],
    // });
    //
    // if (!scrapeResult.success) {
    //   return NextResponse.json(
    //     { error: 'Failed to scrape URL' },
    //     { status: 500 }
    //   );
    // }
    //
    // return NextResponse.json({
    //   url,
    //   title: scrapeResult.metadata?.title || 'Untitled',
    //   content: scrapeResult.markdown || '',
    //   excerpt: scrapeResult.description || scrapeResult.markdown?.slice(0, 300) || '',
    //   sourceName: scrapeResult.metadata?.sourceURL || new URL(url).hostname,
    //   author: scrapeResult.metadata?.author,
    //   publishedAt: scrapeResult.metadata?.publishedDate,
    // });

    // Placeholder response - remove when Firecrawl is implemented
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      url,
      title: 'Article Title (TODO: Implement Firecrawl)',
      content: `This is placeholder content for the article at ${url}. 

To enable actual scraping, implement the Firecrawl integration in this API route.

Once Firecrawl is configured with your API key, this endpoint will return the full article content extracted from the webpage, which will then be sent to the ElevenLabs agent for summarization.`,
      excerpt: 'Article excerpt will appear here once Firecrawl is configured.',
      sourceName: new URL(url).hostname,
      todo: 'Implement Firecrawl scraping in /api/news/scrape/route.ts',
    });
  } catch (error) {
    console.error('Scrape API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
