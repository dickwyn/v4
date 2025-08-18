import { PostEditor } from 'app/blog/[slug]/postEditor';
import { client } from 'app/tinaClient';
import { postQuery } from 'app/utils/tina';

export const metadata = {
  title: 'Style Guide',
  description: 'Visual reference for blog typography and embedded components.',
};

const StyleGuide = async () => {
  const variables: Record<string, string> = { relativePath: 'styleguide.mdx' };
  const raw = await client.request({ query: postQuery, variables }, {}).catch(() => null);

  return (
    <section>
      <PostEditor query={postQuery} variables={variables} data={raw?.data} />
    </section>
  );
};

export default StyleGuide;
