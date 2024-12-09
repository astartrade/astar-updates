import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
import { Prisma } from '@prisma/client';

export type Author = {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  text: string;
  excerpt?: string;
  featuredImage?: string;
  views?: number;
  publishedDate: Date;
  status: string;
  thumbnail?: string | null;
  authorId: string;
  author: Author;
};

export type CreateArticleRequest = Omit<Prisma.ArticleCreateInput, 'author'> & {
  author: {
    email: string;
    name: string;
    avatar?: string;
  };
};

export type CreateArticleResponse = Article;

export type GetArticlesResponse = {
  articles: Article[];
};

