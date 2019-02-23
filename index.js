const puppeteer = require('puppeteer');
const { performance } = require('perf_hooks');

const element = `body 
> routable-page 
> ng-outlet 
> search-results-page 
> div > div.column_layout 
> div.column_layout-column_span.column_layout-column_span--primary 
> div:nth-child(1) 
> search-result-section 
> div > div:nth-child(2) 
> search-result-items 
> div > search-result-item > div`;

const getText = async (song) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const query = encodeURI(song.toLowerCase());
    await page.goto(`https://genius.com/search?q=${query}`);
    await page.click(element);
    await page.waitForSelector('.lyrics');
    const text = await page.evaluate(() => {
        return document.querySelector('.lyrics').innerText;
    })
    await browser.close();
    return text;
}

// performance.mark('scraping-start');
// performance.mark('scraping-end');
//     performance.measure(
//         "scraping",
//         "scraping-start",
//         "scraping-end"
//     );
getText('Massive Attack One Love').then((text) => {
    console.log(text);
    process.exit();
});
