import { formatDate, getBlogPosts } from 'app/blog/utils';
import { CustomMDX } from 'app/components/mdx';
import { baseUrl } from 'app/sitemap';
import { notFound } from 'next/navigation';
import { PostEditor } from '../PostEditor';
import { fetchPostForEditing } from '../tina-utils';

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
  const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title as string)}`;

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
        <>
          <div className="flex justify-between items-center my-2 text-sm">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {formatDate(post.metadata.date)}
            </p>
          </div>
          <h1 className="title font-semibold text-2xl tracking-tighter">{post.metadata.title}</h1>
          <article className="blog">
            <CustomMDX source={post.content} />
          </article>
        </>
      )}
    </section>
  );
}
