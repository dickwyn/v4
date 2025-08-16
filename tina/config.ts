import { defineConfig } from 'tinacms';

const branch = process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'main';

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: 'post',
        label: 'Posts',
        path: 'content/posts',
        format: 'mdx',
        defaultItem: () => {
          return {
            title: 'New Post',
            date: new Date().toISOString(),
            draft: true,
          };
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Date',
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'slug',
            label: 'Slug',
            required: true,
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Draft',
            description: 'If this is checked the post will not be published',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
        ui: {
          // This is a DEMO router. You can remove this to fit your site
          router: ({ document }) => `/blog/${document._sys.filename}`,
        },
      },
    ],
  },
});
