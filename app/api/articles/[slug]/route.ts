import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth, currentUser } from '@clerk/nextjs/server';
import { generateSlug, getOrCreateAuthor } from '@/config/functions';
import { v2 as cloudinary } from 'cloudinary';
import { extractPublicId } from '@/config/cloudinaryUploader';

const prisma = new PrismaClient();

// READ (all articles)
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

// UPDATE
export async function PUT(req: NextRequest) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      );
    }

    const data = await req.json();
    const slug = generateSlug(data.title);

    const author = await getOrCreateAuthor(userId, user);

    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        slug: slug,
        authorId: author.id,
        category: data.category,
        text: data.text,
        publishedDate: new Date(data.publishedDate),
        status: data.status,
        featuredImage: data.featuredImage,
        thumbnail: data.thumbnail,
      },
      include: { author: true },
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('Failed to update article:', error);
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = params;

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
      console.log(publicId + '#############');

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


