import { NextRequest, NextResponse } from 'next/server';
import connectDB, { Museum } from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

export async function GET(_req: NextRequest) {
  try {
    let museumsData = [];
    try {
      await connectDB();
      const dbMuseums = await Museum.find({}).lean();
      if (dbMuseums && dbMuseums.length > 0) {
        museumsData = dbMuseums;
      } else {
        throw new Error('No museums found in database');
      }
    } catch (dbError: any) {
      console.warn('MongoDB connection failed, falling back to museums.json:', dbError.message);
      const filePath = path.join(process.cwd(), 'museums.json');
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        museumsData = JSON.parse(fileData);
      } else {
        throw new Error('Mock data museums.json not found');
      }
    }

    const museums = museumsData.map((m: any) => ({
      id: m.id,
      title: m.title,
      extract: m.description || m.extract || '',
      thumbnail: m.image || m.thumbnail || null,
      originalimage: m.image || m.originalimage || null,
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
