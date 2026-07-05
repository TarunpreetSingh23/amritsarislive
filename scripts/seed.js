const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Manually load env variables from .env.local if present
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)?$/);
    if (match) {
      const key = match[1].trim();
      let value = (match[2] || '').trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value;
    }
  });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in the environment or .env.local');
  process.exit(1);
}

// Schemas matching the updated models
const museumSchema = new mongoose.Schema({
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
});

const monumentSchema = new mongoose.Schema({
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
});

const Museum = mongoose.models.Museum || mongoose.model('Museum', museumSchema);
const Monument = mongoose.models.Monument || mongoose.model('Monument', monumentSchema);

async function seed() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB.');

    // Seed Monuments
    const monumentsDataPath = path.join(__dirname, '..', 'monuments.json');
    if (fs.existsSync(monumentsDataPath)) {
      console.log('📖 Reading monuments.json...');
      const monuments = JSON.parse(fs.readFileSync(monumentsDataPath, 'utf8'));
      
      console.log(`🧹 Clearing existing monuments (${monuments.length} expected)...`);
      await Monument.deleteMany({});
      
      console.log('📥 Seeding monuments into DB...');
      for (const m of monuments) {
        // Map keys if necessary, json has description, schema has description
        await Monument.create({
          id: m.id,
          title: m.title,
          category: m.category,
          description: m.description,
          image: m.image,
          link: m.link,
          bestTime: m.bestTime,
          timeRequired: m.timeRequired,
          highlights: m.highlights,
          entryFee: m.entryFee,
          timings: m.timings,
          address: m.address,
          mapUrl: m.mapUrl,
          bulletPoints: m.bulletPoints,
        });
      }
      console.log('✅ Monuments seeded successfully.');
    } else {
      console.warn('⚠️ monuments.json not found, skipping monuments seeding.');
    }

    // Seed Museums
    const museumsDataPath = path.join(__dirname, '..', 'museums.json');
    if (fs.existsSync(museumsDataPath)) {
      console.log('📖 Reading museums.json...');
      const museums = JSON.parse(fs.readFileSync(museumsDataPath, 'utf8'));
      
      console.log(`🧹 Clearing existing museums (${museums.length} expected)...`);
      await Museum.deleteMany({});
      
      console.log('📥 Seeding museums into DB...');
      for (const m of museums) {
        await Museum.create({
          id: m.id,
          title: m.title,
          category: m.category,
          description: m.description,
          image: m.image,
          link: m.link,
          bestTime: m.bestTime,
          timeRequired: m.timeRequired,
          highlights: m.highlights,
          entryFee: m.entryFee,
          timings: m.timings,
          address: m.address,
          mapUrl: m.mapUrl,
          bulletPoints: m.bulletPoints,
        });
      }
      console.log('✅ Museums seeded successfully.');
    } else {
      console.warn('⚠️ museums.json not found, skipping museums seeding.');
    }

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
  }
}

seed();
