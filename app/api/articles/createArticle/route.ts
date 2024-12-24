import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from "next/server";

import { generateSlug, getOrCreateAuthor } from "@/config/functions";
import { prisma } from "@/lib/prisma";

// CREATE
export async function POST(req: NextRequest) {
    console.log('Starting ....')

    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

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
                excerpt: data.excerpt,
                publishedDate: new Date(data.publishedDate),
                status: data.status,
                featuredImage: data.featuredImage,
                thumbnail: data.thumbnail,
            },
            include: { author: true },
        });

        return NextResponse.json(newArticle, { status: 201 });
    } catch (error: any) {
        if (error.code === 'P2002') {
            // Pass error code and details to the frontend
            return NextResponse.json(
                { 
                    error: "Article with same title Exist", 
                    code: error.code, 
                    details: error.meta 
                },
                { status: 409 } // Conflict HTTP status code
            );
        } else {
            console.log("Failed to create article:" + error);
            return NextResponse.json(
                { 
                    error: "Failed to create article", 
                    message: error.message 
                }, 
                { status: 500 }
            );
        }
    }
}
