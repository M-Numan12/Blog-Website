export const MOCK_AUTHORS = [
  {
    _id: 'author-1',
    name: 'Eleanor Vance',
    slug: 'eleanor-vance',
    role: 'Managing Editor',
    bio: 'Managing Editor at CelebScope covering international cinema, award histories, and verified public profiles across the US, UK, Canada, and Australia.',
  },
  {
    _id: 'author-2',
    name: 'Marcus Sterling',
    slug: 'marcus-sterling',
    role: 'Senior Culture Correspondent',
    bio: 'Music and digital-culture correspondent specializing in recording discographies, touring milestones, and independent media creators.',
  },
  {
    _id: 'author-3',
    name: 'Clara Kensington',
    slug: 'clara-kensington',
    role: 'Film & Awards Editor',
    bio: 'Film historian and entertainment journalist documenting major award institutions, screen careers, and editorial verification standards.',
  },
];

export const MOCK_CATEGORIES = [
  {
    _id: 'cat-celebrities',
    name: 'Celebrities',
    slug: 'celebrities',
    description: 'Comprehensive, primary-sourced biographies of international public figures shaping modern culture.',
    articleCount: 10,
  },
  {
    _id: 'cat-actors',
    name: 'Actors',
    slug: 'actors',
    description: 'Verified biographies, stage origins, filmographies, and honors of screen and theatre performers.',
    articleCount: 3,
  },
  {
    _id: 'cat-singers',
    name: 'Singers',
    slug: 'singers',
    description: 'Discographies, songwriting credits, and verified career milestones of global recording artists.',
    articleCount: 3,
  },
  {
    _id: 'cat-influencers',
    name: 'Influencers',
    slug: 'influencers',
    description: 'Well-researched profiles of digital creators, entrepreneurs, and independent media founders.',
    articleCount: 2,
  },
  {
    _id: 'cat-entertainment',
    name: 'Entertainment',
    slug: 'entertainment',
    description: 'Editorial essays, industry retrospectives, and verified stories from film, television, and music.',
    articleCount: 2,
  },
];

export const MOCK_ARTICLES = [
  {
    _id: 'art-1',
    title: 'Cillian Murphy: From Cork Stage Productions to Academy Award Recognition',
    slug: 'cillian-murphy-biography',
    readTime: '6 min read',
    excerpt:
      'How Irish actor Cillian Murphy built a disciplined three-decade career across independent theatre, British television, and landmark studio films.',
    body: `
      <h2 id="introduction">Introduction</h2>
      <p>Cillian Murphy is an Irish actor and producer recognized for understated, transformative performances across theatre, television, and international cinema. Over nearly thirty years of work, he moved deliberately between intimate independent productions and major studio collaborations before winning the Academy Award for Best Actor.</p>

      <h2 id="early-life">Early Life and Education</h2>
      <p>Born in Douglas, County Cork, Ireland, on May 25, 1976, Murphy grew up in an academic household—his mother taught French and his father worked for Ireland’s Department of Education. He briefly studied law at University College Cork while playing guitar and singing in a rock band before auditioning for Corcadorca Theatre Company.</p>
      <p>His breakout stage role in Enda Walsh’s 1996 play <em>Disco Pigs</em> toured Dublin, Edinburgh, and London, establishing his disciplined craft and opening doors to screen acting.</p>

      <h2 id="career-achievements">Career and Achievements</h2>
      <p>Murphy gained worldwide visibility starring in Danny Boyle’s <em>28 Days Later</em> (2002) and Neil Jordan’s <em>Breakfast on Pluto</em> (2005), earning a Golden Globe nomination. In 2005 he began a nearly twenty-year collaboration with filmmaker Christopher Nolan, appearing in <em>Batman Begins</em>, <em>Inception</em>, <em>Dunkirk</em>, and the title role of <em>Oppenheimer</em> (2023).</p>
      <p>Between 2013 and 2022, Murphy portrayed Thomas Shelby across six seasons of the BBC historical drama <em>Peaky Blinders</em>. In 2024, he co-founded the independent production company Big Things Films alongside producer Alan Moloney, debuting with <em>Small Things Like These</em>.</p>

      <h2 id="filmography">Selected Filmography</h2>
      <ul>
        <li><strong>Small Things Like These</strong> (2024) — Bill Furlong (Actor &amp; Producer)</li>
        <li><strong>Oppenheimer</strong> (2023) — J. Robert Oppenheimer (Academy Award, BAFTA, Golden Globe)</li>
        <li><strong>Peaky Blinders</strong> (2013–2022) — Thomas Shelby</li>
        <li><strong>Dunkirk</strong> (2017) — Shivering Soldier</li>
        <li><strong>Inception</strong> (2010) — Robert Fischer</li>
        <li><strong>The Wind That Shakes the Barley</strong> (2006) — Damien O’Donovan</li>
        <li><strong>28 Days Later</strong> (2002) — Jim</li>
      </ul>

      <h2 id="family-private-life">Publicly Confirmed Family Information</h2>
      <p>Murphy married Irish visual artist Yvonne McGuinness in 2004, and the couple has two sons. Consistent with his public interviews, Murphy maintains a quiet personal life in Dublin away from tabloid publicity.</p>
    `,
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
      { label: 'Years Active', value: '1996–present' },
      { label: 'Notable Honors', value: 'Academy Award, BAFTA Award, Golden Globe' },
      { label: 'Known For', value: 'Oppenheimer, Peaky Blinders, 28 Days Later' },
    ],
    faqs: [
      {
        question: 'What was Cillian Murphy’s breakthrough role?',
        answer: 'On stage, his breakthrough was Enda Walsh’s Disco Pigs (1996). Internationally on screen, Danny Boyle’s 28 Days Later (2002) brought him wide acclaim.',
      },
      {
        question: 'How many Christopher Nolan films has Cillian Murphy appeared in?',
        answer: 'He has appeared in six Christopher Nolan films: Batman Begins, The Dark Knight, Inception, The Dark Knight Rises, Dunkirk, and Oppenheimer.',
      },
      {
        question: 'Does CelebScope publish a net worth figure for Cillian Murphy?',
        answer: 'Private financial holdings are not publicly disclosed in verified filings, so CelebScope avoids speculative net-worth estimates.',
      },
    ],
    sources: [
      { title: 'Academy of Motion Picture Arts and Sciences — 96th Oscars Winners', url: 'https://www.oscars.org/' },
      { title: 'BAFTA Official Awards Database', url: 'https://www.bafta.org/' },
      { title: 'BBC — Peaky Blinders Official Archive', url: 'https://www.bbc.co.uk/' },
    ],
    categoryId: MOCK_CATEGORIES[1],
    authorId: MOCK_AUTHORS[0],
    tags: ['actors', 'oscars', 'irish-cinema'],
    status: 'published',
    isFeatured: true,
    isTrending: true,
    publishedAt: '2026-10-12T10:00:00.000Z',
    updatedAt: '2026-11-22T14:30:00.000Z',
    seoTitle: 'Cillian Murphy Biography: Early Life, Filmography & Oscar Career',
    metaDescription: 'A verified biography of Irish actor Cillian Murphy covering his Cork theatre roots, Peaky Blinders, Christopher Nolan films, and Academy Award win.',
  },
  {
    _id: 'art-2',
    title: 'Adele: Voice, Songwriting Craft, and Global Chart Milestones',
    slug: 'adele-biography',
    readTime: '6 min read',
    excerpt:
      'Exploring British singer-songwriter Adele’s rise from the BRIT School in London to becoming one of the best-selling recording artists of the 21st century.',
    body: `
      <h2 id="introduction">Introduction</h2>
      <p>Adele Laurie Blue Adkins is a British singer-songwriter whose contralto voice and classic soul-inflected balladry reshaped contemporary pop music. Across four numbered studio albums, she has earned critical acclaim and historic commercial benchmarks worldwide.</p>

      <h2 id="early-life">Early Life and Education</h2>
      <p>Born in Tottenham, London, on May 5, 1988, Adele grew up listening to Ella Fitzgerald, Etta James, and Dusty Springfield. She attended the BRIT School for Performing Arts and Technology in Croydon, graduating in 2006 shortly before signing with independent label XL Recordings.</p>

      <h2 id="career-achievements">Career and Achievements</h2>
      <p>Her debut album <em>19</em> (2008) won two Grammy Awards, including Best New Artist. Its follow-up, <em>21</em> (2011), became one of the highest-selling albums in recorded history, sweeping six Grammys in a single evening. Subsequent releases <em>25</em> (2015) and <em>30</em> (2021) reaffirmed her global reach, alongside her acclaimed Las Vegas residency, <em>Weekends with Adele</em>, and her 2024 Munich stadium shows.</p>

      <h2 id="discography">Studio Discography</h2>
      <ul>
        <li><strong>19</strong> (2008) — XL Recordings</li>
        <li><strong>21</strong> (2011) — Grammy Award for Album of the Year</li>
        <li><strong>25</strong> (2015) — Grammy Award for Album of the Year</li>
        <li><strong>30</strong> (2021) — BRIT Award for British Album of the Year</li>
      </ul>
    `,
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
      { label: 'Education', value: 'BRIT School for Performing Arts & Technology' },
      { label: 'Notable Honors', value: '16 Grammy Awards, Academy Award, Primetime Emmy' },
    ],
    faqs: [
      {
        question: 'Where did Adele study music?',
        answer: 'Adele graduated from the BRIT School for Performing Arts and Technology in Croydon, South London, in 2006.',
      },
      {
        question: 'Why are Adele’s albums named after numbers?',
        answer: 'Each studio album title reflects her age when she began writing the core material for that record: 19, 21, 25, and 30.',
      },
    ],
    sources: [
      { title: 'Recording Academy — GRAMMY Artist Profile', url: 'https://www.grammy.com/' },
      { title: 'BRIT Awards Official Winners Archive', url: 'https://www.brits.co.uk/' },
    ],
    categoryId: MOCK_CATEGORIES[2],
    authorId: MOCK_AUTHORS[1],
    tags: ['singers', 'grammys', 'british-music'],
    status: 'published',
    isFeatured: true,
    isTrending: true,
    publishedAt: '2026-10-18T12:00:00.000Z',
    updatedAt: '2026-11-20T09:00:00.000Z',
    seoTitle: 'Adele Biography: BRIT School Roots, Discography & Grammy Awards',
    metaDescription: 'Read Adele’s verified biography covering her London upbringing, studio albums 19, 21, 25, and 30, and Grammy and Oscar achievements.',
  },
  {
    _id: 'art-3',
    title: 'Zendaya: Oakland Stage Roots, Emmy History, and Modern Cinema',
    slug: 'zendaya-biography',
    readTime: '5 min read',
    excerpt:
      'From Oakland performing arts training to becoming the youngest two-time Emmy winner for Outstanding Lead Actress in a Drama Series.',
    body: `
      <h2 id="introduction">Introduction</h2>
      <p>Zendaya Maree Stoermer Coleman is an American actress, producer, and singer whose career bridges studio blockbusters, prestige drama, and international fashion influence.</p>

      <h2 id="early-life">Early Life and Education</h2>
      <p>Born in Oakland, California, on September 1, 1996, Zendaya spent her youth around the California Shakespeare Theater, where her mother worked as house manager. She trained at the Oakland School for the Arts and the American Conservatory Theater before landing her first television series role.</p>

      <h2 id="career-achievements">Career and Achievements</h2>
      <p>After rising to prominence on Disney Channel’s <em>Shake It Up</em> and <em>K.C. Undercover</em>, Zendaya transitioned to feature cinema in <em>Spider-Man: Homecoming</em> (2017) and <em>The Greatest Showman</em> (2017). Her performance as Rue Bennett in HBO’s <em>Euphoria</em> earned two Primetime Emmy Awards (2020 and 2022). She later anchored Denis Villeneuve’s <em>Dune</em> films and co-produced and starred in Luca Guadagnino’s <em>Challengers</em> (2024).</p>

      <h2 id="filmography">Selected Filmography</h2>
      <ul>
        <li><strong>Challengers</strong> (2024) — Tashi Duncan (Actor &amp; Producer)</li>
        <li><strong>Dune: Part Two</strong> (2024) — Chani</li>
        <li><strong>Euphoria</strong> (2019–present) — Rue Bennett (2× Primetime Emmy Winner)</li>
        <li><strong>Spider-Man Trilogy</strong> (2017–2021) — Michelle &ldquo;MJ&rdquo; Jones</li>
      </ul>
    `,
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
      {
        question: 'Which historic Emmy record does Zendaya hold?',
        answer: 'In 2022, she became the youngest person to win two Primetime Emmy Awards for Outstanding Lead Actress in a Drama Series.',
      },
    ],
    sources: [
      { title: 'Television Academy — Emmy Awards Database', url: 'https://www.emmys.com/' },
    ],
    categoryId: MOCK_CATEGORIES[1],
    authorId: MOCK_AUTHORS[0],
    tags: ['actors', 'emmys', 'hollywood'],
    status: 'published',
    isFeatured: true,
    isTrending: true,
    publishedAt: '2026-10-25T15:00:00.000Z',
    updatedAt: '2026-11-21T11:20:00.000Z',
    seoTitle: 'Zendaya Biography: Early Life, Euphoria Emmys, Dune & Filmography',
    metaDescription: 'Explore Zendaya’s verified profile, Oakland theatre training, Primetime Emmy history, Dune franchise roles, and producing credits.',
  },
  {
    _id: 'art-4',
    title: 'Marques Brownlee (MKBHD): Building an Independent Tech Media Studio',
    slug: 'marques-brownlee-biography',
    readTime: '5 min read',
    excerpt:
      'How a New Jersey college student turned early hardware reviews into one of the most influential independent technology channels on the web.',
    body: `
      <h2 id="introduction">Introduction</h2>
      <p>Marques Brownlee, widely known online as MKBHD, is an American technology reviewer, producer, and professional ultimate frisbee player who helped establish cinema-grade production standards for YouTube journalism.</p>

      <h2 id="early-life">Early Life and Education</h2>
      <p>Born in Maplewood, New Jersey, on December 3, 1993, Brownlee uploaded his first technology videos while still in high school. He graduated from the Howe School at Stevens Institute of Technology in 2015 with a degree in business and information technology.</p>

      <h2 id="career-achievements">Career and Achievements</h2>
      <p>Over more than a decade of independent publishing, Brownlee expanded MKBHD into a multi-channel studio producing <em>Waveform: The MKBHD Podcast</em>, <em>Auto Focus</em>, and long-form interviews with engineers and executives across consumer electronics. Outside digital media, he won a 2022 WFDF World Ultimate Club Championship title with the New York PoNY team.</p>
    `,
    heroImage: {
      url: '/images/blog-marques-brownlee.jpg',
      altText: 'Minimalist matte-black cinema camera rig and broadcast podcast microphone in a modern creator studio with warm golden tungsten lighting',
      credit: 'CelebScope Original Editorial Photography',
      caption: 'Independent digital media production milestones of Marques Brownlee (MKBHD).',
    },
    quickFacts: [
      { label: 'Profession', value: 'Digital Creator, Tech Reviewer, Athlete' },
      { label: 'Nationality', value: 'American' },
      { label: 'Education', value: 'Stevens Institute of Technology (B.S., 2015)' },
      { label: 'Known For', value: 'MKBHD, Waveform Podcast, Auto Focus' },
    ],
    faqs: [
      {
        question: 'What does MKBHD stand for?',
        answer: 'MKBHD combines Marques Keith Brownlee’s initials (MKB) with HD for High Definition.',
      },
    ],
    sources: [
      { title: 'Stevens Institute of Technology — Alumni Features', url: 'https://www.stevens.edu/' },
    ],
    categoryId: MOCK_CATEGORIES[3],
    authorId: MOCK_AUTHORS[1],
    tags: ['influencers', 'creators', 'digital-media'],
    status: 'published',
    isFeatured: false,
    isTrending: true,
    publishedAt: '2026-11-02T09:30:00.000Z',
    updatedAt: '2026-11-19T16:10:00.000Z',
    seoTitle: 'Marques Brownlee (MKBHD) Biography: Education, Studio & Career',
    metaDescription: 'Verified biography of tech creator Marques Brownlee (MKBHD), covering his Stevens Institute degree, media studio, and ultimate frisbee career.',
  },
  {
    _id: 'art-5',
    title: 'Billie Eilish: Bedroom Recording, Songwriting Partnership, and Dual Oscars',
    slug: 'billie-eilish-biography',
    readTime: '6 min read',
    excerpt:
      'Tracing Billie Eilish’s collaborative songwriting process with Finneas O’Connell and her historic sweep across the Grammys and Academy Awards.',
    body: `
      <h2 id="introduction">Introduction</h2>
      <p>Billie Eilish Pirate Baird O’Connell is an American singer and songwriter who emerged in 2015 with the SoundCloud release &ldquo;Ocean Eyes&rdquo; and became the youngest person in history to win two Academy Awards.</p>

      <h2 id="early-life">Early Life and Education</h2>
      <p>Raised in Highland Park, Los Angeles, by actors and musicians Maggie Baird and Patrick O’Connell, Eilish was homeschooled alongside her older brother Finneas and sang in the Los Angeles Children’s Chorus from age eight.</p>

      <h2 id="career-achievements">Career and Achievements</h2>
      <p>Her debut album <em>When We All Fall Asleep, Where Do We Go?</em> (2019), recorded largely in Finneas’s bedroom studio, swept all four major Grammy categories in 2020. She won Academy Awards for Best Original Song for &ldquo;No Time to Die&rdquo; (2022) and &ldquo;What Was I Made For?&rdquo; (2024), followed by her third album <em>Hit Me Hard and Soft</em> (2024).</p>

      <h2 id="discography">Studio Discography</h2>
      <ul>
        <li><strong>When We All Fall Asleep, Where Do We Go?</strong> (2019)</li>
        <li><strong>Happier Than Ever</strong> (2021)</li>
        <li><strong>Hit Me Hard and Soft</strong> (2024)</li>
      </ul>
    `,
    heroImage: {
      url: '/images/blog-billie-eilish.jpg',
      altText: 'Intimate moody analog recording studio with glowing vintage mixing console, acoustic guitar, and studio condenser microphone',
      credit: 'CelebScope Original Editorial Photography',
      caption: 'Songwriting craft and award milestones in Billie Eilish’s recording career.',
    },
    quickFacts: [
      { label: 'Profession', value: 'Singer, Songwriter' },
      { label: 'Born', value: 'December 18, 2001 (Los Angeles, California, USA)' },
      { label: 'Collaborator', value: 'Finneas O’Connell' },
      { label: 'Notable Honors', value: '9 Grammy Awards, 2 Academy Awards, 2 Golden Globes' },
    ],
    faqs: [
      {
        question: 'Which songs earned Billie Eilish her Academy Awards?',
        answer: 'She won Best Original Song alongside Finneas for "No Time to Die" (2022) and "What Was I Made For?" (2024).',
      },
    ],
    sources: [
      { title: 'Academy of Motion Picture Arts and Sciences — Official Database', url: 'https://www.oscars.org/' },
      { title: 'Recording Academy — GRAMMY Artist Profile', url: 'https://www.grammy.com/' },
    ],
    categoryId: MOCK_CATEGORIES[2],
    authorId: MOCK_AUTHORS[1],
    tags: ['singers', 'oscars', 'grammys'],
    status: 'published',
    isFeatured: true,
    isTrending: false,
    publishedAt: '2026-11-05T11:00:00.000Z',
    updatedAt: '2026-11-21T08:45:00.000Z',
    seoTitle: 'Billie Eilish Biography: Early Life, Discography & Dual Oscar Wins',
    metaDescription: 'Read Billie Eilish’s verified biography covering her Los Angeles upbringing, albums with Finneas, Grammy sweep, and two Academy Awards.',
  },
  {
    _id: 'art-6',
    title: 'Keanu Reeves: Independent Cinema, Action Craft, and Quiet Longevity',
    slug: 'keanu-reeves-biography',
    readTime: '6 min read',
    excerpt:
      'A four-decade portrait of Canadian actor Keanu Reeves—from cult comedies and 1990s science fiction landmarks to modern action choreography.',
    body: `
      <h2 id="introduction">Introduction</h2>
      <p>Keanu Charles Reeves is a Canadian actor whose career spans nearly forty years of independent drama, defining science fiction, and physically demanding action cinema. Equally noted for collaborative generosity on film sets, Reeves has remained an enduring presence across multiple generations of moviegoers.</p>

      <h2 id="early-life">Early Life and Education</h2>
      <p>Born in Beirut, Lebanon, on September 2, 1964, and raised primarily in Toronto, Canada, Reeves trained in theatre during his teens at the Etobicoke School of the Arts and worked on Toronto stages before relocating to Los Angeles in the mid-1980s.</p>

      <h2 id="career-achievements">Career and Achievements</h2>
      <p>Following early acclaim in <em>River’s Edge</em> (1986), <em>Bill &amp; Ted’s Excellent Adventure</em> (1989), and Gus Van Sant’s <em>My Own Private Idaho</em> (1991), Reeves became a global box-office lead in <em>Speed</em> (1994) and Lana and Lilly Wachowski’s <em>The Matrix</em> (1999). In 2014, he launched a second major franchise era with <em>John Wick</em>, partnering closely with stunt coordinators and directors to elevate practical action filmmaking.</p>

      <h2 id="filmography">Selected Filmography</h2>
      <ul>
        <li><strong>John Wick Series</strong> (2014–2023) — John Wick</li>
        <li><strong>The Matrix Trilogy &amp; Resurrections</strong> (1999–2021) — Thomas Anderson / Neo</li>
        <li><strong>Speed</strong> (1994) — Officer Jack Traven</li>
        <li><strong>My Own Private Idaho</strong> (1991) — Scott Favor</li>
        <li><strong>Point Break</strong> (1991) — Johnny Utah</li>
      </ul>
    `,
    heroImage: {
      url: '/images/blog-keanu-reeves.jpg',
      altText: 'Rain-slicked city street at night with vintage 35mm cinema camera and warm golden theatre marquee reflections',
      credit: 'CelebScope Original Editorial Photography',
      caption: 'Four decades of independent film and practical action craft in Keanu Reeves’s career.',
    },
    quickFacts: [
      { label: 'Full Name', value: 'Keanu Charles Reeves' },
      { label: 'Profession', value: 'Actor, Musician, Author' },
      { label: 'Born', value: 'September 2, 1964 (Beirut, Lebanon; raised in Toronto)' },
      { label: 'Known For', value: 'The Matrix, John Wick, Speed, Point Break' },
    ],
    faqs: [
      {
        question: 'Where did Keanu Reeves grow up?',
        answer: 'Although born in Beirut, Reeves spent most of his childhood and teenage years in Toronto, Canada, and holds Canadian citizenship.',
      },
      {
        question: 'Is Keanu Reeves also a musician?',
        answer: 'Yes. Reeves plays bass guitar in the alternative rock band Dogstar, which reunited to release new music and tour in 2023.',
      },
    ],
    sources: [
      { title: 'Toronto International Film Festival (TIFF) — Archival Credits', url: 'https://tiff.net/' },
      { title: 'Library of Congress — National Film Registry (The Matrix)', url: 'https://www.loc.gov/' },
    ],
    categoryId: MOCK_CATEGORIES[1],
    authorId: MOCK_AUTHORS[2],
    tags: ['actors', 'action-cinema', 'canadian-actors'],
    status: 'published',
    isFeatured: false,
    isTrending: false,
    publishedAt: '2026-11-08T13:00:00.000Z',
    updatedAt: '2026-11-18T12:00:00.000Z',
    seoTitle: 'Keanu Reeves Biography: Early Life, The Matrix, John Wick & Career',
    metaDescription: 'A verified profile of Canadian actor Keanu Reeves covering his Toronto theatre roots, The Matrix, John Wick, Dogstar, and selected filmography.',
  },
  {
    _id: 'art-7',
    title: 'The Weeknd (Abel Tesfaye): From Toronto Mixtapes to Stadium Records',
    slug: 'the-weeknd-biography',
    readTime: '6 min read',
    excerpt:
      'How Canadian singer-songwriter Abel Tesfaye evolved from anonymous 2011 online mixtapes into a record-setting global stadium headliner.',
    body: `
      <h2 id="introduction">Introduction</h2>
      <p>Abel Makkonen Tesfaye, known professionally as The Weeknd, is a Canadian singer, songwriter, and record producer whose dark synth-pop and R&amp;B production reshaped mainstream radio over the past decade.</p>

      <h2 id="early-life">Early Life and Musical Beginnings</h2>
      <p>Born in Toronto, Ontario, on February 16, 1990, to Ethiopian immigrant parents, Tesfaye grew up in Scarborough immersed in Amharic music, soul, and post-punk. In 2011, he released three free digital mixtapes—<em>House of Balloons</em>, <em>Thursday</em>, and <em>Echoes of Silence</em>—which drew widespread critical acclaim before being remastered as <em>Trilogy</em> (2012).</p>

      <h2 id="career-achievements">Career and Achievements</h2>
      <p>Tesfaye achieved mainstream breakthroughs with <em>Beauty Behind the Madness</em> (2015) and <em>Starboy</em> (2016), followed by <em>After Hours</em> (2020), whose single &ldquo;Blinding Lights&rdquo; became Billboard’s top Hot 100 song of all time. He headlined the Super Bowl LV Halftime Show in 2021 and mounted the record-grossing <em>After Hours til Dawn</em> global stadium tour.</p>

      <h2 id="discography">Selected Studio Albums</h2>
      <ul>
        <li><strong>Kiss Land</strong> (2013)</li>
        <li><strong>Beauty Behind the Madness</strong> (2015)</li>
        <li><strong>Starboy</strong> (2016)</li>
        <li><strong>After Hours</strong> (2020)</li>
        <li><strong>Dawn FM</strong> (2022)</li>
      </ul>
    `,
    heroImage: {
      url: '/images/blog-the-weeknd.jpg',
      altText: 'Vast sold-out stadium concert stage illuminated by golden architectural light beams cutting through atmospheric night haze',
      credit: 'CelebScope Original Editorial Photography',
      caption: 'From independent Toronto mixtapes to international stadium touring milestones.',
    },
    quickFacts: [
      { label: 'Full Name', value: 'Abel Makkonen Tesfaye' },
      { label: 'Profession', value: 'Singer, Songwriter, Record Producer' },
      { label: 'Born', value: 'February 16, 1990 (Toronto, Ontario, Canada)' },
      { label: 'Notable Honors', value: '4 Grammy Awards, 20 Billboard Music Awards, 22 Juno Awards' },
    ],
    faqs: [
      {
        question: 'What were The Weeknd’s first major releases?',
        answer: 'He first gained acclaim through three 2011 mixtapes: House of Balloons, Thursday, and Echoes of Silence, later compiled as Trilogy (2012).',
      },
    ],
    sources: [
      { title: 'Recording Academy — GRAMMY Artist Profile', url: 'https://www.grammy.com/' },
      { title: 'JUNO Awards Official Winners Archive', url: 'https://junoawards.ca/' },
    ],
    categoryId: MOCK_CATEGORIES[2],
    authorId: MOCK_AUTHORS[1],
    tags: ['singers', 'canadian-music', 'stadium-tours'],
    status: 'published',
    isFeatured: false,
    isTrending: true,
    publishedAt: '2026-11-10T10:30:00.000Z',
    updatedAt: '2026-11-22T09:15:00.000Z',
    seoTitle: 'The Weeknd (Abel Tesfaye) Biography: Mixtapes, Albums & Awards',
    metaDescription: 'Verified biography of Canadian artist Abel Tesfaye (The Weeknd), covering his Toronto origins, Trilogy mixtapes, Blinding Lights, and global touring.',
  },
  {
    _id: 'art-8',
    title: 'Emma Chamberlain: From Authentic Vlogs to Specialty Coffee and Fashion Front Rows',
    slug: 'emma-chamberlain-biography',
    readTime: '5 min read',
    excerpt:
      'Examining how California creator Emma Chamberlain redefined conversational video editing, launched a beverage brand, and crossed into luxury fashion.',
    body: `
      <h2 id="introduction">Introduction</h2>
      <p>Emma Frances Chamberlain is an American digital creator, podcaster, and entrepreneur who rose to prominence in the late 2010s by replacing polished influencer conventions with candid, fast-paced visual storytelling.</p>

      <h2 id="early-life">Early Life and Digital Breakthrough</h2>
      <p>Born in San Bruno, California, on May 22, 2001, Chamberlain launched her YouTube channel in 2017 while attending high school in the San Francisco Bay Area. Her relatable everyday vlogs and distinct editing rhythm quickly attracted millions of subscribers and earned a Streamy Award for Breakout Creator in 2018.</p>

      <h2 id="career-achievements">Business Ventures and Media Expansion</h2>
      <p>In 2019, she founded <strong>Chamberlain Coffee</strong>, expanding from direct-to-consumer specialty roasts into national retail distribution across North America. She also hosts the podcast <em>Anything Goes</em> and has served as a red-carpet correspondent for <em>Vogue</em> at the Met Gala, alongside brand ambassadorships with Cartier and Lancôme.</p>
    `,
    heroImage: {
      url: '/images/blog-emma-chamberlain.jpg',
      altText: 'Sunlit Parisian cafe table with artisan ceramic espresso cup, vintage 35mm film camera, and linen notebook in warm gold tones',
      credit: 'CelebScope Original Editorial Photography',
      caption: 'From independent YouTube vlogging to specialty coffee entrepreneurship and luxury fashion.',
    },
    quickFacts: [
      { label: 'Full Name', value: 'Emma Frances Chamberlain' },
      { label: 'Profession', value: 'Digital Creator, Podcaster, Entrepreneur' },
      { label: 'Born', value: 'May 22, 2001 (San Bruno, California, USA)' },
      { label: 'Notable Ventures', value: 'Chamberlain Coffee, Anything Goes Podcast' },
    ],
    faqs: [
      {
        question: 'When did Emma Chamberlain launch Chamberlain Coffee?',
        answer: 'Chamberlain founded her specialty coffee company, Chamberlain Coffee, in late 2019.',
      },
    ],
    sources: [
      { title: 'Time Magazine — 25 Most Influential People on the Internet', url: 'https://time.com/' },
      { title: 'Vogue — Met Gala Correspondent Coverage', url: 'https://www.vogue.com/' },
    ],
    categoryId: MOCK_CATEGORIES[3],
    authorId: MOCK_AUTHORS[1],
    tags: ['influencers', 'fashion', 'entrepreneurs'],
    status: 'published',
    isFeatured: false,
    isTrending: false,
    publishedAt: '2026-11-12T15:45:00.000Z',
    updatedAt: '2026-11-20T17:00:00.000Z',
    seoTitle: 'Emma Chamberlain Biography: YouTube Roots, Coffee Brand & Fashion',
    metaDescription: 'Read Emma Chamberlain’s verified biography covering her California roots, YouTube breakthrough, Chamberlain Coffee, and Vogue Met Gala hosting.',
  },
  {
    _id: 'art-9',
    title: 'How Major Film Awards Verify Voting, Eligibility, and Historic Milestones',
    slug: 'how-major-film-awards-work',
    readTime: '5 min read',
    excerpt:
      'An editorial explainer detailing how the Oscars, BAFTAs, and Emmys determine eligibility, peer-branch voting, and official archival records.',
    body: `
      <h2 id="introduction">Introduction</h2>
      <p>Major entertainment honors—including the Academy Awards, the British Academy Film Awards (BAFTA), and the Primetime Emmy Awards—serve as primary benchmarks when documenting public careers. Understanding their official eligibility rules helps readers separate confirmed honors from publicity claims.</p>

      <h2 id="peer-voting">Peer-Branch Nominations and Voting</h2>
      <p>Within the Academy of Motion Picture Arts and Sciences, specialized branches (such as Actors, Directors, and Cinematographers) nominate peers in their respective crafts, while the full voting membership selects final winners under independent accounting oversight.</p>

      <h2 id="archival-sourcing">Why Official Databases Matter</h2>
      <p>CelebScope verifies every award citation directly against published academy archives rather than secondary social posts, ensuring profiles reflect accurate ceremony years, categories, and co-recipients.</p>
    `,
    heroImage: {
      url: '/images/blog-film-awards.jpg',
      altText: 'Grand Art Deco cinema awards auditorium with crimson velvet seats, golden architectural balconies, and glowing stage spotlight',
      credit: 'CelebScope Original Editorial Photography',
      caption: 'Understanding peer voting and archival verification across major international entertainment awards.',
    },
    quickFacts: [
      { label: 'Topic', value: 'Entertainment Industry & Awards' },
      { label: 'Covered Bodies', value: 'AMPAS (Oscars), BAFTA, Television Academy (Emmys)' },
      { label: 'Verification Standard', value: 'Primary Official Archives' },
    ],
    faqs: [
      {
        question: 'Who votes on Academy Award acting nominations?',
        answer: 'Members of the Actors Branch of the Academy nominate performers, and the entire Academy voting membership votes on final winners.',
      },
    ],
    sources: [
      { title: 'Oscars Rules & Eligibility', url: 'https://www.oscars.org/' },
      { title: 'BAFTA Rulebooks', url: 'https://www.bafta.org/' },
    ],
    categoryId: MOCK_CATEGORIES[4],
    authorId: MOCK_AUTHORS[2],
    tags: ['entertainment', 'awards', 'editorial'],
    status: 'published',
    isFeatured: false,
    isTrending: false,
    publishedAt: '2026-11-15T14:00:00.000Z',
    updatedAt: '2026-11-22T10:15:00.000Z',
    seoTitle: 'How Major Film & TV Awards Verify Eligibility and Voting | CelebScope',
    metaDescription: 'Learn how the Oscars, BAFTAs, and Primetime Emmys manage branch voting, eligibility windows, and official archival records.',
  },
  {
    _id: 'art-10',
    title: 'Inside the Modern Biography Boom: Why Verified Profiles Outlast Gossip',
    slug: 'verified-biographies-entertainment-journalism',
    readTime: '4 min read',
    excerpt:
      'Why international readers increasingly seek transparent citations, accurate filmographies, and clear update histories over speculative celebrity sites.',
    body: `
      <h2 id="introduction">Introduction</h2>
      <p>Across the United States, United Kingdom, Canada, and Australia, search behavior around public figures has matured. Readers arriving after a film premiere, album release, or award broadcast want concise, trustworthy context—not clickbait speculation.</p>

      <h2 id="standards-matter">Why Primary Sources Build Lasting Authority</h2>
      <p>Low-quality biography blogs frequently recycle unverified birth dates, fabricated net-worth numbers, and unattributed relationship rumours. By contrast, editorial publications that link directly to official press notes, award registries, and verified interviews earn durable reader trust.</p>

      <h2 id="celebscope-approach">The CelebScope Approach</h2>
      <p>Every CelebScope profile follows a clear structure—verified quick facts, career milestones, relevant filmography or discography, and transparent correction links—so readers can verify every claim themselves.</p>
    `,
    heroImage: {
      url: '/images/blog-editorial-journalism.jpg',
      altText: 'Senior magazine editor dark walnut desk lit by a warm brass lamp with archival press folders, hardcover film encyclopedias, and camera lens',
      credit: 'CelebScope Original Editorial Photography',
      caption: 'Transparent sourcing and factual corrections form the backbone of modern biographical journalism.',
    },
    quickFacts: [
      { label: 'Section', value: 'Entertainment & Media Desk' },
      { label: 'Editorial Focus', value: 'Primary Sourcing, Transparency & Reader Trust' },
      { label: 'Published By', value: 'CelebScope Editorial Desk' },
    ],
    faqs: [
      {
        question: 'How does CelebScope handle corrections?',
        answer: 'Readers can report factual updates via our Contact page with a primary source link; confirmed updates are reflected promptly with an updated timestamp.',
      },
    ],
    sources: [
      { title: 'Society of Professional Journalists — Code of Ethics', url: 'https://www.spj.org/' },
    ],
    categoryId: MOCK_CATEGORIES[4],
    authorId: MOCK_AUTHORS[0],
    tags: ['entertainment', 'journalism', 'editorial'],
    status: 'published',
    isFeatured: false,
    isTrending: false,
    publishedAt: '2026-11-18T11:00:00.000Z',
    updatedAt: '2026-11-23T09:30:00.000Z',
    seoTitle: 'Why Verified Celebrity Biographies Outlast Gossip | CelebScope',
    metaDescription: 'An editorial look at why primary-sourced biographies, transparent citations, and accurate career archives build lasting reader trust.',
  },
];
