import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  // console.log("hitting backend");
  try {
    const data = await req.json();
    const newArticle = await prisma.article.create({
      data: {
        title: data.title,
        category: data.category,
        text: data.text,
        publishedDate: new Date(data.publishedDate),
        status: data.status,
        thumbnail: data.thumbnail,
        author: {
          connectOrCreate: {
            where: { email: data.author.email },
            create: {
              name: data.author.name,
              email: data.author.email,
              avatar: data.author.avatar,
            },
          },
        },
      },
      include: { author: true },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error("Failed to create article:", error);

    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: { author: true },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Failed to fetch articles:", error);

    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 },
    );
  }
}
