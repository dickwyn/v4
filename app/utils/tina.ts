import type { PostQuery } from 'tina/__generated__/types';

import { client } from '../tinaClient';

type TinaPost = {
  __typename?: string;
  _sys?: unknown;
  body?: unknown;
  date: string;
  description?: string;
  draft?: boolean;
  id: string;
  image?: string;
  slug: string;
  subtitle?: string;
  title: string;
};

type Neighbor = Pick<TinaPost, 'slug' | 'title' | 'date'>;

type TinaPostResponse = { data: { post: TinaPost } };
type TinaPostConnectionResponse = {
  data: { postConnection: { edges: Array<{ node: TinaPost }> } };
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

export const getPost = async (
  slug: string
): Promise<
  | (TinaPost & {
      newerPost: Neighbor | null;
      olderPost: Neighbor | null;
      __tina?: { query: string; variables: Record<string, unknown>; data: PostQuery };
    })
  | null
> => {
  const clientRequestObject = { query: postQuery, variables: { relativePath: `${slug}.mdx` } };
  const response = (await client.request(clientRequestObject, {}).catch(() => null)) as
    | (TinaPostResponse & { query: string; variables: Record<string, unknown> })
    | null;

  const post = response?.data?.post as TinaPost | undefined;
  if (!post) {
    return null;
  }

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
    __tina: response
      ? {
          ...clientRequestObject,
          data: response.data as unknown as PostQuery,
        }
      : undefined,
  };
};

export const getPostList = async (): Promise<TinaPost[]> => {
  const postList = (await client.request(
    { query: postListQuery, variables: {} },
    {}
  )) as TinaPostConnectionResponse;

  return (postList?.data?.postConnection?.edges ?? [])
    .map((edge) => ({ ...edge.node }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
