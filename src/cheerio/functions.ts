import type { CheerioAPI } from "cheerio";
import type { ScrapeModel } from "../interfaces";

export async function getModelData($: CheerioAPI, baseModel: ScrapeModel, html: string) {
  const parsed = $.load(html);
  let returnedModel: Record<string, unknown> = {};

  const errors: Record<string, string>[] = [];

  for (let key in baseModel) {
    const defaultValue = baseModel[key]?.default;
    const selector = baseModel[key]?.selector as string;
    const value = parsed(selector).text().trim();
    if (value) {
      if (typeof defaultValue === "number") {
        returnedModel[key] = Number(value);
      } else if (typeof defaultValue === "boolean") {
        returnedModel[key] = Boolean(value);
      } else returnedModel[key] = value;
    } else {
      // error handling is a bit aggressive, could be tweaked
      returnedModel[key] = defaultValue;
      errors.push({ key, value });
    }
  }

  return { ...returnedModel, errors: errors.length > 0 ? errors : undefined };
}
