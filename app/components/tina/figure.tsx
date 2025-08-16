export interface FigureProps {
  src: string;
  alt?: string;
  caption?: string;
  className?: string;
}

export const Figure = ({ src, alt, caption, className }: FigureProps) => {
  if (!src) return <p>No src provided</p>;

  return (
    <figure className={className}>
      <img src={src} alt={alt} loading="lazy" className="rounded-lg" />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
};
