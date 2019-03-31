const express = require('express');
const morgan  = require('morgan');
const getLyrics = require('./app/getLyrics');
const { buildBrowser } = require('./app/browser');

const app = express();
app.use(morgan('tiny'));

app.get('/lyrics/:band/:song', async (req, res) => {
    const { band, song } = req.params;
    const browser = req.app.get('browserInstance');
    const lyrics = await getLyrics(browser, `${band} ${song}`);

    if (lyrics) {
        res.send(lyrics);
    } else {
        res
        .status(404)
        .send('Not Found!')
    }
});

const port = process.env.PORT || 3000;

(async () => {
    const browser = await buildBrowser();
    app.set('browserInstance', browser);

    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
})();
