import { NextRequest, NextResponse } from 'next/server';
import { sanitizeImageUrl } from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

export async function GET(_req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'museums.json');
    if (!fs.existsSync(filePath)) {
      throw new Error('Mock data museums.json not found');
    }
    
    const fileData = fs.readFileSync(filePath, 'utf8');
    const museumsData = JSON.parse(fileData);

    const museums = museumsData.map((m: any) => ({
      id: m.id,
      title: m.title,
      extract: m.description || m.extract || '',
      thumbnail: sanitizeImageUrl(m.image || m.thumbnail || null),
      originalimage: sanitizeImageUrl(m.image || m.originalimage || null),
      pageUrl: m.link || m.pageUrl || '',
      category: m.category || 'Gallery',
      bestTime: m.bestTime || '',
      timeRequired: m.timeRequired || '',
      highlights: m.highlights || [],
      entryFee: m.entryFee || '',
      timings: m.timings || '',
      address: m.address || '',
      mapUrl: m.mapUrl || '',
      bulletPoints: m.bulletPoints || [],
    }));

    return NextResponse.json({ museums });
  } catch (error: any) {
    console.error('Failed to fetch museums:', error);
    return NextResponse.json(
      { error: 'Failed to fetch museums', details: error.message },
      { status: 500 }
    );
  }
}
