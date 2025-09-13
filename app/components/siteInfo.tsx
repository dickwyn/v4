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
📄 https://dickwyn.com/dickwyn-resume.pdf
🐛 https://dickwyn.com/debug
💅 https://dickwyn.com/styleguide

built: ${process.env.BUILD_TIMESTAMP}`,
        'font-family:monospace;'
      );
    }
  }, []);

  return null;
}
