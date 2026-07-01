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
];

export async function GET(_req: NextRequest) {
  try {
    const results = await Promise.allSettled(
      MONUMENTS.map(async (slug) => {
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`,
          { headers: { 'User-Agent': 'AmritsarIsLive/1.0 (info@amritsarislive.com)' } }
        );
        if (!res.ok) throw new Error(`Failed for ${slug}`);
        const data = await res.json();
        return {
          id: slug,
          title: data.displaytitle || data.title,
          extract: data.extract,
          thumbnail: data.thumbnail?.source || null,
          originalimage: data.originalimage?.source || null,
          pageUrl: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${slug}`,
          coordinates: data.coordinates || null,
        };
      })
    );

    const monuments = results
      .filter((r) => r.status === 'fulfilled')
      .map((r) => (r as PromiseFulfilledResult<object>).value);

    return NextResponse.json({ monuments });
  } catch (error) {
    console.error('Monuments API error:', error);
    return NextResponse.json({ monuments: [], error: 'Failed to fetch monuments' }, { status: 500 });
  }
}
