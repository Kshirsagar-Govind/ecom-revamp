import axios from "axios";
import { REACT_APP_HOST } from "../lib/constants";

export const GetAllProducts = async () => {
  const res = await fetch(`${REACT_APP_HOST}/get-product-data`);
  const allProductsData = await res.json();
};
export const getSingleProduct = async (product_id) => {
  await fetch(`${REACT_APP_HOST}/get-product-data/${product_id}`)
    .then(async (res) => {
      const data = await res.json();
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  // _setProductImage(res.data.data.product_images[0].imgURL);
  // _setProductData(res.data.data);
};
