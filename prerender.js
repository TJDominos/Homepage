import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.resolve(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found. Make sure to run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(indexPath, 'utf-8');

// Define the routes and their specific Open Graph metadata
const routes = {
  '/': {
    title: 'Randseed | Decentralized Games. Free Play, Free Wins ',
    description: 'Play, connect, and win! Decentralized casual games for a fair gaming experience. Claim your free bonuses to play for fun and win crypto prizes.',
    image: 'https://storage.randseed.org/Thumbnail/HomeThumbnail.jpg',
  },
  '/money': {
    title: 'Randseed - Wallet and Rewards',
    description: 'Manage your bonus, WLT, deposits, and withdrawals.',
    image: 'https://your-cloudflare-r2-bucket.com/money-thumbnail.png',
  },
  '/rank': {
    title: 'Randseed - Leaderboard',
    description: 'Check out the top players on Randseed.',
    image: 'https://your-cloudflare-r2-bucket.com/rank-thumbnail.png',
  },
  '/payout': {
    title: 'Randseed - Payouts',
    description: 'View prize pools and payouts.',
    image: 'https://your-cloudflare-r2-bucket.com/payout-thumbnail.png',
  }
};

Object.entries(routes).forEach(([route, meta]) => {
  const dirPath = path.join(distPath, route);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Replace default meta tags or inject them if they don't exist
  let html = template;
  
  // Update title
  html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
  
  // We'll inject OG tags right before the closing </head>
  const ogTags = `
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:image" content="${meta.image}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${meta.image}" />
  `;
  
  // remove any existing og: tags just in case, though we will just inject cleanly
  html = html.replace(/<\/head>/, `${ogTags}\n  </head>`);

  const outputPath = path.join(dirPath, 'index.html');
  fs.writeFileSync(outputPath, html);
  console.log(`Generated prerendered HTML for ${route === '/' ? 'Home' : route} at ${outputPath}`);
});

console.log('Prerendering complete.');
