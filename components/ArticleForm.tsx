// components/ArticleForm.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';
import { Avatar, DatePicker } from '@nextui-org/react';
import TinyMCE from './TinyCE';
import Loading from './ui/Loading';
import { useRouter } from 'next/navigation';
import { CldImage, CldUploadWidget } from 'next-cloudinary';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { uploadToCloudinary } from '@/config/cloudinaryUploader';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface ArticleFormData {
  title: string;
  category: string;
  text: string;
  publishedDate: string;
  status: string;
  excerpt: string;
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
  const router = useRouter();
  const [text, setTextContent] = useState<string>('');
  const [featuredImage, setFeaturedImage] = useState<string>('');
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
      text: text,
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
    // Add the text content to the data object
    const fullData = {
      ...data,
      text,
      featuredImage,
    };

    try {
      const response = await axios.post('/api/articles/createArticle/', {
        ...fullData,
        author: {
          name: fullData.authorName,
          email: fullData.authorEmail,
          avatar: fullData.authorAvatar,
        },
      });

      toast.success('Article created successfully!');
      window.location.href = '/news';
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { code, error: errorMessage } = error.response.data;

        if (code === 'P2002') {
          toast.error(errorMessage || 'Article already exists.');
        } else {
          toast.error(
            errorMessage || 'Failed to create article. Please try again.'
          );
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }

      console.error('Error creating article:', error);
    }
  };

  if (!user) {
    return <Loading />;
  }

  // console.log('FEATURED IMAGE IS.......: '+ featuredImage);

  return (
    <Card className='w-full max-w-6xl mx-auto'>
      <CardHeader className='flex gap-3 pt-8'>
        <h1 className='text-xl font-bold'>Create Article</h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              {...register('title', { required: true })}
              isRequired
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
          <div className='grid grid-cols-1'>
            <Input
              {...register('excerpt', { required: true })}
              isInvalid={errors.excerpt ? true : false}
              color={errors.excerpt ? 'warning' : 'default'}
              isRequired
              type='text'
              label='News Article Excerpt'
              className='max-w-full '
            />
          </div>
          <div>
            <div>
              Featured Image:
              <FilePond
                acceptedFileTypes={['image/*']}
                allowMultiple={false}
                name='featuredImage'
                labelIdle='Drag & Drop your featured image or <span class="filepond--label-action">Browse</span>'
                server={{
                  process: async (
                    fieldName,
                    file,
                    metadata,
                    load,
                    error,
                    progress
                  ) => {
                    try {
                      const fileArrayBuffer = await file.arrayBuffer(); // Convert the promise to a resolved ArrayBuffer
                      const fileObject = new File(
                        [fileArrayBuffer],
                        file.name,
                        { type: file.type }
                      );
                      const secureUrl = await uploadToCloudinary(
                        fileObject,
                        'astartrade'
                      ); // Replace with your upload preset.
                      setFeaturedImage(secureUrl); // Store the uploaded image URL.
                      load(secureUrl); // Notify FilePond of the successful upload.
                    } catch (err) {
                      console.error(err);
                      error('Image upload failed');
                    }
                  },
                }}
              />
            </div>
          </div>
          <TinyMCE
            value={text}
            onChange={(content: React.SetStateAction<string>) =>
              setTextContent(content)
            }
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

          {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              {...register('thumbnail')}
              label='Thumbnail URL'
              placeholder='Enter thumbnail URL'
            />
          </div> */}

          <div className='space-y-4 hidden'>
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
