import 'dotenv/config';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import Article from '../models/Article.js';

const DEFAULT_CATEGORIES = [
  { name: 'Celebrities', slug: 'celebrities', description: 'In-depth, verified profiles and biographies of international public figures.' },
  { name: 'Actors', slug: 'actors', description: 'Verified biographies, filmographies, awards, and career milestones of actors and actresses.' },
  { name: 'Singers', slug: 'singers', description: 'Profiles, discographies, songwriting credits, and achievements of singers and musicians.' },
  { name: 'Influencers', slug: 'influencers', description: 'Well-sourced backgrounds and careers of digital creators, podcasters, and cultural voices.' },
  { name: 'Entertainment', slug: 'entertainment', description: 'Editorial features, industry milestones, and cultural deep-dives.' },
];

async function seed() {
  await connectDB();

  const categoryMap = {};
  for (const cat of DEFAULT_CATEGORIES) {
    const saved = await Category.findOneAndUpdate(
      { slug: cat.slug },
      { $setOnInsert: cat },
      { upsert: true, new: true }
    );
    categoryMap[cat.slug] = saved._id;
  }

  const adminEmail = 'admin@celebscope.com';
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    const passwordHash = await bcrypt.hash('ChangeMe123!', 12);
    admin = await User.create({
      name: 'Eleanor Vance',
      slug: 'eleanor-vance',
      email: adminEmail,
      passwordHash,
      role: 'admin',
      bio: 'Managing Editor at CelebScope covering international cinema, music history, and verified public profiles.',
    });
  }

  const sampleArticles = [
    {
      title: 'Cillian Murphy: From Cork Stage Productions to Academy Award Recognition',
      slug: 'cillian-murphy-biography',
      excerpt: 'How Irish actor Cillian Murphy built a disciplined three-decade career across independent theatre, British television, and landmark studio films.',
      body: `
        <h2 id="early-life">Early Life and Education</h2>
        <p>Born in Douglas, County Cork, Ireland, Cillian Murphy initially pursued music and law at University College Cork before turning toward theatre. His early stage breakthrough came in Enda Walsh's play <em>Disco Pigs</em>, which toured internationally and drew attention from film directors.</p>
        <h2 id="career-achievements">Career and Achievements</h2>
        <p>Murphy gained international recognition with Danny Boyle's <em>28 Days Later</em> (2002) and began a long-running creative partnership with director Christopher Nolan across <em>Batman Begins</em>, <em>Inception</em>, <em>Dunkirk</em>, and <em>Oppenheimer</em> (2023). On television, his portrayal of Tommy Shelby in BBC's <em>Peaky Blinders</em> earned widespread critical praise.</p>
        <h2 id="filmography">Selected Filmography</h2>
        <ul>
          <li><strong>Oppenheimer</strong> (2023) — J. Robert Oppenheimer (Academy Award for Best Actor)</li>
          <li><strong>Peaky Blinders</strong> (2013–2022) — Thomas Shelby</li>
          <li><strong>Dunkirk</strong> (2017) — Shivering Soldier</li>
          <li><strong>Inception</strong> (2010) — Robert Fischer</li>
          <li><strong>The Wind That Shakes the Barley</strong> (2006) — Damien O'Donovan</li>
        </ul>
      `,
      heroImage: {
        url: '/images/editorial-actors.svg',
        altText: 'Editorial illustration representing cinema and stage performance for Cillian Murphy biography',
        credit: 'CelebScope Editorial Art Desk',
        caption: 'Profile feature examining Cillian Murphy’s stage-to-screen trajectory.',
      },
      quickFacts: [
        { label: 'Profession', value: 'Actor, Producer' },
        { label: 'Nationality', value: 'Irish' },
        { label: 'Born', value: 'May 25, 1976 (Douglas, Cork, Ireland)' },
        { label: 'Notable Honors', value: 'Academy Award, BAFTA Award, Golden Globe' },
      ],
      faqs: [
        { question: 'What was Cillian Murphy’s breakthrough role?', answer: 'On stage, his breakthrough was Disco Pigs (1996); in international cinema, it was 28 Days Later (2002).' },
        { question: 'Did Cillian Murphy win an Academy Award?', answer: 'Yes. He won the Academy Award for Best Actor at the 96th Oscars for portraying J. Robert Oppenheimer.' },
      ],
      sources: [
        { title: 'Academy of Motion Picture Arts and Sciences — 96th Oscars Winners', url: 'https://www.oscars.org/' },
        { title: 'BAFTA Official Awards Database', url: 'https://www.bafta.org/' },
      ],
      categoryId: categoryMap.actors,
      authorId: admin._id,
      tags: ['actors', 'oscars', 'cinema'],
      status: 'published',
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date('2026-10-12T10:00:00Z'),
      seoTitle: 'Cillian Murphy Biography: Early Life, Career, Filmography & Awards',
      metaDescription: 'A verified biography of Irish actor Cillian Murphy covering his Cork theatre roots, Peaky Blinders, Christopher Nolan collaborations, and Oscar win.',
    },
    {
      title: 'Adele: Voice, Songwriting Craft, and Global Chart Milestones',
      slug: 'adele-biography',
      excerpt: 'Exploring British singer-songwriter Adele’s rise from the BRIT School in London to becoming one of the best-selling recording artists of the 21st century.',
      body: `
        <h2 id="early-life">Early Life and Education</h2>
        <p>Adele Laurie Blue Adkins was born in Tottenham, London, and graduated from the BRIT School for Performing Arts and Technology in Croydon in 2006. Her early demos attracted XL Recordings, launching her debut album <em>19</em> in 2008.</p>
        <h2 id="career-achievements">Career and Achievements</h2>
        <p>With studio albums <em>21</em> (2011), <em>25</em> (2015), and <em>30</em> (2021), Adele earned 16 Grammy Awards, an Academy Award for Best Original Song ("Skyfall"), and a Primetime Emmy Award for her televised concert special.</p>
        <h2 id="discography">Studio Discography</h2>
        <ul>
          <li><strong>19</strong> (2008) — XL Recordings</li>
          <li><strong>21</strong> (2011) — Multi-platinum international breakthrough</li>
          <li><strong>25</strong> (2015) — Record-breaking first-week sales</li>
          <li><strong>30</strong> (2021) — Critically acclaimed fourth studio album</li>
        </ul>
      `,
      heroImage: {
        url: '/images/editorial-singers.svg',
        altText: 'Editorial music artwork for Adele biography profile',
        credit: 'CelebScope Editorial Art Desk',
        caption: 'A look at Adele’s landmark albums and live residency performances.',
      },
      quickFacts: [
        { label: 'Profession', value: 'Singer, Songwriter' },
        { label: 'Nationality', value: 'British' },
        { label: 'Education', value: 'BRIT School for Performing Arts & Technology' },
        { label: 'Notable Honors', value: '16 Grammy Awards, Academy Award, Primetime Emmy' },
      ],
      faqs: [
        { question: 'Where did Adele study music?', answer: 'Adele attended the BRIT School in Croydon, South London, graduating in 2006.' },
        { question: 'How many studio albums has Adele released?', answer: 'She has released four numbered studio albums: 19, 21, 25, and 30.' },
      ],
      sources: [
        { title: 'Recording Academy — GRAMMY Artist Profile', url: 'https://www.grammy.com/' },
      ],
      categoryId: categoryMap.singers,
      authorId: admin._id,
      tags: ['singers', 'grammys', 'british-music'],
      status: 'published',
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date('2026-10-18T12:00:00Z'),
      seoTitle: 'Adele Biography: Education, Discography, Grammy Awards & Career',
      metaDescription: 'Read Adele’s verified biography including her BRIT School education, albums 19, 21, 25, and 30, and major international awards.',
    },
  ];

  for (const item of sampleArticles) {
    await Article.updateOne({ slug: item.slug }, { $setOnInsert: item }, { upsert: true });
  }

  console.log('CelebScope seed complete. Default admin: admin@celebscope.com / ChangeMe123!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
