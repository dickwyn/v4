const links = [
  {
    href: 'https://twitter.com/dickwyn',
    label: 'x (twitter)',
  },
  {
    href: 'https://www.linkedin.com/in/dickwyn',
    label: 'linkedin',
  },
  {
    href: 'https://github.com/dickwyn',
    label: 'github',
  },
];

export default function Footer() {
  return (
    <footer className="mb-16">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        {links.map((link, index) => (
          <li key={index}>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100 hover:underline underline-offset-3"
              rel="noopener noreferrer"
              target="_blank"
              href={link.href}
            >
              <p className="h-8">{link.label}</p>
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
