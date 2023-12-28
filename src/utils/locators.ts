import type { Page, Locator } from "playwright";
// UNUSED, LLM generasted selectors better
export async function getParentLocator(childHandle: Locator) {
  const parentHandle = await childHandle.locator("..");
  return parentHandle;
}

export async function getCardHtml(page: Page, headingText: string) {
  const headingElement = await page.getByRole("heading"); //, { name: startsWithRegex });
  const cardElementHandle = await getParentLocator(headingElement);

  const cardHTML = await cardElementHandle.innerHTML();

  return cardHTML;
}
