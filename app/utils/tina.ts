import { client } from '../tinaClient';

export const postQuery = `
	query post($relativePath: String!) {
		post(relativePath: $relativePath) {
			__typename
			title
			date
			description
			slug
			draft
			body
			_sys { filename basename hasReferences breadcrumbs path relativePath extension }
			id
		}
	}
`;

export const fetchPostForEditing = async (relativePath: string) => {
  return client.request({ query: postQuery, variables: { relativePath } }, {});
};
