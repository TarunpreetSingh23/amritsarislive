import { NextRequest, NextResponse } from 'next/server';
import connectDB, { Monument } from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

export async function GET(_req: NextRequest) {
  try {
    let monumentsData = [];
    try {
      await connectDB();
      const dbMonuments = await Monument.find({}).lean();
      if (dbMonuments && dbMonuments.length > 0) {
        monumentsData = dbMonuments;
      } else {
        throw new Error('No monuments found in database');
      }
    } catch (dbError: any) {
      console.warn('MongoDB connection failed, falling back to monuments.json:', dbError.message);
      const filePath = path.join(process.cwd(), 'monuments.json');
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        monumentsData = JSON.parse(fileData);
      } else {
        throw new Error('Mock data monuments.json not found');
      }
    }

    const monuments = monumentsData.map((m: any) => {
      const imagesList = m.images && m.images.length > 0 
        ? m.images 
        : (m.image ? [m.image] : []);
      return {
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
      };
    });

    return NextResponse.json({ monuments });
  } catch (error: any) {
    console.error('Failed to fetch monuments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monuments', details: error.message },
      { status: 500 }
    );
  }
}
