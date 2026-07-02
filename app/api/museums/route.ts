import { NextRequest, NextResponse } from 'next/server';
import connectDB, { Museum } from '@/lib/mongodb';

export async function GET(_req: NextRequest) {
  try {
    // 1. Establish MongoDB connection
    await connectDB();

    // 2. Fetch all museums from collection
    const dbMuseums = await Museum.find({}).lean();

    // 3. Map database fields to the structure expected by frontend
    const museums = dbMuseums.map((m: any) => ({
      id: m.id,
      title: m.title,
      extract: m.description,
      thumbnail: m.image || null,
      originalimage: m.image || null,
      pageUrl: m.link,
      category: m.category || 'Gallery',
    }));

    return NextResponse.json({ museums });
  } catch (error: any) {
    console.error('Failed to fetch from MongoDB:', error);
    return NextResponse.json(
      { error: 'Failed to fetch museums from database', details: error.message },
      { status: 500 }
    );
  }
}
