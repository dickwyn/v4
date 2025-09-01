'use client';

import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

export interface CodeBlockProps {
  value: string;
  lang?: string;
}

export const CodeBlock = ({ value, lang }: CodeBlockProps) => {
  const [highlightedHtml, setHighlightedHtml] = useState<string>('');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const highlightCode = async () => {
      if (!value) {
        return;
      }

      try {
        const html = await codeToHtml(value.trim(), {
          lang: lang || 'text',
          theme: isDark ? 'github-dark' : 'github-light',
        });
        setHighlightedHtml(html);
      } catch (error) {
        console.warn(`Failed to highlight code with language "${lang || 'text'}":`, error);
      }
    };

    highlightCode();
  }, [value, lang, isDark]);

  return (
    <div
      className="shiki-container rounded-lg overflow-x-auto border border-neutral-200 dark:border-neutral-800"
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
    />
  );
};
