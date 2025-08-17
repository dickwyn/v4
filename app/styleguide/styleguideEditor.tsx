"use client";

import React from 'react';
import { useTina, tinaField } from 'tinacms/dist/react';
import { StaticTinaMarkdown } from 'tinacms/dist/rich-text/static';
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text/static';
import { YouTube } from 'app/components/tina/youtube';
import { Iframe } from 'app/components/tina/iframe';
import { Tweet } from 'app/components/tina/tweet';
import { Figure } from 'app/components/tina/figure';

interface StyleguideEditorProps {
  query: string;
  variables: Record<string, unknown>;
  data: any;
}

export const StyleguideEditor = ({ query, variables, data }: StyleguideEditorProps) => {
  const { data: tinaData } = useTina({ query, variables, data });
  const doc = (tinaData as any)?.styleguide;

  if (!doc) return <p>Failed to load styleguide.</p>;

  return (
    <div>
      {doc.title ? (
        <h1 className="title font-semibold text-2xl tracking-tighter" data-tina-field={tinaField(doc, 'title')}>
          {doc.title}
        </h1>
      ) : null}
      <article className="blog" data-tina-field={tinaField(doc, 'body')}>
        {doc.body ? (
          <StaticTinaMarkdown
            content={doc.body as TinaMarkdownContent | TinaMarkdownContent[]}
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
};
