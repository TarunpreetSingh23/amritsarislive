import { NextRequest, NextResponse } from 'next/server';
import connectDB, { Video } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    const skip = (page - 1) * limit;

    const videos = await Video.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Video.countDocuments({});

    const mappedVideos = videos.map((v: any) => ({
      _id: v._id,
      title: v.title,
      cloudinaryVideoUrl: v.cloudinaryVideoUrl,
    }));

    return NextResponse.json({
      videos: mappedVideos,
      pagination: {
        page,
        limit,
        total,
        hasMore: skip + videos.length < total,
      },
    });
  } catch (error: any) {
    console.error('Failed to fetch videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos', details: error.message },
      { status: 500 }
    );
  }
}
