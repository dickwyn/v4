import { baseUrl } from 'app/sitemap';
import { getPost, getPostList } from 'app/utils/tina';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PostEditor } from './postEditor';

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

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
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
          url: post.image
            ? post.image.startsWith('http')
              ? post.image
              : `${baseUrl}${post.image}`
            : `${baseUrl}/og?title=${encodeURIComponent(post.title)}`,
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

  const { __tina, newerPost, olderPost } = post;

  return (
    <section>
      {__tina?.data ? (
        <PostEditor query={__tina.query} variables={__tina.variables} data={__tina.data} />
      ) : (
        <p>
          Failed to load post data. The post may have been deleted, moved, or there was a network
          error. Please try again later.
        </p>
      )}
      {(newerPost || olderPost) && (
        <nav className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 gap-4">
          <div>
            {newerPost && (
              <Link href={`/blog/${newerPost.slug}`} className="group block">
                <span className="block text-xs uppercase tracking-wide text-neutral-500">
                  Newer
                </span>
                <span className="block font-medium group-hover:underline text-neutral-900 dark:text-neutral-100">
                  {newerPost.title}
                </span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {olderPost && (
              <Link href={`/blog/${olderPost.slug}`} className="group inline-block">
                <span className="block text-xs uppercase tracking-wide text-neutral-500">
                  Older
                </span>
                <span className="block font-medium group-hover:underline text-neutral-900 dark:text-neutral-100">
                  {olderPost.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </section>
  );
};

export default BlogPage;
