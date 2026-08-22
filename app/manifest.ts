import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RTI.gov — Right to Information',
    short_name: 'RTI.gov',
    description: 'Learn, search, file, track and appeal through a citizen-first RTI service concept.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f3ed',
    theme_color: '#0b2f52',
  };
}
