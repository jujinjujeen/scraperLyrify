const getPage = async (browser) => {
    let page = await browser.newPage();
    await page.setViewport({ width: 1500, height: 800 });
    await page.setRequestInterception(true);

    page.on('request', (req) => {
        const type = req.resourceType();
        if (type == 'stylesheet' || type == 'font' || type == 'image') {
            req.abort();
        } else {
            req.continue();
        }
    });

    return page;
}

module.exports = getPage;