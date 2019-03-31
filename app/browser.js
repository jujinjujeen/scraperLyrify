const puppeteer = require('puppeteer');

const buildBrowser = async () => {
    const browserInstance = await puppeteer.launch({
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--disable-accelerated-2d-canvas',
            '--disable-dev-shm-usage'
        ] 
    });
    return browserInstance;
};

module.exports = {
    buildBrowser
};
