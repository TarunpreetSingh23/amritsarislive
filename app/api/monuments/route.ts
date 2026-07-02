import { NextRequest, NextResponse } from 'next/server';

const MONUMENTS = [
  'Harmandir_Sahib',
  'Jallianwala_Bagh',
  'Durgiana_Temple',
  'Gobindgarh_Fort',
  'Ram_Bagh,_Amritsar',
  'Wagah',
  'Akal_Takht',
  'Mata_Lal_Devi_Temple',
  'Ram_Tirth',
];

// Pre-compiled high-quality static fallback data for zero-latency initial load and offline resiliency.
const STATIC_FALLBACK_MONUMENTS = [
  {
    id: 'Harmandir_Sahib',
    title: 'Harmandir Sahib',
    extract: 'The Harmandir Sahib, also known as the Golden Temple, is a Gurdwara located in the city of Amritsar, Punjab, India. It is the preeminent spiritual site of Sikhism, famous for its magnificent gold-plated dome and surrounding holy pool (Sarovar).',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Golden_Temple_India_HDR_crop.jpg/800px-Golden_Temple_India_HDR_crop.jpg',
    originalimage: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Golden_Temple_India_HDR_crop.jpg',
    pageUrl: 'https://en.wikipedia.org/wiki/Harmandir_Sahib',
    coordinates: { lat: 31.61998, lon: 74.876485 }
  },
  {
    id: 'Jallianwala_Bagh',
    title: 'Jallianwala Bagh',
    extract: 'Jallianwala Bagh is a historic garden and memorial of national importance in Amritsar, India, preserved in memory of those wounded and killed in the Jallianwala Bagh Massacre that occurred on the festival of Baisakhi, 13 April 1919.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Jallianwala_Bagh_memorial_lane.jpg/800px-Jallianwala_Bagh_memorial_lane.jpg',
    originalimage: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Jallianwala_Bagh_memorial_lane.jpg',
    pageUrl: 'https://en.wikipedia.org/wiki/Jallianwala_Bagh',
    coordinates: { lat: 31.6205, lon: 74.8797 }
  },
  {
    id: 'Durgiana_Temple',
    title: 'Durgiana Temple',
    extract: 'The Durgiana Temple, also known as Lakshmi Narayan Temple, Durga Tirath and Sitla Mandir, is a premier Hindu temple situated in the city of Amritsar, Punjab, India. It architecturally resembles the Golden Temple and is dedicated to Goddess Durga.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Durgianatempl.jpg/800px-Durgianatempl.jpg',
    originalimage: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Durgianatempl.jpg',
    pageUrl: 'https://en.wikipedia.org/wiki/Durgiana_Temple',
    coordinates: { lat: 31.6318, lon: 74.8693 }
  },
  {
    id: 'Gobindgarh_Fort',
    title: 'Gobindgarh Fort',
    extract: 'Gobindgarh Fort is a historic military fort located in the center of the city of Amritsar, Punjab, India. Established in the 18th century, it was renovated by Maharaja Ranjit Singh and has now been opened to the public as a cultural museum.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Entrance_to_Gobindgarh_Fort.jpg/800px-Entrance_to_Gobindgarh_Fort.jpg',
    originalimage: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Entrance_to_Gobindgarh_Fort.jpg',
    pageUrl: 'https://en.wikipedia.org/wiki/Gobindgarh_Fort',
    coordinates: { lat: 31.6288, lon: 74.8643 }
  },
  {
    id: 'Ram_Bagh,_Amritsar',
    title: 'Ram Bagh, Amritsar',
    extract: 'Ram Bagh, also known as Maharaja Ranjit Singh Garden, is a historical palace garden in Amritsar. It housed the summer palace of Maharaja Ranjit Singh, the founder of the Sikh Empire, and is now a beautifully landscaped public park and museum.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Maharaja_Ranjit_Singh_Panorama%2C_Amritsar_01.jpg/800px-Maharaja_Ranjit_Singh_Panorama%2C_Amritsar_01.jpg',
    originalimage: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Maharaja_Ranjit_Singh_Panorama%2C_Amritsar_01.jpg',
    pageUrl: 'https://en.wikipedia.org/wiki/Ram_Bagh,_Amritsar',
    coordinates: { lat: 31.6385, lon: 74.8812 }
  },
  {
    id: 'Wagah',
    title: 'Wagah',
    extract: 'Wagah is a village and border crossing station between Pakistan and India, famous for its daily Wagah border ceremony. Tourists gather here from all over the world to witness the spirited flag-lowering ceremony by both nations\' forces.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Wagah_border_ceremony_2017.jpg/800px-Wagah_border_ceremony_2017.jpg',
    originalimage: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Wagah_border_ceremony_2017.jpg',
    pageUrl: 'https://en.wikipedia.org/wiki/Wagah',
    coordinates: { lat: 31.6047, lon: 74.5739 }
  },
  {
    id: 'Akal_Takht',
    title: 'Akal Takht',
    extract: 'The Akal Takht, meaning "Throne of the Timeless One," is one of five takhts (seats of power) of the Sikh religion. It is located in the Harmandir Sahib (Golden Temple) complex in Amritsar, serving as the highest seat of temporal authority.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Akal_Takht_Amritsar.jpg/800px-Akal_Takht_Amritsar.jpg',
    originalimage: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Akal_Takht_Amritsar.jpg',
    pageUrl: 'https://en.wikipedia.org/wiki/Akal_Takht',
    coordinates: { lat: 31.6200, lon: 74.8761 }
  },
  {
    id: 'Mata_Lal_Devi_Temple',
    title: 'Mata Lal Devi Temple',
    extract: 'Mata Lal Devi Temple is a highly unique and popular Hindu shrine in Amritsar. Dedicated to the 20th-century female saint Lal Devi, the temple features a labyrinthine layout, mirrored walls, and cave-like walkways containing various deities.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Sheesh_Mahal%2C_Mata_Lal_Devi_Temple.jpg/800px-Sheesh_Mahal%2C_Mata_Lal_Devi_Temple.jpg',
    originalimage: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Sheesh_Mahal%2C_Mata_Lal_Devi_Temple.jpg',
    pageUrl: 'https://en.wikipedia.org/wiki/Mata_Lal_Devi_Temple',
    coordinates: { lat: 31.6367, lon: 74.8622 }
  },
  {
    id: 'Ram_Tirth',
    title: 'Ram Tirth Temple',
    extract: 'Ram Tirth Temple is an ancient pilgrimage site situated in Amritsar, Punjab, India. The site is the birthplace of Luv and Kush, the sons of Devi Sita and Lord Rama, and contains the ashram of Sage Valmiki, who composed the epic Ramayana here.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Ram_Tirth_Temple_Amritsar.jpg/800px-Ram_Tirth_Temple_Amritsar.jpg',
    originalimage: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Ram_Tirth_Temple_Amritsar.jpg',
    pageUrl: 'https://en.wikipedia.org/wiki/Ram_Tirth',
    coordinates: { lat: 31.6441, lon: 74.7578 }
  }
];

// Memory Cache Store
let cachedMonuments: any[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 Hours

export async function GET(_req: NextRequest) {
  const now = Date.now();

  // If cache is valid, return cached monuments instantly
  if (cachedMonuments && (now - lastCacheTime < CACHE_TTL)) {
    return NextResponse.json({ monuments: cachedMonuments, source: 'cache' });
  }

  try {
    const results = await Promise.allSettled(
      MONUMENTS.map(async (slug) => {
        const fallback = STATIC_FALLBACK_MONUMENTS.find((m) => m.id === slug);
        try {
          const res = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`,
            { 
              headers: { 'User-Agent': 'AmritsarIsLive/1.0 (info@amritsarislive.com)' },
              next: { revalidate: 86400 } // Fetch cache helper
            }
          );
          if (!res.ok) throw new Error(`Failed for ${slug}`);
          const data = await res.json();
          return {
            id: slug,
            title: data.displaytitle || data.title,
            extract: data.extract || fallback?.extract,
            thumbnail: data.thumbnail?.source || fallback?.thumbnail || null,
            originalimage: data.originalimage?.source || fallback?.originalimage || null,
            pageUrl: data.content_urls?.desktop?.page || fallback?.pageUrl || `https://en.wikipedia.org/wiki/${slug}`,
            coordinates: data.coordinates || fallback?.coordinates || null,
          };
        } catch (e) {
          console.warn(`Fetch failed for ${slug}, using fallback`, e);
          if (!fallback) throw e;
          return fallback;
        }
      })
    );

    const monuments = results
      .filter((r) => r.status === 'fulfilled')
      .map((r) => (r as PromiseFulfilledResult<any>).value);

    // If we have compiled the list, cache it and return it
    if (monuments.length > 0) {
      cachedMonuments = monuments;
      lastCacheTime = now;
      return NextResponse.json({ monuments, source: 'network' });
    }
  } catch (error) {
    console.error('Monuments API error, using fallbacks:', error);
  }

  const fallbackData = cachedMonuments || STATIC_FALLBACK_MONUMENTS;
  return NextResponse.json({ monuments: fallbackData, source: 'fallback' });
}

