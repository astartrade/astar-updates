import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  console.log('FETCHING ARTICLES');
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: true,
      },
    });

    // Check if articles is null or undefined
    if (!articles) {
      throw new Error('No articles found');
    }

    return NextResponse.json(articles);
  } catch (error: any | Error) {
    console.log('Error fetching articles:', error);

    // Ensure error message is a valid object
    return NextResponse.json(
      { error: error.message || 'Error fetching articles' },
      { status: 500 }
    );
  }
}
