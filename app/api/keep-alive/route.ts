// app/api/keep-alive/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch the Slack webhook URL and secret key from environment variables
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const SECRET_KEY = process.env.SLACK_SECRET_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

async function sendSlackNotification(errorMessage: string) {
  if (!SLACK_WEBHOOK_URL || SECRET_KEY != CLOUDINARY_API_SECRET) {
    console.error('Slack Webhook URL is not set');
    return;
  }

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

export async function GET(req: Request) {
  // Check for the secret key in the request headers
  const secretKey = req.headers.get('x-secret-key') || req.url.split('?secret=')[1];

  if (secretKey !== SECRET_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 403 }
    );
  }

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
