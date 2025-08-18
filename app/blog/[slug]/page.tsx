import { baseUrl } from 'app/sitemap';
import { getPost, getPostList } from 'app/utils/tina';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import { PostEditor } from '../postEditor';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateStaticParams = async () => {
  const postList = await getPostList();

  return postList.map((post) => ({
    slug: post.slug,
  }));
};

export const generateMetadata = async (
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: post.image,
          width: 800,
          height: 600,
        },
      ],
    },
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        datePublished: post.date,
        dateModified: post.date,
        description: post.description,
        image: post.image
          ? `${baseUrl}${post.image}`
          : `/og?title=${encodeURIComponent(post.title)}`,
        url: `${baseUrl}/blog/${post.slug}`,
        author: {
          '@type': 'Person',
          name: 'My Portfolio',
        },
      }),
    },
  };
};

const BlogPage = async ({ params }: Props) => {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      {post.__tina?.data ? (
        <PostEditor
          query={post.__tina.query}
          variables={post.__tina.variables}
          data={post.__tina.data}
        />
      ) : (
        <p>
          Failed to load post data. The post may have been deleted, moved, or there was a network
          error. Please try again later.
        </p>
      )}
    </section>
  );
};

export default BlogPage;
