import 'dotenv/config';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import Category from '../models/Category.js';
import User from '../models/User.js';

const DEFAULT_CATEGORIES = [
  { name: 'Celebrities', slug: 'celebrities', description: 'In-depth profiles and biographies of public figures.' },
  { name: 'Actors', slug: 'actors', description: 'Verified biographies, filmographies, and career milestones of actors and actresses.' },
  { name: 'Singers', slug: 'singers', description: 'Profiles, discographies, and achievements of singers and musicians.' },
  { name: 'Influencers', slug: 'influencers', description: 'Stories and backgrounds of digital creators and cultural voices.' },
  { name: 'Entertainment', slug: 'entertainment', description: 'Editorial stories and verified industry features.' },
];

async function seed() {
  await connectDB();

  for (const cat of DEFAULT_CATEGORIES) {
    await Category.updateOne({ slug: cat.slug }, { $setOnInsert: cat }, { upsert: true });
  }

  const adminEmail = 'admin@celebscope.com';
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('ChangeMe123!', 12);
    await User.create({
      name: 'CelebScope Editor',
      slug: 'celebscope-editor',
      email: adminEmail,
      passwordHash,
      role: 'admin',
      bio: 'Senior editorial lead at CelebScope.',
    });
  }

  console.log('Seed complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
