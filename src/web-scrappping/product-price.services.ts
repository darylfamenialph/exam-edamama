import $, { Cheerio, Element } from "cheerio";
import { PRODUCT_PRICE_HTML_ID, REGEX_TO_FILTER_NEXT_LINE } from "./config";

class ProductPriceService {
  async checkPrice(html: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        $(PRODUCT_PRICE_HTML_ID, html).each(function () {
          const value = $(this).text();
          if (value.match(REGEX_TO_FILTER_NEXT_LINE)) {
            resolve(value.replace(REGEX_TO_FILTER_NEXT_LINE, ""));
          } else {
            resolve(value);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

export const productPriceService = new ProductPriceService();
