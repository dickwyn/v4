import { baseUrl } from 'app/sitemap';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostEditor } from '../blog/postEditor';
import { getStyleguide } from '../utils/tina';

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
  const { doc, rawDoc } = await getStyleguide('styleguide');

  if (!doc || !rawDoc?.data) {
    notFound();
  }

  return (
    <section>
      <PostEditor
        query={rawDoc.query}
        variables={{ relativePath: `styleguide.mdx` }}
        data={rawDoc.data}
        docKey="styleguide"
      />
    </section>
  );
}
