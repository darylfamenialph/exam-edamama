import {
  PRODUCT_SHIPPING_ORIGIN_AND_SELLER_HTML_SELECTOR,
  REGEX_TO_FILTER_NEXT_LINE,
} from "./config";
import $ from "cheerio";

class ProductSellerServices {
  async checkSeller(html: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        $(PRODUCT_SHIPPING_ORIGIN_AND_SELLER_HTML_SELECTOR, html).each(
          function () {
            const value = $(this)
              .children("tbody")
              .children("tr:nth-child(2)")
              .children("td:last")
              .children("span")
              .children("span:first")
              .text();
            if (value.match(REGEX_TO_FILTER_NEXT_LINE)) {
              resolve(value.replace(REGEX_TO_FILTER_NEXT_LINE, ""));
            } else {
              resolve(value);
            }
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }
}

export const productSellerServices = new ProductSellerServices();
