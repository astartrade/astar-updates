// app/api/keep-alive/route.ts
// Preventing database from idling and auto pausing
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  console.log('RUNNING KEEP ALIVE');
  const start = new Date().toISOString();
  try {
    const count = await prisma.article.count();
    return NextResponse.json({
      message: `Database check successful. Article count: ${count}`,
      status: 200,
      time: start,
    });
  } catch (error: any | Error) {
    console.log('Error Running Keep-Alive:', error);

    return NextResponse.json(
      { error: error.message || 'Sorry...Error Running Keep-Alive' },
      { status: 500 }
    );
  }
}