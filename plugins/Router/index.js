//const { request } = require("express");
const path = require("path");
const Dataset = require("../dataset");
const Plugin = require("../plugin");
const fs = require('fs');

const Router = new Plugin("Router");

const pagesList = fs.readdirSync('./pages/').filter(x => !x.endsWith('.json'));

const pages = pagesList.map((x) => {
    return {src: x, url: `/${x.replace(`.html`, ``).replace(`index`, '')}`};
});

const findPage = (url) => {
    const file = JSON.parse(fs.readFileSync('./pages/pages.json').toString());

    const data = file.find(x => x.Url === url);

    return data;
}

//console.log(pages);

Router.Datasets.Pages = new Dataset({
    columns: [
        'Page',
        'Url',
        'Source',
        'Author',
    ],
    data: (
        () => {
            return pages.map(x => {
                let d = findPage(x.url);

                if (!d) return {Page: 'ERR_NOT_FOUND', Source: 'N/A', Url: x.url, Author: 'N/A'};

                return ({Page: d.Page, Source: x.src, Url: x.url, Author: d.Author})
            })
        }
    )()
});

Router.Handler = async (req, res, next) => {
    const url = req.url;

    if (url.startsWith('/crm')) return next();

    const page = Router.Datasets.Pages.data.find((p) => p.Url === url);

    console.log(page);

    if (!page) {
        return res.send(`<h2>404 Error: ${url} is not a valid page.</h2>`);
    }

    res.sendFile(path.join(__dirname, `../../pages/${page.Source}`));
};

module.exports = Router;