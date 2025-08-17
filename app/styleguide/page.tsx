import { baseUrl } from 'app/sitemap';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostEditor } from '../blog/postEditor';
import { getPost } from '../utils/tina';

export const metadata: Metadata = {
  title: 'Styleguide',
  description: 'Visual reference of all blog markdown/MDX elements and components.',
  openGraph: {
    title: 'Styleguide',
    description: 'Visual reference of all blog markdown/MDX elements and components.',
    url: `${baseUrl}/styleguide`,
  },
};

export default async function StyleguidePage() {
  const { post, rawPost } = await getPost('styleguide');

  if (!post || !rawPost?.data) {
    notFound();
  }

  return (
    <section>
      <PostEditor
        query={rawPost.query}
        variables={{ relativePath: `${post.slug}.mdx` }}
        data={rawPost.data}
      />
    </section>
  );
}
