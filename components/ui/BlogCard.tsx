import Image from 'next/image';
import Link from 'next/link';

import { bebas } from '@/config/fonts';

interface BlogCardProps {
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  description: JSX.Element;
  avatarSrc?: string;
  avatarAlt?: string;
  author?: string;
  url?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  imageSrc = 'https://fakeimg.pl/600x400',
  imageAlt = 'Astar news',
  title,
  description,
  avatarSrc = '/images/logo.png',
  avatarAlt = 'Astar Team',
  author = 'By Astar Team',
  url = '#',
}) => {
  return (
    <Link
      className=' group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-2 transition duration-300 hover:border-transparent hover:shadow-lg focus:border-transparent focus:shadow-lg focus:outline-none dark:border-neutral-700 dark:hover:border-transparent dark:hover:shadow-black/40 dark:focus:border-transparent dark:focus:shadow-black/40'
      href={url}>
      <div className='relative aspect-video '>
        <Image
          priority
          fill
          quality={100}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={imageAlt}
          src={imageSrc}
          className='absolute inset-0 z-10 rounded-xl object-cover '
        />
      </div>
      <div className='my-3'>
        <h3
          className={`${bebas.className} text-xl leading-[1.3rem] text-gray-800 dark:text-neutral-300
           dark:group-hover:text-white`}>
          {title}
        </h3>
        <div className='mt-4 text-gray-600 dark:text-neutral-400 text-sm'>
          {description}
        </div>
      </div>
      {/* <div className="mt-auto flex items-center gap-x-3">
        <Image
          alt={avatarAlt}
          className="size-8 rounded-full"
          height={320}
          src={avatarSrc}
          width={320}
        />
        <div>
          <h5 className="text-sm text-gray-800 dark:text-neutral-200">
            {author}
          </h5>
        </div>
      </div> */}
    </Link>
  );
};

export default BlogCard;
