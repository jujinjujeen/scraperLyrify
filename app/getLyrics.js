const raceSuccess = require('./raceSuccess');

const {
    getLyricsGenius,
    getLyricsGoogle,
    getLyricsMusixmatch,
    getLyricsFromDb,
    setLyricsToDb
} = require('./lyricsHelpers');


const getLyrics = async (browser, song) => {
    try {
        const lyrics = await getLyricsFromDb(song);
        if (lyrics) return lyrics;

        const { text, type } = await raceSuccess([
            getLyricsGenius(browser, song),
            getLyricsGoogle(browser, song),
            getLyricsMusixmatch(browser, song)
        ]);

        console.log(`Got lyrics from: ${type}`);
        setLyricsToDb(song, text);
        return text;
    } catch (e) {
        console.log('Problem occured fetching lyrics:', e)
    }
}

module.exports = getLyrics;
