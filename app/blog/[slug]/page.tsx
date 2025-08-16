import { getBlogPosts } from 'app/utils/utils';
import { baseUrl } from 'app/sitemap';
import { notFound } from 'next/navigation';
import { PostEditor } from '../postEditor';
import { fetchPostForEditing } from '../../utils/tina';

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const { title, date: publishedTime, summary, description, image } = post.metadata;
  const postDescription = summary || description;
  const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description: postDescription,
    openGraph: {
      title,
      description: postDescription,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: postDescription,
      images: [ogImage],
    },
  };
}

export default async function Blog(props) {
  const params = await props.params;
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const tinaInitial = await fetchPostForEditing(`${post.slug}.mdx`).catch(() => null);

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.date,
            dateModified: post.metadata.date,
            description: post.metadata.summary || post.metadata.description,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      {tinaInitial?.data ? (
        <PostEditor
          query={tinaInitial.query}
          variables={{ relativePath: `${post.slug}.mdx` }}
          data={tinaInitial.data}
        />
      ) : (
        <p>Failed to load post data. The post may have been deleted, moved, or there was a network error. Please try again later.</p>
      )}
    </section>
  );
}
