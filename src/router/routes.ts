import { createPlaywrightRouter, KeyValueStore } from "crawlee";
import { getModelData } from "../cheerio/functions";

export const router = createPlaywrightRouter({});
// base action middleware, occurs in order they are registered
// just logs for now
router.use(async ({ request }) => {
  const { userData } = request;

  console.log("request label: ", request.label, { userData });
});

router.addHandler("HOME", async ({ page, request, parseWithCheerio, enqueueLinks }) => {
  console.log("request label: ", request.label, { userData: request.userData });
  const { userData } = request;
  const $ = await parseWithCheerio();

  const { baseModel, rootSelector } = userData;
  if (rootSelector) {
    const cards = $(rootSelector);
    if (cards.length === 0) {
      throw new Error("no cards found");
    }

    const toPersist = await Promise.all(
      cards.map(async (index, card) => {
        const cardHtml = $(card).html();
        if (!cardHtml) {
          throw new Error("no card html");
        }
        const cardData = await getModelData($, baseModel, cardHtml);
        return cardData;
      })
    );
    await KeyValueStore.setValue(request.label || "failure saving!!! ", toPersist);
    console.log("toPersist: ", "Success!");
  }
});

router.addHandler("USER_PAGE", async ({ page, request, parseWithCheerio }) => {
  // placeholder, would add what's needed IRL
});

router.addDefaultHandler(async ({ page, request, parseWithCheerio, enqueueLinks }) => {
  const { userData, label } = request;
  if (!userData.baseModel) {
    throw new Error("no base model");
  }
  console.log("request label: ", request.label, { userData });

  // not implemented- but probably would fallback to the getModelData logic
});
