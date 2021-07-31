import { configureBrowser, getPageHTML } from "./web-scrappping/config";
import { productPriceService } from "./web-scrappping/product-price.services";
import $ from "cheerio";
import { productNameServices } from "./web-scrappping/product-name.services";

async function main() {
  try {
    console.log("Configuring Puppeteer Browser...");
    const page = await configureBrowser(
      "https://www.amazon.com/Moen-Motionsense-Touchless-One-Handle-7594EWSRS/dp/B078VXHXLJ?ref_=Oct_DLandingS_D_9a05754e_60&smid=ATVPDKIKX0DER"
    );

    console.log("Getting HTML Page...");
    const htmlPage = await getPageHTML(page);

    console.log("Getting Product Details...");
    const price = await productPriceService.checkPrice(htmlPage);
    const name = await productNameServices.checkName(htmlPage);

    console.log("Name: ", name);
    console.log("Price: ", price);
  } catch (err) {
    console.log(err);
  }
}

main();
