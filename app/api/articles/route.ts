import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth, currentUser } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

// Helper function to get or create author
async function getOrCreateAuthor(userId: string, user: any) {
  let author = await prisma.author.findUnique({ where: { email: user.emailAddresses[0].emailAddress } });
  
  if (!author) {
    author = await prisma.author.create({
      data: {
        name: `${user.firstName} ${user.lastName}`.trim() || "Anonymous",
        email: user.emailAddresses[0].emailAddress,
        avatar: user.imageUrl || "",
      },
    });
  }
  
  return author;
}

// CREATE
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log('WE AER HERE ...')
    const data = await req.json();
    const slug = generateSlug(data.title);

    const author = await getOrCreateAuthor(userId, user);

    const newArticle = await prisma.article.create({
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

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error("Failed to create article:", error);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}

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
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 });
    }

    await prisma.article.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Failed to delete article:", error);
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}

