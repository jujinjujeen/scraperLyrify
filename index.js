const getLyrics = require('./app/getLyrics');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/lyrics/:band/:song', async (req, res) => {
    const { band, song } = req.params;
    console.log(band, song);
    const lyrics = await getLyrics(`${band} ${song}`);
    if (lyrics) {
        res.send(lyrics);
    } else {
        res
            .status(404)
            .send('Not Found!')
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
