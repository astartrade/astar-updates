import { PrismaClient } from "@prisma/client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import Link from "next/link";

const prisma = new PrismaClient();

async function getArticles() {
  const articles = await prisma.article.findMany({
    include: { author: true },
    orderBy: { publishedDate: 'desc' },
  });
  return articles;
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card 
            key={article.id} 
            className="max-w-full"
            isPressable
            as={Link}
            href={`/news/${article.slug}`}
          >
            {article.thumbnail && (
              <CardHeader className="p-0">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  radius="none"
                  fallbackSrc="/placeholder.svg"
                />
              </CardHeader>
            )}
            <CardBody className="flex-grow">
              <div className="flex justify-between items-start gap-2">
                <h2 className="text-lg font-bold">{article.title}</h2>
                {article.category && (
                  <Chip size="sm" color="primary">
                    {article.category}
                  </Chip>
                )}
              </div>
              <p className="text-sm text-default-500 mt-2">
                By {article.author.name} • {new Date(article.publishedDate).toLocaleDateString()}
              </p>
              <p className="mt-2 line-clamp-3 text-sm text-default-600">
                {article.text}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

