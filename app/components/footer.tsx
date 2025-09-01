import { Linkedin } from 'lucide-react';
import { siGithub, siInstagram, siThreads, siYoutube } from 'simple-icons';

const links = [
  {
    href: 'https://www.threads.com/@dickwyn',
    label: 'threads',
    icon: siThreads,
    hoverColor: 'group-hover:text-black dark:group-hover:text-white',
  },
  {
    href: 'https://instagram.com/dickwyn',
    label: 'instagram',
    icon: siInstagram,
    hoverColor: 'group-hover:text-pink-500',
  },
  {
    href: 'https://youtube.com/dickwyn',
    label: 'youtube',
    icon: siYoutube,
    hoverColor: 'group-hover:text-red-600',
  },
  {
    href: 'https://www.linkedin.com/in/dickwyn',
    label: 'linkedin',
    icon: null, // TODO replace when simple icons adds a linkedin icon
    hoverColor: 'group-hover:text-blue-600',
  },
  {
    href: 'https://github.com/dickwyn',
    label: 'github',
    icon: siGithub,
    hoverColor: 'group-hover:text-gray-800 dark:group-hover:text-gray-200',
  },
];

export default function Footer() {
  return (
    <footer className="mb-16">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        {links.map((link, index) => (
          <li key={index}>
            <a
              className="group flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href={link.href}
            >
              <div className={`mr-2 h-4 w-4 flex-shrink-0 transition-colors ${link.hoverColor}`}>
                {link.label === 'linkedin' ? (
                  <Linkedin size={16} />
                ) : link.icon ? (
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <title>{link.icon.title}</title>
                    <path d={link.icon.path} />
                  </svg>
                ) : null}
              </div>
              <p className="h-8 flex items-center">{link.label}</p>
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
