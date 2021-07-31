import puppeteer, { Page } from "puppeteer";

export const REGEX_TO_FILTER_NEXT_LINE = /\r?\n|\r/g;

export const PRODUCT_PRICE_HTML_SELECTOR = "#price_inside_buybox";
export const PRODUCT_NAME_HTML_SELECTOR = "#productTitle";
export const PRODUCT_DESCRIPTION_HTML_SELECTOR = "#feature-bullets";
export const PRODUCT_SHIPPING_ORIGIN_AND_SELLER_HTML_SELECTOR =
  "#tabular-buybox table";
export const PRODUCT_BRAND_HTML_SELECTOR =
  "#productOverview_feature_div div table";

export async function configureBrowser(url: string): Promise<Page> {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return page;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getPageHTML(page: Page): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      await page.reload();
      const html = await page.evaluate(() => document.body.innerHTML);

      resolve(html);
    } catch (err) {
      reject(err);
    }
  });
}
