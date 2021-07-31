import $, { Cheerio, Element } from "cheerio";
import {
  PRODUCT_PRICE_HTML_SELECTOR,
  REGEX_TO_FILTER_NEXT_LINE,
} from "./config";

class ProductPriceService {
  async checkPrice(html: string): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        $(PRODUCT_PRICE_HTML_SELECTOR, html).each(function () {
          const value = $(this).text();
          if (value.match(REGEX_TO_FILTER_NEXT_LINE)) {
            resolve(
              Number(
                value.replace(REGEX_TO_FILTER_NEXT_LINE, "").replace("$", "")
              )
            );
          } else {
            resolve(0);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

export const productPriceService = new ProductPriceService();
