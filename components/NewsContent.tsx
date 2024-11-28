'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';

import BlogCard from '@/components/ui/BlogCard';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NewsContent({
  initialArticles,
}: {
  initialArticles: any[];
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: articles, error } = useSWR('/api/articles', fetcher, {
    fallbackData: initialArticles,
    refreshInterval: 60000, // Refresh every minute
  });

  if (error) return <p>Error loading articles.</p>;
  if (!mounted) return null;

  return (
    <div className='container mx-auto bg-white text-foreground p-4 md:p-8'>
      {articles && articles.length > 0 ? (
        <ul className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
          {articles.map((article: any) => (
            <li key={article.id}>
              <BlogCard
                author='By Astar Team'
                description={
                  <div dangerouslySetInnerHTML={{ __html: article.text }} />
                }
                imageAlt='Intra-African Trade'
                imageSrc={'https://fakeimg.pl/600x400'}
                title={article.title}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-center text-gray-600 dark:text-neutral-400'>
          No articles available at the moment. Please check back later.
        </p>
      )}
    </div>
  );
}
