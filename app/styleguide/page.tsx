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

  const { __tina } = post;

  return (
    <section>
      {__tina?.data ? (
        <PostEditor query={__tina.query} variables={__tina.variables} data={__tina.data} />
      ) : (
        <p>
          Failed to load post data. The post may have been deleted, moved, or there was a network
          error. Please try again later.
        </p>
      )}
    </section>
  );
};

export default StyleGuide;
