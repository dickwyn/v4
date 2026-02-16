/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    BUILD_TIMESTAMP: new Date().toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    }),
  },
};

export default nextConfig;
