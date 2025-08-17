export interface TweetProps {
  id: string;
  className?: string;
  theme?: 'light' | 'dark';
  lang?: string;
  height?: number;
}

export const Tweet = (
  { id, className, theme = 'light', lang = 'en', height = 600 }: TweetProps
) => {
  if (!id) return <p>No id provided</p>;

  return (
    <div className={className}>
      <iframe
        src={`https://platform.twitter.com/embed/Tweet.html?id=${encodeURIComponent(
          id
        )}&theme=${theme}&dnt=true&lang=${encodeURIComponent(lang)}`}
        title={`Tweet ${id}`}
        loading="lazy"
        style={{ width: '100%', border: 0, height }}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};
