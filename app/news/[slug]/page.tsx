'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Chip } from '@nextui-org/chip';
import { Avatar } from '@nextui-org/avatar';
import { Divider, Tooltip } from '@nextui-org/react';
import { LucideFilePenLine, LucideTrash2 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import Loading from '@/components/ui/Loading';
import { useAuth } from '@clerk/nextjs';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        console.log(params);
        const response = await fetch(`/api/getArticle/${params.slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        const data = await response.json();
        setArticle(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.slug]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!article) {
    return <p>Article not found</p>;
  }

  const formattedDate = format(new Date(article.publishedDate), 'MMM dd, yyyy');

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
                <Tooltip content='Edit News Article'>
                  <Link href={'#'}>
                    <LucideFilePenLine
                      className='text-white  bg-lime-600 
              rounded-full box-content p-1'
                    />
                  </Link>
                </Tooltip>
                <Tooltip color='danger' content='Delete News Article'>
                  <Link href={'#'}>
                    <LucideTrash2
                      className='text-white   bg-red-600 
                    rounded-full box-content p-1'
                    />
                  </Link>
                </Tooltip>
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
                  <Chip
                    className='px-2 rounded-none font-bebas'
                    size='md'
                    color='primary'>
                    {formattedDate}
                  </Chip>
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
