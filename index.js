const getText = require('./app/getLyrics');
const express = require('express');

const app = express();
const port = 3000;

app.get('/lyrics/:band/:song', async (req, res) => {
    const { band, song } = req.params;
    const lyrics = await getText(`${band} ${song}`);
    res.send(lyrics);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// getText('Massive Attack One Love').then((text) => {
//     console.log(text);
//     process.exit();
// });


