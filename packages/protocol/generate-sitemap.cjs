const fs = require('fs');
const https = require('https');
const packageJson = require('./package.json');

function getBlockchainsListUrl(env) {
  if (env === 'staging') {
    return 'https://staging.multi-rpc.com/api/v1/blockchain';
  }

  return 'https://next.multi-rpc.com/api/v1/blockchain';
}

function downloadJSON(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, response => {
        let data = '';

        response.on('data', chunk => {
          data += chunk;
        });

        response.on('end', () => {
          resolve(JSON.parse(data));
        });
      })
      .on('error', err => {
        reject(new Error(`Error downloading file: ${err.message}`));
      });
  });
}

function generateSitemap(blockchainResponse, homepage) {
  const lastModDate = new Date().toISOString();
  const changefreq = 'daily';
  const priority = '0.7';


  const urls = blockchainResponse
    .map(blockchain => {
      if (blockchain.extends) {
        return undefined;
      }

      return `<url><loc>${homepage}/${blockchain.id}/</loc><lastmod>${lastModDate}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
    })
    .filter((item) => !!item)
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

downloadJSON(getBlockchainsListUrl(process.env.DOMAIN))
  .then(blockchainResponse => {
    fs.writeFileSync(
      './public/sitemap.xml',
      generateSitemap(blockchainResponse, HOMEPAGE),
    );
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
