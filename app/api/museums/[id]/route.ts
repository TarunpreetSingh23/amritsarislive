import { NextRequest, NextResponse } from 'next/server';
import { sanitizeImageUrl } from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const filePath = path.join(process.cwd(), 'museums.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Mock data museums.json not found' },
        { status: 500 }
      );
    }
    
    const fileData = fs.readFileSync(filePath, 'utf8');
    const museums = JSON.parse(fileData);
    const museumData = museums.find((m: any) => m.id === id);

    if (!museumData) {
      return NextResponse.json(
        { error: 'Museum not found' },
        { status: 404 }
      );
    }

    const m = museumData;
    return NextResponse.json({
      museum: {
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
      },
    });
  } catch (error: any) {
    console.error('Failed to fetch museum:', error);
    return NextResponse.json(
      { error: 'Failed to fetch museum', details: error.message },
      { status: 500 }
    );
  }
}
