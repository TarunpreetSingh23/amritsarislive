import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(_req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'food.json');
    if (!fs.existsSync(filePath)) {
      throw new Error('Mock data food.json not found');
    }
    
    const fileData = fs.readFileSync(filePath, 'utf8');
    const foodData = JSON.parse(fileData);

    const foodPlaces = foodData.map((f: any) => ({
      id: f.id,
      title: f.title,
      extract: f.description || f.extract || '',
      thumbnail: f.image || f.thumbnail || null,
      originalimage: f.image || f.originalimage || null,
      pageUrl: f.link || f.pageUrl || '',
      category: f.category || 'Culinary',
      bestTime: f.bestTime || '',
      timeRequired: f.timeRequired || '',
      highlights: f.highlights || [],
      entryFee: f.entryFee || '',
      timings: f.timings || '',
      address: f.address || '',
      mapUrl: f.mapUrl || '',
      bulletPoints: f.bulletPoints || [],
    }));

    return NextResponse.json({ food: foodPlaces });
  } catch (error: any) {
    console.error('Failed to fetch food places:', error);
    return NextResponse.json(
      { error: 'Failed to fetch food places', details: error.message },
      { status: 500 }
    );
  }
}
