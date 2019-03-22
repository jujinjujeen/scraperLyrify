const puppeteer = require('puppeteer');
const raceSuccess = require('./raceSuccess');

const {
    getLyricsGenius,
    getLyricsGoogle,
    getLyricsMusixmatch
} = require('./lyricsHelpers');

const getLyrics = async (song) => {
    try {
        const browser = await puppeteer.launch();
        const text = await raceSuccess([
            getLyricsGenius(browser, song),
            getLyricsGoogle(browser, song),
            getLyricsMusixmatch(browser, song)
        ]);
        await browser.close();
        return text;
    } catch (e) {
        console.log(e)
    }
}

module.exports = getLyrics;