const getPage = require('./getPage');
const GeniusElement = `search-result-item > div`;

const getLyricsGenius = async (browser, song) => {
    const page = await getPage(browser);
    const query = encodeURI(song.toLowerCase());
    await page.goto(`https://genius.com/search?q=${query}`);
    await page.click(GeniusElement);
    await page.waitForSelector('.lyrics');
    const text = await page.evaluate(() => {
        return document.querySelector('.lyrics').innerText;
    });
    return text;
}

const getLyricsGoogle = async (browser, song) => {
    const page = await getPage(browser);
    const query = song.toLowerCase().replace(/ /gi, '+');
    await page.goto(`https://www.google.com/search?q=${query}`);
    const text = await page.evaluate(() => {
        return document.querySelectorAll('g-expandable-content')[1].innerText;
    });
    return text;
}

const getLyricsMusixmatch = async (browser, song) => {
    const page = await getPage(browser);
    const query = encodeURI(song.toLowerCase());
    await page.goto(`https://www.musixmatch.com/search/${query}`);
    await page.click('.track-card');
    await page.waitForSelector('.mxm-lyrics');
    const text = await page.evaluate(() => {
        return document.querySelector('.mxm-lyrics span').innerText;
    });
    return text;
}

module.exports = {
    getLyricsGenius,
    getLyricsGoogle,
    getLyricsMusixmatch
}