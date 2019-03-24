const puppeteer = require('puppeteer');
const raceSuccess = require('./raceSuccess');

const {
    getLyricsGenius,
    getLyricsGoogle,
    getLyricsMusixmatch,
    getLyricsFromDb,
    setLyricsToDb
} = require('./lyricsHelpers');


const getLyrics = async (song) => {
    try {
        const lyrics = await getLyricsFromDb(song);
        if (!lyrics) {
            const browser = await puppeteer.launch();
            const { text, type } = await raceSuccess([
                getLyricsGenius(browser, song),
                getLyricsGoogle(browser, song),
                getLyricsMusixmatch(browser, song)
            ]);
            console.log(`Got lyrics from: ${type}`);
            setLyricsToDb(song, text);
            await browser.close();
            return text;
        }

        return lyrics;
    } catch (e) {
        console.log('Problem occured fetching lyrics:', e)
    }
}

module.exports = getLyrics;