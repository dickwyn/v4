'use client';

import { useEffect } from 'react';

import packageJson from '../../package.json';

export function SiteInfo() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log(
        `%cDickwyn Yong's Portfolio v${packageJson.version}
      
Looking for something?
      
👨‍💻 https://www.github.com/dickwyn
📄 https://dickwyn.xyz/dickwyn-resume.pdf
🐛 https://dickwyn.xyz/debug

built: ${process.env.BUILD_TIMESTAMP}`,
        'font-family:monospace;'
      );
    }
  }, []);

  return null;
}
