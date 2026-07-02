import { NextRequest, NextResponse } from 'next/server';
import connectDB, { Monument } from '@/lib/mongodb';

export async function GET(_req: NextRequest) {
  try {
    // 1. Establish MongoDB connection
    await connectDB();

    // 2. Fetch all monuments from collection
    const dbMonuments = await Monument.find({}).lean();

    // 3. Map database fields to the structure expected by frontend
    const monuments = dbMonuments.map((m: any) => ({
      id: m.id,
      title: m.title,
      extract: m.description,
      thumbnail: m.image || null,
      originalimage: m.image || null,
      pageUrl: m.link,
      category: m.category || 'Heritage',
    }));

    return NextResponse.json({ monuments });
  } catch (error: any) {
    console.error('Failed to fetch from MongoDB:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monuments from database', details: error.message },
      { status: 500 }
    );
  }
}
