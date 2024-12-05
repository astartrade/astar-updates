import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { v2 as cloudinary } from 'cloudinary';
import { extractPublicId } from '@/config/cloudinaryUploader';
import { prisma } from '@/lib/prisma';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// DELETE
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
      console.log(publicId + '  DELETING #############');

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

    return NextResponse.json({
      message: 'Featured Image deleted successfully',
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
