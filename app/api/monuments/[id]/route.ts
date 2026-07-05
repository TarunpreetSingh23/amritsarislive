import { NextRequest, NextResponse } from 'next/server';
import connectDB, { Monument } from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let monumentData: any = null;

    try {
      await connectDB();
      const dbMonument = await Monument.findOne({ id }).lean();
      if (dbMonument) {
        monumentData = dbMonument;
      } else {
        throw new Error(`Monument with id ${id} not found in database`);
      }
    } catch (dbError: any) {
      console.warn(`MongoDB query failed, checking monuments.json for ${id}:`, dbError.message);
      const filePath = path.join(process.cwd(), 'monuments.json');
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        const monuments = JSON.parse(fileData);
        monumentData = monuments.find((m: any) => m.id === id);
      }
    }

    if (!monumentData) {
      return NextResponse.json(
        { error: 'Monument not found' },
        { status: 404 }
      );
    }

    const m = monumentData;
    return NextResponse.json({
      monument: {
        id: m.id,
        title: m.title,
        extract: m.description || m.extract || '',
        thumbnail: m.image || m.thumbnail || null,
        originalimage: m.image || m.originalimage || null,
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
