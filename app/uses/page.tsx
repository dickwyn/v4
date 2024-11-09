import { permanentRedirect } from 'next/navigation';

export default async function Uses() {
  permanentRedirect('/things');
}
