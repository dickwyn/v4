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
  const posts = await getPostList();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return { post: null, rawPost: null };
  }

  const rawPost = await client
    .request({ query: postQuery, variables: { relativePath: `${post.slug}.mdx` } }, {})
    .catch(() => null);

  return { post,  rawPost };
};

export const getPostList = async () => {
  const posts = await client.request({ query: postListQuery, variables: {} }, {});
  return posts.data.postConnection.edges.map((edge) => {
    return {
      ...edge.node,
      metadata: {
        title: edge.node.title,
        date: edge.node.date,
        description: edge.node.description,
        subtitle: edge.node.subtitle,
        image: edge.node.image,
        draft: edge.node.draft,
      },
    };
  });
};
