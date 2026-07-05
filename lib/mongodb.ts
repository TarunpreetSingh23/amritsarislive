import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
  }

  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;

// Feedback Schema
const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

export const Feedback =
  mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

// Museum Schema
const museumSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    bestTime: { type: String },
    timeRequired: { type: String },
    highlights: [{ type: String }],
    entryFee: { type: String },
    timings: { type: String },
    address: { type: String },
    mapUrl: { type: String },
    bulletPoints: [{ type: String }],
  },
  { timestamps: true }
);

export const Museum =
  mongoose.models.Museum || mongoose.model('Museum', museumSchema);

// Monument Schema
const monumentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    bestTime: { type: String },
    timeRequired: { type: String },
    highlights: [{ type: String }],
    entryFee: { type: String },
    timings: { type: String },
    address: { type: String },
    mapUrl: { type: String },
    bulletPoints: [{ type: String }],
  },
  { timestamps: true }
);

export const Monument =
  mongoose.models.Monument || mongoose.model('Monument', monumentSchema);
