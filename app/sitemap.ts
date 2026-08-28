import type { MetadataRoute } from 'next';

const routes = ['', '/learn', '/search', '/authorities', '/commissions', '/request', '/status', '/appeal', '/history', '/payments', '/faq', '/contact', '/guide', '/process', '/policies', '/compare'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `https://rti-gov.vercel.app${route}`,
    lastModified: new Date('2026-08-28'),
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : ['/request', '/status', '/appeal'].includes(route) ? 0.9 : 0.7,
  }));
}
