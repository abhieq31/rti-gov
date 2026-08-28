import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/login'] },
    sitemap: 'https://rti-gov-india.abhipatel33360.chatgpt.site/sitemap.xml',
  };
}
