import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productBrand: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productSeller: {
      type: String,
      required: true,
    },
    productShippingOrigin: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductSchema = mongoose.model("ProductSchema", productSchema);
