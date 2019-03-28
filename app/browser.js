const puppeteer = require('puppeteer');

const browser = (async () => { 
    return await puppeteer.launch({ 
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--disable-accelerated-2d-canvas',
            '--disable-dev-shm-usage'
        ] 
    });
})();

module.exports = browser;
