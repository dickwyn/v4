"use client";

import React from 'react';
import { useTina, tinaField } from 'tinacms/dist/react';
import { StaticTinaMarkdown } from 'tinacms/dist/rich-text/static';

interface PostEditorProps {
  query: string;
  variables: Record<string, unknown>;
  data: any;
};

export const PostEditor = ({ query, variables, data }: PostEditorProps) => {
  const { data: tinaData } = useTina({ query, variables, data });
  const post = (tinaData as any)?.post;

  return (
    <div>
      <div className="flex justify-between items-center my-2 text-sm">
        <p
          className="text-sm text-neutral-600 dark:text-neutral-400"
          data-tina-field={tinaField(post, 'date')}
        >
          {post?.date}
        </p>
      </div>
      <h1
        className="title font-semibold text-2xl tracking-tighter"
        data-tina-field={tinaField(post, 'title')}
      >
        {post?.title}
      </h1>
      <article className="blog" data-tina-field={tinaField(post, 'body')}>
        {post?.body ? <StaticTinaMarkdown content={post.body} /> : null}
      </article>
    </div>
  );
}
