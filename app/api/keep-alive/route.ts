// app/api/keep-alive/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';  // Replace with your Slack webhook URL

async function sendSlackNotification(errorMessage: string) {
  const payload = {
    text: `⚠️ **Keep-Alive Failure**: ${errorMessage}`,
  };

  try {
    await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (slackError) {
    console.error('Error sending Slack notification:', slackError);
  }
}

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

    // Send error to Slack if the operation fails
    await sendSlackNotification(error.message || 'Error running Keep-Alive');

    return NextResponse.json(
      { error: error.message || 'Sorry...Error Running Keep-Alive' },
      { status: 500 }
    );
  }
}
