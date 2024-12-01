import { prisma } from '@/lib/prisma';
import React from 'react';

async function getArticle(slug: string){
  return prisma.article.findFirst({
    where: { slug },
    include: { author: true },
  }); 
}

interface EditArticleProps {
  params: { slug: string };
}

const EditArticle = async ({ params }: EditArticleProps) => {
  const { slug } = params;

  const article = await getArticle(slug);

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.text}</p>
      <div>
        Author: {article.author.name}
      </div>
    </div>

  );
};

export default EditArticle;
