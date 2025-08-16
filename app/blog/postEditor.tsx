"use client";

import React from 'react';
import { useTina, tinaField } from 'tinacms/dist/react';
import { StaticTinaMarkdown } from 'tinacms/dist/rich-text/static';
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text/static';
import type { PostQuery } from '../../tina/__generated__/types';
import { formatDate } from './clientUtils';
import { YouTube } from 'app/components/tina/youtube';
import { Iframe } from 'app/components/tina/iframe';
import { Tweet } from 'app/components/tina/tweet';
import { Figure } from 'app/components/tina/figure';

interface PostEditorProps {
  query: string;
  variables: Record<string, unknown>;
  data: PostQuery;
}

export const PostEditor = ({ query, variables, data }: PostEditorProps) => {
  const { data: tinaData } = useTina<PostQuery>({ query, variables, data });
  const post = tinaData?.post;

  return (
    <div>
      <div className="flex justify-between items-center my-2 text-sm">
        <p
          className="text-sm text-neutral-600 dark:text-neutral-400"
          data-tina-field={tinaField(post, 'date')}
        >
          {formatDate(post.date)}
        </p>
      </div>
      <h1
        className="title font-semibold text-2xl tracking-tighter"
        data-tina-field={tinaField(post, 'title')}
      >
        {post.title}
      </h1>
      <article className="blog" data-tina-field={tinaField(post, 'body')}>
        {post.body ? (
          <StaticTinaMarkdown
            content={post.body as TinaMarkdownContent | TinaMarkdownContent[]}
            components={{
              YouTube: (props: unknown) => (
                <YouTube {...(props as React.ComponentProps<typeof YouTube>)} className="my-6" />
              ),
              Iframe: (props: unknown) => (
                <Iframe {...(props as React.ComponentProps<typeof Iframe>)} className="my-6" />
              ),
              Tweet: (props: unknown) => (
                <Tweet {...(props as React.ComponentProps<typeof Tweet>)} className="my-6" />
              ),
              Figure: (props: unknown) => (
                <Figure {...(props as React.ComponentProps<typeof Figure>)} className="my-6" />
              ),
            }}
          />
        ) : null}
      </article>
    </div>
  );
}
