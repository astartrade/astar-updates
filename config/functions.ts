import { prisma } from "@/lib/prisma";

// Helper function to generate slug
export function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }


  // Helper function to get or create author
export async function getOrCreateAuthor(userId: string, user: any) {
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