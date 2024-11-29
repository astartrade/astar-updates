import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Chip } from '@nextui-org/chip';
import { Avatar } from '@nextui-org/avatar';
import { Divider } from '@nextui-org/react';
import { LucideFilePenLine, LucideTrash2 } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { format } from 'date-fns';

const prisma = new PrismaClient();

export async function getArticle(slug: string) {
  const article = await prisma.article.findFirst({
    where: {
      slug: slug,
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
  const formattedDate = format(new Date(article.publishedDate), 'MMM dd, yyyy');
  const { userId }: { userId: string | null } = await auth();

  return (
    <div className='p-4'>
      <div className='container mx-auto md:p-4'>
        <Card className='max-w-3xl mx-auto rounded-none md:rounded-xl'>
          <CardHeader className='p-0 relative '>
            <Chip
              className='px-2 rounded-none rounded-bl-2xl text-white bg-lime-600 font-bebas absolute z-50 inset-y-0 right-0'
              size='md'
              color='warning'>
              {article.category}
            </Chip>
            {userId ? (
              <div className='flex items-center gap-1 absolute left-2 top-2 z-50'>
                <Link href={'#'}>
                  <LucideFilePenLine
                    className='text-white  bg-lime-600 
                rounded-full box-content p-1'
                  />
                </Link>
                <Link href={'#'}>
                  <LucideTrash2
                    className='text-white   bg-red-600 
                rounded-full box-content p-1'
                  />
                </Link>
              </div>
            ) : (
              ''
            )}
            <Image
              src={
                article.featuredImage
                  ? article.featuredImage
                  : '/images/aaha.jpg'
              }
              alt={article.title}
              className='w-full  object-cover'
              radius='none'
              fallbackSrc='/images/aaha.jpg'
            />
          </CardHeader>
          <CardBody className='md:p-8'>
            <div className='md:flex justify-between items-start gap-4 mb-4'>
              <h1 className='text-2xl'>{article.title}</h1>
              <div>
                {article.category && (
                  <Chip
                    className='px-2 rounded-none font-bebas'
                    size='md'
                    color='primary'>
                    {formattedDate}
                  </Chip>
                )}
              </div>
            </div>

            <div className='flex items-center gap-4 mb-6'>
              <Avatar
                className='w-8 h-8'
                src={article.author.avatar}
                name={article.author.name}
              />
              <div>
                <p className='text-sm font-bebas'>{article.author.name}</p>
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
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
