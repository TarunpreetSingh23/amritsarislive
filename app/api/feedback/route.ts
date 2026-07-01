import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB, { Feedback } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, rating } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Save to MongoDB
    await connectDB();
    await Feedback.create({ name, email, phone, message, rating });

    // Send email via Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const stars = '★'.repeat(rating || 0) + '☆'.repeat(5 - (rating || 0));

    await transporter.sendMail({
      from: `"Amritsar is Live" <${process.env.EMAIL_USER}>`,
      to: process.env.CLIENT_EMAIL,
      subject: `🌟 New Feedback from ${name} — Amritsar is Live`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1C1C1E, #2d2d2d); padding: 30px; text-align: center;">
            <h1 style="color: #C9A227; margin: 0; font-size: 24px;">Amritsar is Live</h1>
            <p style="color: #aaa; margin: 8px 0 0;">New Feedback Received</p>
          </div>
          <div style="padding: 30px; background: white;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; color: #666; font-weight: bold; width: 120px;">Name:</td><td style="padding: 10px 0; color: #1a1a1a;">${name}</td></tr>
              <tr><td style="padding: 10px 0; color: #666; font-weight: bold;">Email:</td><td style="padding: 10px 0; color: #1a1a1a;">${email}</td></tr>
              <tr><td style="padding: 10px 0; color: #666; font-weight: bold;">Phone:</td><td style="padding: 10px 0; color: #1a1a1a;">${phone || 'Not provided'}</td></tr>
              <tr><td style="padding: 10px 0; color: #666; font-weight: bold;">Rating:</td><td style="padding: 10px 0; color: #C9A227; font-size: 20px;">${stars}</td></tr>
              <tr>
                <td colspan="2" style="padding-top: 20px;">
                  <div style="background: #f5f5f5; border-left: 4px solid #C9A227; padding: 15px; border-radius: 0 8px 8px 0;">
                    <p style="margin: 0; color: #333; font-style: italic;">"${message}"</p>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div style="background: #f0f0f0; padding: 15px; text-align: center;">
            <p style="margin: 0; color: #999; font-size: 12px;">Sent from Amritsar is Live website • ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Feedback API error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
