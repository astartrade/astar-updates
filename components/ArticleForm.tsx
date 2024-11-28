'use client';

import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';
import { Avatar } from '@nextui-org/react';

interface ArticleFormData {
  title: string;
  category: string;
  text: string;
  publishedDate: string;
  status: string;
  thumbnail: string;
  authorName: string;
  authorEmail: string;
  authorAvatar: string;
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

export default function ArticleForm() {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ArticleFormData>({
    defaultValues: {
      publishedDate: new Date().toISOString().split('T')[0],
      status: 'published',
      category: 'business-finance',
    },
  });

  useEffect(() => {
    if (user) {
      setValue('authorName', user.fullName || '');
      setValue('authorEmail', user.primaryEmailAddress?.emailAddress || '');
      setValue('authorAvatar', user.imageUrl || '');
    }
    setValue('publishedDate', new Date().toISOString().split('T')[0]);
    setValue('status', 'published');
  }, [user, setValue]);

  const onSubmit: SubmitHandler<ArticleFormData> = async (data) => {
    try {
      const response = await axios.post('/api/articles', {
        ...data,
        author: {
          name: data.authorName,
          email: data.authorEmail,
          avatar: data.authorAvatar,
        },
      });
      toast.success('Article created successfully!');
      console.log('Article created:', response.data);
    } catch (error) {
      toast.error('Failed to create article. Please try again.');
      console.error('Error creating article:', error);
    }
  };

  if (!user) {
    return <div>Please sign in to create an article.</div>;
  }

  return (
    <Card className='w-full max-w-6xl mx-auto'>
      <CardHeader className='flex gap-3'>
        <h1 className='text-xl font-bold'>Create Article</h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              {...register('title', { required: true })}
              label='Title'
              placeholder='Enter the title'
              isInvalid={errors.title ? true : false}
            />
            <Select
              {...register('category', { required: true })}
              label='Category'
              placeholder='Select a category'
              isInvalid={errors.category ? true : false}>
              {newsCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <Textarea
            {...register('text', { required: true })}
            label='Content'
            placeholder='Write the content here'
            isInvalid={errors.text ? true : false}
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              {...register('publishedDate', { required: true })}
              type='date'
              label='Publish Date'
              isInvalid={errors.publishedDate ? true : false}
            />
            <Select
              {...register('status', { required: true })}
              label='Status'
              placeholder='Select status'
              defaultSelectedKeys={['published']}
              isInvalid={errors.status ? true : false}>
              {articleStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* <Input
              {...register('views', { valueAsNumber: true })}
              type='number'
              label='Views'
              placeholder='Enter number of views'
            /> */}
            <Input
              {...register('thumbnail')}
              label='Thumbnail URL'
              placeholder='Enter thumbnail URL'
            />
          </div>

          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Author Details</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex items-center gap-4'>
                <span>
                  {' '}
                  <Avatar
                    src={
                      user
                        ? user.imageUrl
                        : 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycE00aUVDeFVWazYyN2xJeDVPQW0wbG5RbVQifQ'
                    }
                    size='md'
                  />
                </span>{' '}
                <Input
                  {...register('authorName', { required: true })}
                  label='Author Name'
                  placeholder="Enter author's name"
                  isReadOnly
                  isInvalid={errors.authorName ? true : false}
                />
              </div>
              <Input
                {...register('authorEmail', {
                  required: true,
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
                type='email'
                label='Author Email'
                placeholder="Enter author's email"
                isReadOnly
                isInvalid={errors.authorEmail ? true : false}
              />
            </div>
            {/* <Input
              {...register('authorAvatar', { required: true })}
              label='Author Avatar URL'
              placeholder="Enter author's avatar URL"
              isReadOnly
              isInvalid={errors.authorAvatar ? true : false}
            /> */}
          </div>

          <div>
            <Button
              type='submit'
              color='success'
              variant='flat'
              className='w-full text-center'
              endContent={<ArrowRight className='ml-2' />}>
              Submit Article
            </Button>
          </div>
        </form>
      </CardBody>
      <Toaster position='bottom-right' />
    </Card>
  );
}
