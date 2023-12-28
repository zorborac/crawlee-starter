import cheerio, { CheerioAPI } from "cheerio";
import { Post } from "./interfaces";

// FOR QUICK ITERATION AND SCRATCH STUFF.
let IS_DEBUG = false; // change to use internal cheerio instead of passed frpom crawler

async function scratch() {
  // await scrapeLi(cheerio, ul).then((model) => console.log(model, model.length));
  // await scrapeTable(undefined, latestHtml).then((model) => console.log(model));
}
// scratch().catch(console.error);
