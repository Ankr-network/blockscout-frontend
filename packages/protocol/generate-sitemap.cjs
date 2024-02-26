const { readdirSync, statSync, writeFileSync } = require('fs');
const https = require('https');
const path = require('path');
const packageJson = require('./package.json');

const ASSETS_FOLDER = 'build';
const PRIVATE_ROUTES = [
  /^enterprise/,
  /add$/,
  /^account/,
  /^projects/,
  /^settings/,
];

function getAllFiles(directoryPath, fileList = []) {
  const files = readdirSync(directoryPath);

  files.forEach(file => {
    const filePath = path.join(directoryPath, file);
    if (statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList); // Recursively call for subdirectories
    } else {
      fileList.push(filePath); // Add file path to the list
    }
  });

  return fileList.flatMap(item => item);
}

function getBlockchainsListUrl(env) {
  if (env === 'staging') {
    return 'https://staging.multi-rpc.com/api/v1/blockchain';
  }

  return 'https://next.multi-rpc.com/api/v1/blockchain';
}

function generateSitemap(homepage) {
  const lastModDate = new Date().toISOString();
  const changefreq = 'daily';
  const priority = '0.7';

  function getUrl(path) {
    return `<url><loc>${homepage}/${path}/</loc><lastmod>${lastModDate}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
  }

  const files = getAllFiles(ASSETS_FOLDER);
  const urls = files
    .filter(item => {
      if (/.+\/index.html$/.test(item)) {
        return true;
      }
    })
    .map(item => {
      return item
        .replace(new RegExp(`^build/`), '')
        .replace(new RegExp('/index.html$'), '');
    })
    .filter(item => {
      console.log('item', item);

      return !PRIVATE_ROUTES.find(route => route.test(item));
    })
    .map(item => getUrl(item))
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
<url><loc>${homepage}/</loc><lastmod>${lastModDate}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>
<url><loc>${homepage}/advanced-api/</loc><lastmod>${lastModDate}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>
<url><loc>${homepage}/pricing/</loc><lastmod>${lastModDate}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>
${urls}
</urlset>
`;
}

const HOMEPAGE = `https://www.ankr.com${packageJson.homepage}`;

writeFileSync('./build/sitemap.xml', generateSitemap(HOMEPAGE));
