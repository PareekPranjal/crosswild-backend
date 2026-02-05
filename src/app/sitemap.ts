import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thecrosswild.com';

  const routes = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/blog-details',
    '/blog-sidebar',
    '/image-gallery',
    '/our_process',
    '/t-shirt_manufacturing',
    '/sweatshirt_manufacturing',
    '/bag_manufacturing',
    '/cap_manufacturing',
    '/mug_manufacturing',
    '/digital_printing',
    '/face_masks_ppe_kits',
    '/sanitizer_infrared_thermometer',
    '/school_uniform',
    '/staff_uniform',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
