import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const filePath = path.join(process.cwd(), 'monuments.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Mock data monuments.json not found' },
        { status: 500 }
      );
    }
    
    const fileData = fs.readFileSync(filePath, 'utf8');
    const monuments = JSON.parse(fileData);
    const monumentData = monuments.find((m: any) => m.id === id);

    if (!monumentData) {
      return NextResponse.json(
        { error: 'Monument not found' },
        { status: 404 }
      );
    }

    const m = monumentData;
    const imagesList = m.images && m.images.length > 0 
      ? m.images 
      : (m.image ? [m.image] : []);
      
    return NextResponse.json({
      monument: {
        id: m.id,
        title: m.title,
        extract: m.description || m.extract || '',
        thumbnail: imagesList[0] || null,
        originalimage: imagesList[0] || null,
        images: imagesList,
        pageUrl: m.link || m.pageUrl || '',
        category: m.category || 'Heritage',
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
    console.error('Failed to fetch monument:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monument', details: error.message },
      { status: 500 }
    );
  }
}
