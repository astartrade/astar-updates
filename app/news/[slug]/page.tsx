'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Chip } from '@nextui-org/chip';
import { Avatar } from '@nextui-org/avatar';
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import {
  LucideFilePenLine,
  LucidePlusCircle,
  LucideTrash2,
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import Loading from '@/components/ui/Loading';
import { useAuth } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const router = useRouter();

  const { isLoaded, userId } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState('opaque');

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/getArticle/${params.slug}`);
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

  const handleDelete = async (slug: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/articles/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the article ...');
      }

      // Optionally, you can redirect the user or update the state after successful deletion
      toast.success('Article created successfully!');
      window.location.href = '/news';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
        <Card className='max-w-4xl mx-auto rounded-none md:rounded-xl shadow-sm '>
          <CardHeader className='p-0 relative  '>
            <Chip
              className='px-2 rounded-none rounded-bl-2xl text-white bg-lime-600 font-bebas absolute z-50 inset-y-0 right-0'
              size='md'
              color='warning'>
              {article.category}
            </Chip>
            {isLoaded && userId ? (
              <div className='flex items-center gap-1 absolute left-2 top-2 z-50'>
                <Tooltip color='success' content='Add New Article'>
                  <Link href={'/create-article'}>
                    <LucidePlusCircle
                      className='text-white  bg-blue-600 
              rounded-full box-content p-1'
                    />
                  </Link>
                </Tooltip>
                <Tooltip color='secondary' content='Edit This Article'>
                  <button
                    onClick={() => router.push(`/news/edit/${article.slug}`)}
                    tabIndex={0}
                    className='text-white bg-lime-600 rounded-full box-content p-1'>
                    <LucideFilePenLine />
                  </button>
                </Tooltip>
                <Tooltip color='danger' content='Delete News Article'>
                  <Link href={'#'} onClick={onOpen}>
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

            <Modal backdrop={'opaque'} isOpen={isOpen} onClose={onClose}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className='flex flex-col gap-1'>
                      Delete Article
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        Once deleted, articles cannot be recovered. Please
                        ensure you want to proceed, as this action is permanent
                        and irreversible.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color='danger' variant='light' onPress={onClose}>
                        Cancel
                      </Button>
                      <Button
                        color='danger'
                        onPress={() => handleDelete(article.slug)}>
                        {/* confirm delete article */}
                        Delete
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <Image
              alt={article.title}
              fallbackSrc={article.featuredImage}
              src={article.featuredImage}             
              width={1000}
              height={475}
              sizes='100vw'
              className='rounded-b-none'
              style={{
                width: '100vw',
                height: 'auto',
              }}
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

            <div className='flex items-center gap-4 mb-6 hidden'>
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
