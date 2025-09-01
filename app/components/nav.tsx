'use client';

import usePrefersColorScheme from 'app/hooks/usePrefersColorScheme';
import Image from 'next/image';
import Link from 'next/link';

const navItems = ['blog', 'things'];
export function Navbar() {
  const colorScheme = usePrefersColorScheme();

  return (
    <aside className="-ml-[8px] mb-8 text-lg">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            <Link
              href="/"
              className="home flex items-center py-1 px-2 m-1 rounded-md transition-all duration-300 hover:[background-color:var(--color-brand-hover)] hover:shadow-sm"
            >
              <Image
                src={`/images/brand/logo-${colorScheme}.svg`}
                alt="dickwyn's icon"
                width={54.4}
                height={12}
              />
            </Link>
            {navItems.map((navItem) => {
              return (
                <Link
                  key={navItem}
                  href={`/${navItem}`}
                  className="transition-all flex align-middle relative py-1 px-2 m-1"
                >
                  {navItem}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
