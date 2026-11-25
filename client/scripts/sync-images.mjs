import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\91df2026-6e6c-4fbb-aead-9715b78947fe';
const DST_DIR = path.resolve(__dirname, '../public/images');

const FILES = [
  ['blog_cillian_murphy_1795605361122.jpg', 'blog-cillian-murphy.jpg'],
  ['blog_zendaya_1795605385182.jpg', 'blog-zendaya.jpg'],
  ['blog_keanu_reeves_1795605362889.jpg', 'blog-keanu-reeves.jpg'],
  ['blog_adele_1795605362194.jpg', 'blog-adele.jpg'],
  ['blog_billie_eilish_1795605366791.jpg', 'blog-billie-eilish.jpg'],
  ['blog_the_weeknd_1795605379611.jpg', 'blog-the-weeknd.jpg'],
  ['blog_marques_brownlee_1795605380977.jpg', 'blog-marques-brownlee.jpg'],
  ['blog_emma_chamberlain_1795605382175.jpg', 'blog-emma-chamberlain.jpg'],
  ['blog_film_awards_v2_1795605408800.jpg', 'blog-film-awards.jpg'],
  ['blog_editorial_journalism_1795605390241.jpg', 'blog-editorial-journalism.jpg'],
];

fs.mkdirSync(DST_DIR, { recursive: true });

let copied = 0;
for (const [srcName, dstName] of FILES) {
  const from = path.join(SRC_DIR, srcName);
  const to = path.join(DST_DIR, dstName);
  if (!fs.existsSync(from)) {
    console.error(`Missing source image: ${from}`);
    continue;
  }
  fs.copyFileSync(from, to);
  copied++;
  console.log(`Copied -> public/images/${dstName}`);
}

console.log(`\nDone! ${copied}/${FILES.length} editorial images are now in client/public/images/`);
