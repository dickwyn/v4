import { PostEditor } from 'app/blog/[slug]/postEditor';
import { client } from 'app/tinaClient';
import { postQuery } from 'app/utils/tina';

export const metadata = {
  title: 'Style Guide',
  description: 'Visual reference for blog typography and embedded components.',
};

const StyleGuide = async () => {
  const variables = { relativePath: 'styleguide.mdx' } as const;
  const raw = await client.request({ query: postQuery, variables }, {}).catch(() => null);

  return (
    <section>
      <PostEditor
        query={postQuery}
        variables={variables as unknown as Record<string, unknown>}
        data={raw?.data}
      />
    </section>
  );
};

export default StyleGuide;
