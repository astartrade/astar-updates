// app/api/articles/getArticle/[slug]/route.ts
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// Reuse PrismaClient instance to prevent multiple connections
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? [] : ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

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
