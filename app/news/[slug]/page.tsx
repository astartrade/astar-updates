import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";
import { Avatar } from "@nextui-org/avatar";

const prisma = new PrismaClient();

export async function getArticle(slug: string) {
    const article = await prisma.article.findFirst({
        where: {
          slug: slug, // Replace with the dynamic slug
        },
    include: { author: true },
  });
  if (!article) notFound();
  return article;
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        {article.featuredImage && (
          <CardHeader className="p-0">
            <Image
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-64 object-cover"
              radius="none"
              fallbackSrc="/placeholder.svg"
            />
          </CardHeader>
        )}
        <CardBody className="p-8">
          <div className="flex justify-between items-start gap-4 mb-4">
            <h1 className="text-4xl font-bold">{article.title}</h1>
            {article.category && (
              <Chip size="lg" color="primary">
                {article.category}
              </Chip>
            )}
          </div>
          <div className="flex items-center gap-4 mb-6">
            <Avatar src={article.author.avatar} name={article.author.name} />
            <div>
              <p className="font-semibold">{article.author.name}</p>
              <p className="text-sm text-default-500">
                {new Date(article.publishedDate).toLocaleDateString()} • 
                {article.views} views
              </p>
            </div>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {article.text.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

