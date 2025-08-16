export interface YouTubeProps {
  id?: string;
  title?: string;
  start?: number;
  className?: string;
}

export const YouTube = ({ id, title = 'YouTube video', start, className }: YouTubeProps) => {
  if (!id) return <p>No id provided</p>;

  return (
    <div className={className} style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
      <iframe
        src={`https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ''}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
      />
    </div>
  );
};
