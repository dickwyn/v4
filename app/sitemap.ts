import { getPostList } from './utils/tina';

export const baseUrl = 'https://dickwyn.com';

const sitemap = async () => {
  const postList = (await getPostList()).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  const routes = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...postList];
};

export default sitemap;
