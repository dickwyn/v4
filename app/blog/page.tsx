import Link from 'next/link';

import { formatDate } from '../utils/client';
import { getPostList } from '../utils/tina';

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
};

const Blog = async () => {
  const postList = await getPostList();

  return (
    <section className="grid gap-8">
      {postList
        .filter((post) => !post.draft)
        .sort((a, b) => {
          if (new Date(a.date) > new Date(b.date)) {
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
                {formatDate(post.date, false)}
              </p>
              <h2 className="my-2 text-xl text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.title}
              </h2>
              {post?.subtitle && (
                <h3 className="text-base italic text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {post.subtitle}
                </h3>
              )}
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
    </section>
  );
};

export default Blog;
