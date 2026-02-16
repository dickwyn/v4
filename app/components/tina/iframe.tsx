export interface IframeProps {
  src: string;
  title?: string;
  height?: number;
  allowFullscreen?: boolean;
  className?: string;
}

export const Iframe = ({
  src,
  title = 'Embedded content',
  height = 400,
  allowFullscreen = true,
  className,
}: IframeProps) => {
  if (!src) return <p>No src provided</p>;

  return (
    <div className={className}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        style={{ width: '100%', height, border: 0 }}
        {...(allowFullscreen ? { allowFullScreen: true } : {})}
      />
    </div>
  );
};
