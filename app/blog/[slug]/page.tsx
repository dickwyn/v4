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
  const { post } = await getPost(slug);

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
        headline: post.metadata.title,
        datePublished: post.metadata.date,
        dateModified: post.metadata.date,
        description: post.metadata.description,
        image: post.metadata.image
          ? `${baseUrl}${post.metadata.image}`
          : `/og?title=${encodeURIComponent(post.metadata.title)}`,
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
  const { post, rawPost } = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      {rawPost?.data ? (
        <PostEditor
          query={rawPost.query}
          variables={{ relativePath: `${post.slug}.mdx` }}
          data={rawPost.data}
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
