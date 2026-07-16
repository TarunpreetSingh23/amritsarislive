import { MetadataRoute } from 'next';
import monumentsData from '../monuments.json';
import museumsData from '../museums.json';
import foodData from '../food.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://amritsarislive.com';

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/itinerary`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  const monumentPages = monumentsData.map((m: any) => ({
    url: `${baseUrl}/monuments/${m.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const museumPages = museumsData.map((m: any) => ({
    url: `${baseUrl}/museums/${m.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const foodPages = foodData.map((f: any) => ({
    url: `${baseUrl}/food/${f.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...monumentPages, ...museumPages, ...foodPages];
}
