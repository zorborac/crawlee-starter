import { PlaywrightCrawler, Configuration, Request, KeyValueStore } from "crawlee";
import { TargetData } from "./interfaces";
import { router } from "./router/routes";
import { BASE_URL, PROVIDED_INPUT_JSON, POST_MODEL_WITH_SELECTORS_GENERATED } from "./utils/constants";

let IS_HEADLESS = true;
Configuration.set("headless", IS_HEADLESS); // emable headless mode for prod
const pwCrawler = new PlaywrightCrawler({
  requestHandler: router,
});

async function main(scraperInput: TargetData[]) {
  const initialRequests = scraperInput.map((input) => {
    // throw at runtime
    if (!input.friendlyName || !input.path) {
      throw new Error("invalid input");
    }
    return new Request({
      url: `${BASE_URL}/${input.path}`,
      label: input.friendlyName,
      userData: {
        friendlyName: input.friendlyName,
        baseModel: input.baseModel || POST_MODEL_WITH_SELECTORS_GENERATED,
        rootSelector: input.rootSelector ?? null,
      },
    });
  });
  await pwCrawler.run(initialRequests);
  const finalPromises = scraperInput.map(async (input) => {
    const myData = await KeyValueStore.getValue(input.friendlyName);
    if (myData) {
      delete (myData as Record<string, unknown>).__crawlee;
      return myData;
    }
    return null;
  });
  const final = await Promise.all(finalPromises);
  console.log("FINAL OUTPUT");
  console.log(JSON.stringify(final, null, 2));
}

let inputJSON = PROVIDED_INPUT_JSON; // default to provided input
const args = process.argv.slice(2);
if (args.length > 0) {
  try {
    inputJSON = JSON.parse(args[0]);
    console.dir(JSON.parse(args[0]));
    console.log("using input from command line");
  } catch (e) {
    console.log("invalid input, using default");
  }
}

main(inputJSON).catch(console.error);
