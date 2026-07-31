const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('dist/money/index.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

const sel1 = "div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(9) > a:nth-of-type(1)";
const el1 = document.querySelector(sel1);
console.log("Selector 1 matches:", el1 ? el1.outerHTML : "null");

const sel2 = "div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(8) > div:nth-of-type(1) > div:nth-of-type(2)";
const el2 = document.querySelector(sel2);
console.log("Selector 2 matches:", el2 ? el2.outerHTML : "null");

const sel3 = "div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(4)";
const el3 = document.querySelector(sel3);
console.log("Selector 3 matches:", el3 ? el3.className : "null");
