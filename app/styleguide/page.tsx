import { PostEditor } from 'app/blog/[slug]/postEditor';
import { getPost } from 'app/utils/tina';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Style Guide',
  description: 'Visual reference for blog typography and embedded components.',
};

const StyleGuide = async () => {
  const post = await getPost('styleguide');

  if (!post) {
    notFound();
  }

  const {
    __tina: { query, variables, data },
  } = post;

  return (
    <section>
      <PostEditor query={query} variables={variables} data={data} />
    </section>
  );
};

export default StyleGuide;
