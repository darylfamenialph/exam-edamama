import $, { Cheerio, Element } from "cheerio";
import {
  PRODUCT_NAME_HTML_SELECTOR,
  REGEX_TO_FILTER_NEXT_LINE,
} from "./config";

class ProductNameServices {
  async checkName(html: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        $(PRODUCT_NAME_HTML_SELECTOR, html).each(function () {
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

export const productNameServices = new ProductNameServices();
