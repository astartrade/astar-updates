import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth, currentUser } from '@clerk/nextjs/server';
import { generateSlug, getOrCreateAuthor } from "@/config/functions";

const prisma = new PrismaClient();






// READ (all articles)
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    console.error("Failed to fetch articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

// UPDATE
export async function PUT(req: NextRequest) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 });
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
    console.error("Failed to update article:", error);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}
// DELETE
export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  try {
    // Check for authenticated user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = params; // Get slug from the URL params

    if (!slug) {
      return NextResponse.json({ error: 'Article slug is required' }, { status: 400 });
    }

    // Delete article based on slug
    const deletedArticle = await prisma.article.delete({
      where: { slug },
    });

    return NextResponse.json({
      message: 'Article deleted successfully',
      article: deletedArticle,
      status: 200
      
    });
  } catch (error) {
    console.error('Failed to delete article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}