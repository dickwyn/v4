import { client } from '../tinaClient';

const postQuery = `
	query post($relativePath: String!) {
		post(relativePath: $relativePath) {
			__typename
			title
			date
			description
			subtitle
			image
			slug
			draft
			body
			_sys { filename basename hasReferences breadcrumbs path relativePath extension }
			id
		}
	}
`;

const postListQuery = `
	query posts {
		postConnection {
			edges {
				node {
					__typename
					title
					date
					description
					subtitle
					image
					slug
					draft
					body
					_sys { filename basename hasReferences breadcrumbs path relativePath extension }
					id
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
