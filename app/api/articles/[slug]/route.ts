import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth, currentUser } from '@clerk/nextjs/server';
import { v2 as cloudinary } from 'cloudinary';

import { generateSlug, getOrCreateAuthor } from '@/config/functions';
import { extractPublicId } from '@/config/cloudinaryUploader';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// READ (all articles)
export async function GET(req: NextRequest) {
  try {
    // const { userId } = await auth();

    // if (!userId) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const articles = await prisma.article.findMany({
      skip,
      take: limit,
      include: { author: true },
    });

    const total = await prisma.article.count();

    return NextResponse.json({
      articles,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  console.log('Processing PUT request for article update');
  console.log('Request URL:', req.url); // Log the full URL

  try {
    const path = req.nextUrl.pathname;
    const slug = path.split('/').pop();
    console.log('Received slug:', slug);

    if (!slug) {
      console.log('slug is required .....');
      return NextResponse.json(
        { error: 'Article slug is required' },
        { status: 400 }
      );
    }

    const data = await req.json();
    console.log('Request data:', data);

    const updatedSlug = generateSlug(data.title);

    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const author = await getOrCreateAuthor(userId, user);

    const updatedArticle = await prisma.article.update({
      where: { slug },
      data: {
        title: data.title,
        slug: updatedSlug,
        authorId: author.id,
        category: data.category,
        text: data.text,
        excerpt: data.excerpt,
        publishedDate: new Date(data.publishedDate),
        status: data.status,
        featuredImage: data.featuredImage,
        thumbnail: data.thumbnail,
      },
      include: { author: true },
    });

    revalidatePath('/news');

    // console.log('Article updated successfully:', updatedArticle);
    return NextResponse.json(updatedArticle, { status: 200 }); // Explicit 200
  } catch (error) {
    console.error('Failed to process PUT request:', error);

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as any).code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}


// DELETE
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const slug = req.nextUrl.pathname.split('/').pop();


    if (!slug) {
      return NextResponse.json(
        { error: 'Article slug is required' },
        { status: 400 }
      );
    }

    // Fetch article to get the featuredImage URL
    const article = await prisma.article.findUnique({
      where: { slug },
      select: { featuredImage: true },
    });

    if (article?.featuredImage) {
      // Extract the public_id

      const publicId = extractPublicId(article?.featuredImage as string);
      console.log(publicId + ' #############');

      // Delete the image from Cloudinary
      const cloudinaryResult = await cloudinary.uploader.destroy(publicId);

      if (cloudinaryResult.result !== 'ok') {
        console.warn('Cloudinary deletion result:', cloudinaryResult);
      } else {
        console.log('Image successfully deleted from Cloudinary.');
      }
    } else {
      console.log('No featuredImage to delete.');
    }

    // Delete the article from the database
    const deletedArticle = await prisma.article.delete({
      where: { slug },
    });

    return NextResponse.json({
      message: 'Article deleted successfully',
      article: deletedArticle,
      status: 200,
    });
  } catch (error) {
    console.error('Failed to delete article:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
