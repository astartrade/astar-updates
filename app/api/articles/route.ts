import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('fetching articles ...')
    const articles = await prisma.article.findMany({
      include: {
        author: true, // Include related author information
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
