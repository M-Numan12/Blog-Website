import 'dotenv/config';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import Article from '../models/Article.js';

const DEFAULT_CATEGORIES = [
  { name: 'Celebrities', slug: 'celebrities', description: 'Comprehensive, primary-sourced biographies of international public figures shaping modern culture.' },
  { name: 'Actors', slug: 'actors', description: 'Verified biographies, stage origins, filmographies, and honors of screen and theatre performers.' },
  { name: 'Singers', slug: 'singers', description: 'Discographies, songwriting credits, and verified career milestones of global recording artists.' },
  { name: 'Influencers', slug: 'influencers', description: 'Well-researched profiles of digital creators, entrepreneurs, and independent media founders.' },
  { name: 'Entertainment', slug: 'entertainment', description: 'Editorial essays, industry retrospectives, and verified stories from film, television, and music.' },
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

  const authorsToEnsure = [
    {
      name: 'Eleanor Vance',
      slug: 'eleanor-vance',
      email: 'admin@celebscope.com',
      role: 'admin',
      bio: 'Managing Editor at CelebScope covering international cinema, award histories, and verified public profiles across the US, UK, Canada, and Australia.',
    },
    {
      name: 'Marcus Sterling',
      slug: 'marcus-sterling',
      email: 'marcus@celebscope.com',
      role: 'editor',
      bio: 'Music and digital-culture correspondent specializing in recording discographies, touring milestones, and independent media creators.',
    },
    {
      name: 'Clara Kensington',
      slug: 'clara-kensington',
      email: 'clara@celebscope.com',
      role: 'author',
      bio: 'Film historian and entertainment journalist documenting major award institutions, screen careers, and editorial verification standards.',
    },
  ];

  const authorMap = {};
  const defaultPasswordHash = await bcrypt.hash('ChangeMe123!', 12);

  for (const a of authorsToEnsure) {
    let user = await User.findOne({ email: a.email });
    if (!user) {
      user = await User.create({ ...a, passwordHash: defaultPasswordHash });
    }
    authorMap[a.slug] = user._id;
  }

  const sampleArticles = [
    {
      title: 'Cillian Murphy: From Cork Stage Productions to Academy Award Recognition',
      slug: 'cillian-murphy-biography',
      excerpt: 'How Irish actor Cillian Murphy built a disciplined three-decade career across independent theatre, British television, and landmark studio films.',
      body: `<h2 id="introduction">Introduction</h2><p>Cillian Murphy is an Irish actor and producer recognized for understated, transformative performances across theatre, television, and international cinema.</p><h2 id="early-life">Early Life and Education</h2><p>Born in Douglas, County Cork, Ireland, on May 25, 1976, Murphy studied law at University College Cork before breaking out on stage in Enda Walsh’s <em>Disco Pigs</em> (1996).</p><h2 id="career-achievements">Career and Achievements</h2><p>Murphy rose internationally with <em>28 Days Later</em> (2002), starred in BBC’s <em>Peaky Blinders</em> (2013–2022), and won the Academy Award for Best Actor for Christopher Nolan’s <em>Oppenheimer</em> (2023).</p><h2 id="filmography">Selected Filmography</h2><ul><li><strong>Small Things Like These</strong> (2024)</li><li><strong>Oppenheimer</strong> (2023)</li><li><strong>Peaky Blinders</strong> (2013–2022)</li><li><strong>Dunkirk</strong> (2017)</li><li><strong>Inception</strong> (2010)</li></ul>`,
      heroImage: {
        url: '/images/blog-cillian-murphy.jpg',
        altText: 'Classic European theatre stage bathed in warm golden 35mm cinema spotlight with director chair and clapboard',
        credit: 'CelebScope Original Editorial Photography',
        caption: 'Stage-to-screen retrospective examining Cillian Murphy’s verified career milestones.',
      },
      quickFacts: [
        { label: 'Full Name', value: 'Cillian Murphy' },
        { label: 'Profession', value: 'Actor, Producer' },
        { label: 'Born', value: 'May 25, 1976 (Cork, Ireland)' },
        { label: 'Notable Honors', value: 'Academy Award, BAFTA Award, Golden Globe' },
      ],
      faqs: [
        { question: 'What was Cillian Murphy’s breakthrough role?', answer: 'On stage, Disco Pigs (1996); in international cinema, Danny Boyle’s 28 Days Later (2002).' },
      ],
      sources: [
        { title: 'Academy of Motion Picture Arts and Sciences — 96th Oscars Winners', url: 'https://www.oscars.org/' },
        { title: 'BAFTA Official Awards Database', url: 'https://www.bafta.org/' },
      ],
      categoryId: categoryMap.actors,
      authorId: authorMap['eleanor-vance'],
      tags: ['actors', 'oscars', 'irish-cinema'],
      status: 'published',
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date('2026-10-12T10:00:00Z'),
      seoTitle: 'Cillian Murphy Biography: Early Life, Filmography & Oscar Career',
      metaDescription: 'A verified biography of Irish actor Cillian Murphy covering his Cork theatre roots, Peaky Blinders, Christopher Nolan films, and Oscar win.',
    },
    {
      title: 'Adele: Voice, Songwriting Craft, and Global Chart Milestones',
      slug: 'adele-biography',
      excerpt: 'Exploring British singer-songwriter Adele’s rise from the BRIT School in London to becoming one of the best-selling recording artists of the 21st century.',
      body: `<h2 id="introduction">Introduction</h2><p>Adele Laurie Blue Adkins is a British singer-songwriter whose contralto voice and soul-inflected songwriting reshaped contemporary pop music.</p><h2 id="early-life">Early Life and Education</h2><p>Born in Tottenham, London, on May 5, 1988, Adele graduated from the BRIT School for Performing Arts and Technology in 2006 before signing with XL Recordings.</p><h2 id="career-achievements">Career and Achievements</h2><p>Across numbered studio albums <em>19</em>, <em>21</em>, <em>25</em>, and <em>30</em>, Adele has earned 16 Grammy Awards, an Academy Award, and a Primetime Emmy Award.</p><h2 id="discography">Studio Discography</h2><ul><li><strong>19</strong> (2008)</li><li><strong>21</strong> (2011)</li><li><strong>25</strong> (2015)</li><li><strong>30</strong> (2021)</li></ul>`,
      heroImage: {
        url: '/images/blog-adele.jpg',
        altText: 'Classic brass vintage ribbon microphone standing center-stage in an ornate historic concert hall under a golden spotlight',
        credit: 'CelebScope Original Editorial Photography',
        caption: 'Discography, songwriting craft, and concert residency overview of British singer-songwriter Adele.',
      },
      quickFacts: [
        { label: 'Full Name', value: 'Adele Laurie Blue Adkins' },
        { label: 'Profession', value: 'Singer, Songwriter' },
        { label: 'Born', value: 'May 5, 1988 (London, England)' },
        { label: 'Notable Honors', value: '16 Grammy Awards, Academy Award, Primetime Emmy' },
      ],
      faqs: [
        { question: 'Where did Adele study music?', answer: 'Adele graduated from the BRIT School in Croydon, South London, in 2006.' },
      ],
      sources: [
        { title: 'Recording Academy — GRAMMY Artist Profile', url: 'https://www.grammy.com/' },
      ],
      categoryId: categoryMap.singers,
      authorId: authorMap['marcus-sterling'],
      tags: ['singers', 'grammys', 'british-music'],
      status: 'published',
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date('2026-10-18T12:00:00Z'),
      seoTitle: 'Adele Biography: BRIT School Roots, Discography & Grammy Awards',
      metaDescription: 'Read Adele’s verified biography covering her London upbringing, studio albums 19, 21, 25, and 30, and Grammy and Oscar achievements.',
    },
    {
      title: 'Zendaya: Oakland Stage Roots, Emmy History, and Modern Cinema',
      slug: 'zendaya-biography',
      excerpt: 'From Oakland performing arts training to becoming the youngest two-time Emmy winner for Outstanding Lead Actress in a Drama Series.',
      body: `<h2 id="introduction">Introduction</h2><p>Zendaya Maree Stoermer Coleman is an American actress, producer, and singer whose work spans major cinema franchises and Emmy-winning drama.</p><h2 id="early-life">Early Life and Education</h2><p>Born in Oakland, California, on September 1, 1996, Zendaya trained at the Oakland School for the Arts and the California Shakespeare Theater.</p><h2 id="career-achievements">Career and Achievements</h2><p>She won two Primetime Emmy Awards for HBO’s <em>Euphoria</em>, starred in the <em>Spider-Man</em> and <em>Dune</em> franchises, and produced and led Luca Guadagnino’s <em>Challengers</em> (2024).</p>`,
      heroImage: {
        url: '/images/blog-zendaya.jpg',
        altText: 'Luxury red carpet film premiere entrance at dusk with warm golden flash bokeh and architectural marble columns',
        credit: 'CelebScope Original Editorial Photography',
        caption: 'Career overview of two-time Primetime Emmy-winning actress and producer Zendaya.',
      },
      quickFacts: [
        { label: 'Full Name', value: 'Zendaya Maree Stoermer Coleman' },
        { label: 'Profession', value: 'Actress, Producer, Singer' },
        { label: 'Born', value: 'September 1, 1996 (Oakland, California, USA)' },
        { label: 'Notable Honors', value: '2× Primetime Emmy Awards, Golden Globe Award' },
      ],
      faqs: [
        { question: 'Which historic Emmy record does Zendaya hold?', answer: 'In 2022, she became the youngest two-time winner for Outstanding Lead Actress in a Drama Series.' },
      ],
      sources: [{ title: 'Television Academy — Emmy Awards Database', url: 'https://www.emmys.com/' }],
      categoryId: categoryMap.actors,
      authorId: authorMap['eleanor-vance'],
      tags: ['actors', 'emmys', 'hollywood'],
      status: 'published',
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date('2026-10-25T15:00:00Z'),
      seoTitle: 'Zendaya Biography: Early Life, Euphoria Emmys, Dune & Filmography',
      metaDescription: 'Explore Zendaya’s verified profile, Oakland theatre training, Primetime Emmy history, Dune franchise roles, and producing credits.',
    },
    {
      title: 'Marques Brownlee (MKBHD): Building an Independent Tech Media Studio',
      slug: 'marques-brownlee-biography',
      excerpt: 'How a New Jersey college student turned early hardware reviews into one of the most influential independent technology channels on the web.',
      body: `<h2 id="introduction">Introduction</h2><p>Marques Brownlee (MKBHD) is an American technology reviewer, producer, and world-champion ultimate frisbee athlete.</p><h2 id="early-life">Early Life and Education</h2><p>Born in Maplewood, New Jersey, in December 1993, Brownlee graduated from Stevens Institute of Technology in 2015.</p><h2 id="career-achievements">Career and Achievements</h2><p>He built a cinema-grade independent media studio spanning MKBHD, Auto Focus, and the Waveform podcast.</p>`,
      heroImage: {
        url: '/images/blog-marques-brownlee.jpg',
        altText: 'Minimalist matte-black cinema camera rig and broadcast podcast microphone in a modern creator studio',
        credit: 'CelebScope Original Editorial Photography',
        caption: 'Independent digital media production milestones of Marques Brownlee (MKBHD).',
      },
      quickFacts: [
        { label: 'Profession', value: 'Digital Creator, Tech Reviewer, Athlete' },
        { label: 'Education', value: 'Stevens Institute of Technology (B.S., 2015)' },
      ],
      faqs: [{ question: 'What does MKBHD stand for?', answer: 'Marques Keith Brownlee High Definition.' }],
      sources: [{ title: 'Stevens Institute of Technology', url: 'https://www.stevens.edu/' }],
      categoryId: categoryMap.influencers,
      authorId: authorMap['marcus-sterling'],
      tags: ['influencers', 'creators', 'digital-media'],
      status: 'published',
      isFeatured: false,
      isTrending: true,
      publishedAt: new Date('2026-11-02T09:30:00Z'),
      seoTitle: 'Marques Brownlee (MKBHD) Biography: Education, Studio & Career',
      metaDescription: 'Verified biography of tech creator Marques Brownlee (MKBHD).',
    },
    {
      title: 'Billie Eilish: Bedroom Recording, Songwriting Partnership, and Dual Oscars',
      slug: 'billie-eilish-biography',
      excerpt: 'Tracing Billie Eilish’s collaborative songwriting process with Finneas O’Connell and her historic sweep across the Grammys and Academy Awards.',
      body: `<h2 id="introduction">Introduction</h2><p>Billie Eilish Pirate Baird O’Connell is an American singer-songwriter and the youngest two-time Academy Award winner in history.</p><h2 id="career-achievements">Career and Achievements</h2><p>Working closely with brother Finneas, Eilish won nine Grammy Awards and two Oscars for Best Original Song (&ldquo;No Time to Die&rdquo; and &ldquo;What Was I Made For?&rdquo;).</p>`,
      heroImage: {
        url: '/images/blog-billie-eilish.jpg',
        altText: 'Moody analog recording studio with glowing vintage mixing console and condenser microphone',
        credit: 'CelebScope Original Editorial Photography',
        caption: 'Songwriting craft and award milestones in Billie Eilish’s recording career.',
      },
      quickFacts: [
        { label: 'Profession', value: 'Singer, Songwriter' },
        { label: 'Notable Honors', value: '9 Grammy Awards, 2 Academy Awards' },
      ],
      faqs: [],
      sources: [{ title: 'Academy of Motion Picture Arts and Sciences', url: 'https://www.oscars.org/' }],
      categoryId: categoryMap.singers,
      authorId: authorMap['marcus-sterling'],
      tags: ['singers', 'oscars', 'grammys'],
      status: 'published',
      isFeatured: true,
      isTrending: false,
      publishedAt: new Date('2026-11-05T11:00:00Z'),
      seoTitle: 'Billie Eilish Biography: Early Life, Discography & Dual Oscar Wins',
      metaDescription: 'Read Billie Eilish’s verified biography covering her albums with Finneas and two Academy Awards.',
    },
    {
      title: 'Keanu Reeves: Independent Cinema, Action Craft, and Quiet Longevity',
      slug: 'keanu-reeves-biography',
      excerpt: 'A four-decade portrait of Canadian actor Keanu Reeves—from cult comedies and 1990s science fiction landmarks to modern action choreography.',
      body: `<h2 id="introduction">Introduction</h2><p>Keanu Charles Reeves is a Canadian actor celebrated for four decades spanning independent drama, <em>The Matrix</em>, and the <em>John Wick</em> series.</p><h2 id="career-achievements">Career and Achievements</h2><p>Raised in Toronto, Reeves established an enduring global career across <em>Speed</em> (1994), <em>The Matrix</em> (1999), and <em>John Wick</em> (2014–2023).</p>`,
      heroImage: {
        url: '/images/blog-keanu-reeves.jpg',
        altText: 'Rain-slicked city street at night with vintage 35mm cinema camera and warm golden theatre marquee reflections',
        credit: 'CelebScope Original Editorial Photography',
        caption: 'Four decades of independent film and practical action craft in Keanu Reeves’s career.',
      },
      quickFacts: [
        { label: 'Full Name', value: 'Keanu Charles Reeves' },
        { label: 'Profession', value: 'Actor, Musician, Author' },
      ],
      faqs: [],
      sources: [{ title: 'Library of Congress — National Film Registry', url: 'https://www.loc.gov/' }],
      categoryId: categoryMap.actors,
      authorId: authorMap['clara-kensington'],
      tags: ['actors', 'action-cinema', 'canadian-actors'],
      status: 'published',
      isFeatured: false,
      isTrending: false,
      publishedAt: new Date('2026-11-08T13:00:00Z'),
      seoTitle: 'Keanu Reeves Biography: Early Life, The Matrix, John Wick & Career',
      metaDescription: 'Verified biography of Canadian actor Keanu Reeves.',
    },
    {
      title: 'The Weeknd (Abel Tesfaye): From Toronto Mixtapes to Stadium Records',
      slug: 'the-weeknd-biography',
      excerpt: 'How Canadian singer-songwriter Abel Tesfaye evolved from anonymous 2011 online mixtapes into a record-setting global stadium headliner.',
      body: `<h2 id="introduction">Introduction</h2><p>Abel Makkonen Tesfaye (The Weeknd) is a Canadian singer, songwriter, and producer who emerged with three acclaimed 2011 mixtapes before dominating international charts with <em>After Hours</em> and <em>Dawn FM</em>.</p>`,
      heroImage: {
        url: '/images/blog-the-weeknd.jpg',
        altText: 'Vast sold-out stadium concert stage illuminated by golden architectural light beams at night',
        credit: 'CelebScope Original Editorial Photography',
        caption: 'From independent Toronto mixtapes to international stadium touring milestones.',
      },
      quickFacts: [
        { label: 'Full Name', value: 'Abel Makkonen Tesfaye' },
        { label: 'Profession', value: 'Singer, Songwriter, Producer' },
      ],
      faqs: [],
      sources: [{ title: 'JUNO Awards Archive', url: 'https://junoawards.ca/' }],
      categoryId: categoryMap.singers,
      authorId: authorMap['marcus-sterling'],
      tags: ['singers', 'canadian-music', 'stadium-tours'],
      status: 'published',
      isFeatured: false,
      isTrending: true,
      publishedAt: new Date('2026-11-10T10:30:00Z'),
      seoTitle: 'The Weeknd (Abel Tesfaye) Biography: Mixtapes, Albums & Awards',
      metaDescription: 'Verified biography of Canadian artist Abel Tesfaye (The Weeknd).',
    },
    {
      title: 'Emma Chamberlain: From Authentic Vlogs to Specialty Coffee and Fashion Front Rows',
      slug: 'emma-chamberlain-biography',
      excerpt: 'Examining how California creator Emma Chamberlain redefined conversational video editing, launched a beverage brand, and crossed into luxury fashion.',
      body: `<h2 id="introduction">Introduction</h2><p>Emma Frances Chamberlain is an American digital creator, podcast host, and founder of Chamberlain Coffee whose candid storytelling transformed YouTube vlogging and led to global fashion partnerships.</p>`,
      heroImage: {
        url: '/images/blog-emma-chamberlain.jpg',
        altText: 'Sunlit Parisian cafe table with artisan espresso cup, vintage 35mm film camera, and linen notebook',
        credit: 'CelebScope Original Editorial Photography',
        caption: 'From independent YouTube vlogging to specialty coffee entrepreneurship and luxury fashion.',
      },
      quickFacts: [
        { label: 'Full Name', value: 'Emma Frances Chamberlain' },
        { label: 'Profession', value: 'Digital Creator, Podcaster, Entrepreneur' },
      ],
      faqs: [],
      sources: [{ title: 'Vogue', url: 'https://www.vogue.com/' }],
      categoryId: categoryMap.influencers,
      authorId: authorMap['marcus-sterling'],
      tags: ['influencers', 'fashion', 'entrepreneurs'],
      status: 'published',
      isFeatured: false,
      isTrending: false,
      publishedAt: new Date('2026-11-12T15:45:00Z'),
      seoTitle: 'Emma Chamberlain Biography: YouTube Roots, Coffee Brand & Fashion',
      metaDescription: 'Read Emma Chamberlain’s verified biography covering YouTube, Chamberlain Coffee, and luxury fashion.',
    },
    {
      title: 'How Major Film Awards Verify Voting, Eligibility, and Historic Milestones',
      slug: 'how-major-film-awards-work',
      excerpt: 'An editorial explainer detailing how the Oscars, BAFTAs, and Emmys determine eligibility, peer-branch voting, and official archival records.',
      body: `<h2 id="introduction">Introduction</h2><p>Major entertainment honors—including the Oscars, BAFTAs, and Primetime Emmys—rely on formal eligibility windows, peer-branch nominations, and audited archives.</p>`,
      heroImage: {
        url: '/images/blog-film-awards.jpg',
        altText: 'Grand Art Deco cinema awards auditorium with crimson velvet seats and golden balconies',
        credit: 'CelebScope Original Editorial Photography',
        caption: 'Understanding peer voting and archival verification across major entertainment awards.',
      },
      quickFacts: [
        { label: 'Topic', value: 'Entertainment Industry & Awards' },
        { label: 'Covered Bodies', value: 'AMPAS, BAFTA, Television Academy' },
      ],
      faqs: [],
      sources: [{ title: 'Oscars Rules & Eligibility', url: 'https://www.oscars.org/' }],
      categoryId: categoryMap.entertainment,
      authorId: authorMap['clara-kensington'],
      tags: ['entertainment', 'awards', 'editorial'],
      status: 'published',
      isFeatured: false,
      isTrending: false,
      publishedAt: new Date('2026-11-15T14:00:00Z'),
      seoTitle: 'How Major Film & TV Awards Verify Eligibility and Voting | CelebScope',
      metaDescription: 'Learn how the Oscars, BAFTAs, and Primetime Emmys manage branch voting and eligibility.',
    },
    {
      title: 'Inside the Modern Biography Boom: Why Verified Profiles Outlast Gossip',
      slug: 'verified-biographies-entertainment-journalism',
      excerpt: 'Why international readers increasingly seek transparent citations, accurate filmographies, and clear update histories over speculative celebrity sites.',
      body: `<h2 id="introduction">Introduction</h2><p>Readers searching for public figures increasingly prioritize primary-sourced timelines, transparent citations, and clear correction policies over speculative celebrity gossip.</p>`,
      heroImage: {
        url: '/images/blog-editorial-journalism.jpg',
        altText: 'Senior magazine editor dark walnut desk lit by warm brass lamp with archival folders and hardcover books',
        credit: 'CelebScope Original Editorial Photography',
        caption: 'Transparent sourcing and factual corrections form the backbone of modern biographical journalism.',
      },
      quickFacts: [
        { label: 'Section', value: 'Entertainment & Media Desk' },
        { label: 'Editorial Focus', value: 'Primary Sourcing & Reader Trust' },
      ],
      faqs: [],
      sources: [{ title: 'Society of Professional Journalists', url: 'https://www.spj.org/' }],
      categoryId: categoryMap.entertainment,
      authorId: authorMap['eleanor-vance'],
      tags: ['entertainment', 'journalism', 'editorial'],
      status: 'published',
      isFeatured: false,
      isTrending: false,
      publishedAt: new Date('2026-11-18T11:00:00Z'),
      seoTitle: 'Why Verified Celebrity Biographies Outlast Gossip | CelebScope',
      metaDescription: 'An editorial look at why primary-sourced biographies build lasting reader trust.',
    },
  ];

  for (const item of sampleArticles) {
    await Article.updateOne({ slug: item.slug }, { $set: item }, { upsert: true });
  }

  console.log(`Seed complete: ${sampleArticles.length} editorial blogs upserted. Default admin: admin@celebscope.com / ChangeMe123!`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
