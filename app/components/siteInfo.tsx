'use client';

import { useEffect } from 'react';

export function SiteInfo() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log(
        `
    %cDick Wyn Yong's Portfolio vAPP_VERSION
      
    Looking for something?
      
    👨‍💻 https://www.github.com/dickwyn
    📄 https://dickwyn.xyz/dickwyn-resume.pdf
    🐛 https://dickwyn.xyz/debug
      
    built: unsetTimestamp`,
        'font-family:monospace;'
      );
    }
  }, []);

  return null;
}
