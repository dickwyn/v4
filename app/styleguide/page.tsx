import { PostEditor } from 'app/blog/[slug]/postEditor';
import { getPost } from 'app/utils/tina';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Style Guide',
  description: 'Visual reference for blog typography and embedded components.',
};

const StyleGuide = async () => {
  const post = await getPost('styleguide');

  return (
    <section>
      <PostEditor
        query={post.__tina.query}
        variables={post.__tina.variables}
        data={post.__tina.data}
      />
    </section>
  );
};

export default StyleGuide;
