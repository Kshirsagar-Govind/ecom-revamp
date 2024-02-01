import React from "react";
import ItemImage from "../../Assets/test.jpg";
const ProductViewSkeleton = () => {
  return (
    <div className="w-screen overflow-x-hidden h-screen mt-12 px-5 py-5">
      <div className="product-section w-full h-screen flex">
        <div className="w-2/4 h-2/3 mr-5 animate-pulse p-[5px] rounded-sm text-center bg-white relative hover:shadow-lg hover:-translate-y-[2px] transition-transform cursor-pointer"></div>
        <div className="relative w-full">
          <div className="h-2.5 mt-14 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

          <div className="w-full h-[2px] my-2 bg-primary"></div>

          <div className="features w-full flex gap-4 ml-4">
            <div className="features-list w-3/6">
              <div className="h-2.5 bg-white rounded-full dark:bg-white w-48 mb-4"></div>
              <div className="h-2.5 bg-white rounded-full dark:bg-white w-48 mb-4"></div>
              <div className="h-2.5 bg-white rounded-full dark:bg-white w-48 mb-4"></div>
              <div className="h-2.5 bg-white rounded-full dark:bg-white w-48 mb-4"></div>
              <div className="h-2.5 bg-white rounded-full dark:bg-white w-48 mb-4"></div>
              <div className="h-2.5 bg-white rounded-full dark:bg-white w-48 mb-4"></div>
              <div className="h-2.5 bg-white rounded-full dark:bg-white w-48 mb-4"></div>
            </div>
            <div className="features-list w-3/6">
              <div className="h-2.5 bg-white rounded-full dark:bg-white w-48 mb-4"></div>
              <div className="h-2.5 bg-white rounded-full dark:bg-white w-48 mb-4"></div>
              <div className="h-2.5 bg-white rounded-full dark:bg-white w-48 mb-4"></div>
              <div className="h-2.5 bg-white rounded-full dark:bg-white w-48 mb-4"></div>
              <div className="h-2.5 bg-white rounded-full dark:bg-white w-48 mb-4"></div>
              <div className="h-2.5 bg-white rounded-full dark:bg-white w-48 mb-4"></div>
              <div className="h-2.5 bg-white rounded-full dark:bg-white w-48 mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewSkeleton;
