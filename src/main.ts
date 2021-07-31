import { configureBrowser, getPageHTML } from "./web-scrappping/config";
import { productPriceService } from "./web-scrappping/product-price.services";
import $ from "cheerio";
import { productNameServices } from "./web-scrappping/product-name.services";
import { SAMPLE_ECOMMERCE_LINKS } from "./sample-data";
import { productSellerServices } from "./web-scrappping/product-seller.services";
import { productBrandServices } from "./web-scrappping/product-brand.services";
import { productShippingOriginServices } from "./web-scrappping/product-shipping-origin.services";
import { mongooseConnection } from "./mongo-db/config";
import { productServices } from "./mongo-db/product.services";

function main() {
  try {
    Promise.all(
      SAMPLE_ECOMMERCE_LINKS.map(async (link) => {
        console.log("Web Scraping Started...");
        const page = await configureBrowser(link);
        const htmlPage = await getPageHTML(page);

        const productName = await productNameServices.checkName(htmlPage);
        const productBrand = await productBrandServices.checkBrand(htmlPage);
        const productPrice = await productPriceService.checkPrice(htmlPage);
        const productSeller = await productSellerServices.checkSeller(htmlPage);
        const productShippingOrigin =
          await productShippingOriginServices.checkShippingOrigin(htmlPage);

        const mongoDbConnection = mongooseConnection(true);
        mongoDbConnection.once("open", async () => {
          try {
            console.log("Connected to Cloud");
            await productServices.AddNewProduct({
              productName,
              productBrand,
              productPrice,
              productSeller,
              productShippingOrigin,
            });
          } finally {
            mongoDbConnection.close();
          }
        });
      })
    );
  } catch (err) {
    console.log(err);
  }
}

main();
