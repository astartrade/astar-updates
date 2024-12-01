'use client';

import Loading from '@/components/ui/Loading';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { ArrowRight, LucideTrash2 } from 'lucide-react';
import { format } from 'date-fns/format';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { uploadToCloudinary } from '@/config/cloudinaryUploader';
import Image from 'next/image';
import axios from 'axios';
import TinyMCE from '@/components/TinyCE';

interface Author {
  avatar: string | undefined;
  name: string;
}

interface Article {
  category: string;
  slug: string;
  featuredImage: string;
  title: string;
  text: string;
  excerpt: string;
  status: string;
  author: Author;
  publishedDate: string | Date;
}

interface EditArticleProps {
  params: { slug: string };
}

const articleStatusOptions = [
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
  { label: 'Archived', value: 'archived' },
];

const newsCategories = [
  { label: 'Politics', value: 'politics' },
  { label: 'Business and Finance', value: 'business-finance' },
  { label: 'Technology', value: 'technology' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'Health and Wellness', value: 'health-wellness' },
];

const EditArticle = ({ params }: EditArticleProps) => {
  const { slug } = params;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const [tinyContent, setTinyContent] = useState<string>(article?.text || ''); // TinyMCE content state
  console.log(tinyContent);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Article>({
    defaultValues: {
      title: article?.title || '',
      category: article?.category || 'business-finance',
      text: tinyContent || article?.text,
      excerpt: article?.excerpt || '',
      featuredImage: article?.featuredImage || '',
      publishedDate: article
        ? article.publishedDate.toString().split('T')[0]
        : '',
      status: article?.status || 'published',
    },
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/getArticle/${slug}`);
        if (!response.ok) {
          throw new Error('Article not found');
        }
        const data: Article = await response.json();
        setArticle(data);

        // Set form values
        setValue('title', data.title);
        setValue('category', data.category);
        setValue('excerpt', data.excerpt);
        setValue('featuredImage', data.featuredImage);
        setValue('publishedDate', data.publishedDate.toString().split('T')[0]);
        setValue('status', data.status);

        // Update TinyMCE content
        setTinyContent(data.text);
      } catch (err) {
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug, setValue]);

  const onSubmit = async (data: Article) => {
    // Merge tinyContent into the form data
    const fullData = { ...data, text: tinyContent };

    try {
      const response = await axios.put(`/api/articles/${slug}`, fullData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Article updated successfully!');
        router.push('/news');
      } else {
        throw new Error('Failed to update article');
      }
    } catch (error) {
      console.error('Error updating article:', error);
      toast.error('Error updating article');
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (!article) return <p>Article not found</p>;

  return (
    <div className='p-4'>
      <div className='container mx-auto md:p-4'>
        <Card className='max-w-4xl mx-auto rounded-none md:rounded-xl shadow-sm'>
          <CardHeader className='p-0 relative'>
            <Chip
              className='px-2 rounded-none rounded-bl-2xl text-white bg-lime-600 font-bebas absolute z-50 inset-y-0 right-0'
              size='md'
              color='warning'>
              {article.category}
            </Chip>

            <Image
              alt={article.title}
              src={article.featuredImage}
              width={1000}
              height={475}
              style={{ width: '100vw', height: 'auto' }}
              className='rounded-b-none'
            />
          </CardHeader>
          <CardBody className='md:p-8'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div className='md:flex justify-between items-start gap-4 mb-4'>
                <Input
                  {...register('title', { required: true })}
                  isRequired
                  label='Title'
                  placeholder='Enter the title'
                  isInvalid={!!errors.title}
                />
                <Select
                  {...register('category', { required: true })}
                  label='Category'
                  placeholder='Select a category'
                  isInvalid={!!errors.category}>
                  {newsCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <Input
                {...register('excerpt', { required: true })}
                isInvalid={errors.excerpt ? true : false}
                color={errors.excerpt ? 'warning' : 'default'}
                isRequired
                type='text'
                label='News Article Excerpt'
                className='max-w-full '
              />

              <TinyMCE
                value={tinyContent} // Dynamically set the current content
                onChange={(content: string) => setTinyContent(content)}
              />

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Input
                  {...register('publishedDate', { required: true })}
                  type='date'
                  label='Publish Date'
                  isInvalid={!!errors.publishedDate}
                />
                <Select
                  {...register('status', { required: true })}
                  label='Status'
                  placeholder='Select status'
                  defaultSelectedKeys={['published']}
                  isInvalid={!!errors.status}>
                  {articleStatusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <Button
                type='submit'
                color='success'
                variant='flat'
                className='w-full'>
                Submit Changes
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default EditArticle;
