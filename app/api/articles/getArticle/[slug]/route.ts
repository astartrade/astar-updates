import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.pathname.split('/').pop(); // Extract the slug from the URL

  if (!slug) {
    console.error('Request missing slug parameter');
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    const article = await prisma.article.findFirst({
      where: { slug },
      include: { author: true },
    });

    if (!article) {
      console.warn(`Article with slug "${slug}" not found`);
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error(`Error fetching article with slug "${slug}":`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
