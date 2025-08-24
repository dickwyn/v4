import type { PostQuery } from 'tina/__generated__/types';

import { client } from '../tinaClient';

type Post = NonNullable<PostQuery['post']>;

type Neighbor = Pick<Post, 'slug' | 'title' | 'date'>;

type PostWithNeighbors = Post & {
  newerPost: Neighbor | null;
  olderPost: Neighbor | null;
  __tina: { query: string; variables: { relativePath: string }; data: PostQuery };
};

type PostListResponse = {
  data: { postConnection: { edges: Array<{ node: Post }> } };
};

const POST_FIELDS = `
	__typename
	_sys { basename breadcrumbs extension filename hasReferences path relativePath }
	body
	date
	description
	draft
	id
	image
	slug
	subtitle
	title
`;

export const postQuery = `
	query post($relativePath: String!) {
		post(relativePath: $relativePath) {
			${POST_FIELDS}
		}
	}
`;

const postListQuery = `
	query posts {
		postConnection {
			edges {
				node {
					${POST_FIELDS}
				}
			}
		}
	}
`;

export const getPost = async (slug: string): Promise<PostWithNeighbors | null> => {
  const clientRequestObject = { query: postQuery, variables: { relativePath: `${slug}.mdx` } };
  const response = (await client.request(clientRequestObject, {}).catch(() => null)) as {
    data: PostQuery;
  } | null;

  if (!response) {
    return null;
  }

  const post = response.data.post;

  let newerPost: Neighbor | null = null;
  let olderPost: Neighbor | null = null;

  try {
    const sorted = (await getPostList()).filter((p) => !p.draft);
    const idx = sorted.findIndex((p) => p.slug === post.slug);
    if (idx > 0) {
      newerPost = {
        slug: sorted[idx - 1].slug,
        title: sorted[idx - 1].title,
        date: sorted[idx - 1].date,
      };
    }
    if (idx >= 0 && idx < sorted.length - 1) {
      olderPost = {
        slug: sorted[idx + 1].slug,
        title: sorted[idx + 1].title,
        date: sorted[idx + 1].date,
      };
    }
  } catch {
    /* empty */
  }

  return {
    ...post,
    newerPost,
    olderPost,
    __tina: {
      query: clientRequestObject.query,
      variables: clientRequestObject.variables,
      data: response.data,
    },
  };
};

export const getPostList = async (): Promise<Post[]> => {
  const postList = (await client.request(
    { query: postListQuery, variables: {} },
    {}
  )) as PostListResponse;

  return (postList?.data?.postConnection?.edges ?? [])
    .map((edge) => ({ ...edge.node }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
