const fs = require('fs');
const { setUpRedirects } = require('@ankr.com/ci/setUpRedirects');

const redirects = JSON.parse(fs.readFileSync('./redirects.json'));

setUpRedirects(redirects, process.env.DOMAIN);
