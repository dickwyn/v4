import { formatDate, getBlogPosts } from 'app/blog/utils';
import Link from 'next/link';

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  return (
    <div className="grid gap-8">
      {allBlogs
        .sort((a, b) => {
          if (new Date(a.metadata.date) > new Date(b.metadata.date)) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-link hover:border-solid border-2 border-transparent rounded-lg"
          >
            <div className="">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDate(post.metadata.date, false)}
              </p>
              <h2 className="my-2 text-xl text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </h2>
              {post.metadata?.subtitle && (
                <h3 className="text-base italic text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {post.metadata.subtitle}
                </h3>
              )}
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.summary}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
