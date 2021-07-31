import { ProductSchema } from "./product.schema";
import { Document } from "mongoose";

interface NewProduct {
  productName: string;
  productBrand: string;
  productPrice: number;
  productSeller: string;
  productShippingOrigin: string;
}

class ProductServices {
  async AddNewProduct({
    productName,
    productBrand,
    productPrice,
    productSeller,
    productShippingOrigin,
  }: NewProduct): Promise<void> {
    return new Promise((resolve, reject) => {
      const newProductSchema: Document<any> = new ProductSchema({
        productName,
        productBrand,
        productPrice,
        productSeller,
        productShippingOrigin,
      });
      newProductSchema
        .save()
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
}

export const productServices = new ProductServices();
