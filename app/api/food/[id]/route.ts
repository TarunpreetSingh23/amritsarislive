import { NextRequest, NextResponse } from 'next/server';
import connectDB, { Food } from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let foodData: any = null;

    try {
      await connectDB();
      const dbFood = await Food.findOne({ id }).lean();
      if (dbFood) {
        foodData = dbFood;
      } else {
        throw new Error(`Food place with id ${id} not found in database`);
      }
    } catch (dbError: any) {
      console.warn(`MongoDB query failed, checking food.json for ${id}:`, dbError.message);
      const filePath = path.join(process.cwd(), 'food.json');
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        const foodPlaces = JSON.parse(fileData);
        foodData = foodPlaces.find((f: any) => f.id === id);
      }
    }

    if (!foodData) {
      return NextResponse.json(
        { error: 'Food place not found' },
        { status: 404 }
      );
    }

    const f = foodData;
    return NextResponse.json({
      food: {
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
      },
    });
  } catch (error: any) {
    console.error('Failed to fetch food place details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch food place details', details: error.message },
      { status: 500 }
    );
  }
}
