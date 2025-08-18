import { client } from '../tinaClient';

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

const postQuery = `
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

export const getPost = async (slug: string) => {
  const clientRequestObject = { query: postQuery, variables: { relativePath: `${slug}.mdx` } };
  const response = await client.request(clientRequestObject, {}).catch(() => null);

  const post = response?.data?.post;
  if (!post) {
    return null;
  }

  return {
    ...post,
    __tina: response
      ? {
          ...clientRequestObject,
          data: response.data,
        }
      : undefined,
  };
};

export const getPostList = async () => {
  const posts = await client.request({ query: postListQuery, variables: {} }, {});

  return posts.data.postConnection.edges.map((edge) => {
    return {
      ...edge.node,
    };
  });
};
