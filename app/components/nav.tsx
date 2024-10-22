'use client';

import usePrefersColorScheme from 'app/hooks/usePrefersColorScheme';
import Image from 'next/image';
import Link from 'next/link';

const navItems = {
  '/blog': {
    name: 'blog',
  },
  '/things': {
    name: 'things',
  },
  '/uses': {
    name: 'gear',
  },
};

export function Navbar() {
  const colorScheme = usePrefersColorScheme();

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            <Link href="/" className="home flex items-center py-1 px-2 m-1">
              <Image
                src={`/images/brand/logo-${colorScheme}.svg`}
                alt="dickwyn's icon"
                width={54.4}
                height={12}
              />
            </Link>
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
