const getPage = require('./getPage');
const db = require('./db');

const getLyricsGenius = async (browser, song) => {
    const page = await getPage(browser);
    const query = encodeURI(song.toLowerCase());
    await page.goto(`https://genius.com/search?q=${query}`);
    await page.click(`search-result-item > div`);
    await page.waitForSelector('.lyrics');
    const text = await page.evaluate(() => {
        return document.querySelector('.lyrics').innerText;
    });
    return { type: 'genius', text};
}

const getLyricsGoogle = async (browser, song) => {
    const page = await getPage(browser);
    const query = song.toLowerCase().replace(/ /gi, '+');
    await page.goto(`https://www.google.com/search?q=${query}`);
    await page.waitForSelector('g-expandable-content');
    const text = await page.evaluate(() => {
        const div = document.createElement('div');
        div.innerHTML = document.querySelectorAll('g-expandable-content')[1].innerHTML.replace(/<\/span>/g, '</span>\r\n');
        return div.innerText;
    });
    return { type: 'google', text};
}

const getLyricsMusixmatch = async (browser, song) => {
    const page = await getPage(browser);
    const query = encodeURI(song.toLowerCase());
    await page.goto(`https://www.musixmatch.com/search/${query}`);
    await page.click('.track-card');
    await page.waitForSelector('.mxm-lyrics');
    const text = await page.evaluate(() => {
        const el = document.querySelector('.mxm-lyrics .mxm-lyrics span').textContent;
        const gt = el.indexOf('googletag'), end = el.indexOf('});');
        if(gt !== -1 && end !== -1) {
            return el.slice(0, gt) + el.slice(end+3);
        }
        return el;
    });
    return { type: 'musixmatch', text};
}

const getLyricsFromDb = async (song) => {
    const lyrics = await db.get(song);
    return lyrics;
}

const setLyricsToDb = (song, lyrics) => {
    db.set(song, lyrics);
}

module.exports = {
    getLyricsGenius,
    getLyricsGoogle,
    getLyricsMusixmatch,
    getLyricsFromDb,
    setLyricsToDb
}