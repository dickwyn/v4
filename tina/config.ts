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
        path: 'app/blog/posts',
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
            templates: [
              {
                name: 'YouTube',
                label: 'YouTube Embed',
                fields: [
                  {
                    type: 'string',
                    name: 'id',
                    label: 'Video ID',
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'title',
                    label: 'Title',
                    required: false,
                  },
                  {
                    type: 'number',
                    name: 'start',
                    label: 'Start time (seconds)',
                    required: false,
                  },
                  { type: 'string', name: 'className', label: 'Class Name', required: false },
                ],
              },
              {
                name: 'Iframe',
                label: 'Generic Iframe',
                fields: [
                  { type: 'string', name: 'src', label: 'Src URL', required: true },
                  { type: 'string', name: 'title', label: 'Title', required: false },
                  { type: 'number', name: 'height', label: 'Height (px)', required: false },
                  {
                    type: 'boolean',
                    name: 'allowFullscreen',
                    label: 'Allow Fullscreen',
                    required: false,
                  },
                  { type: 'string', name: 'className', label: 'Class Name', required: false },
                ],
              },
              {
                name: 'Tweet',
                label: 'Twitter Embed',
                fields: [
                  {
                    type: 'string',
                    name: 'id',
                    label: 'Tweet ID',
                    required: true,
                  },
                  { type: 'string', name: 'className', label: 'Class Name', required: false },
                  {
                    type: 'string',
                    name: 'theme',
                    label: 'Theme',
                    options: [
                      { value: 'light', label: 'Light' },
                      { value: 'dark', label: 'Dark' },
                    ],
                    required: false,
                  },
                  {
                    type: 'string',
                    name: 'lang',
                    label: 'Language (e.g. en, es)',
                    required: false,
                  },
                  { type: 'number', name: 'height', label: 'Height (px)', required: false },
                ],
              },
              {
                name: 'Figure',
                label: 'Figure',
                fields: [
                  { type: 'string', name: 'src', label: 'Image URL', required: true },
                  { type: 'string', name: 'alt', label: 'Alt text', required: false },
                  { type: 'string', name: 'caption', label: 'Caption', required: false },
                  { type: 'string', name: 'className', label: 'Class Name', required: false },
                ],
              },
            ],
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
