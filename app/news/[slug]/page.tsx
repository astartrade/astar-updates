import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Chip } from '@nextui-org/chip';
import { Avatar } from '@nextui-org/avatar';
import { Divider } from '@nextui-org/react';

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

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);

  return (
    <div className=' p-4'>
      <div className='container mx-auto p-4'>
        <Card className='max-w-3xl mx-auto rounded-none md:rounded-xl'>
            <CardHeader className='p-0'>
              <Image
                src={article.featuredImage ?? '/images/aaha.jpg'}
                alt={article.title}
                className='w-full  object-cover'
                radius='none'
                fallbackSrc='/aaha.jpg'
              />
            </CardHeader>
          {/* {article.featuredImage && (
          )} */}
          <CardBody className='md:p-8'>
            <div className='md:flex justify-between items-start gap-4 mb-4'>
              <h1 className='text-2xl'>{article.title}</h1>
              <div>
              {article.category && (
                <Chip className='px-2 rounded-none font-bebas ' size='md' color='primary'>
                  {article.category}
                </Chip>
              )}
              </div>
            </div>

            <div className='flex items-center gap-4 mb-6'>
              <Avatar className=' w-8 h-8 ' src={article.author.avatar} name={article.author.name} />
              <div>
                <p className='text-sm font-bebas '>{article.author.name}</p>

              </div>
            </div>
            <div className='py-5'>
              <Divider className='' />
            </div>

            <div className='prose prose-lg dark:prose-invert max-w-none'>
              <div
                className=''
                dangerouslySetInnerHTML={{ __html: article.text }}
              />

              {/* {article.text.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))} */}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
