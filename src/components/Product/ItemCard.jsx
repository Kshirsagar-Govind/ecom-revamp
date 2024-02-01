import React, { useEffect, useState } from "react";
import ItemImage from "../../Assets/test.jpg";
import { useNavigate } from "react-router-dom";
import { AverageRating } from "../../Services/services";
import axios from "axios";

const ItemCard = ({ product }) => {
  let history = useNavigate();
  const [rating, _setAvgRating] = useState(0);
  const show = () => {
    window.open(
      `${window.location.origin}/item-view-page/${product.product_id}`
    );
  };

  useEffect(() => {
    getProductReviews();
  }, [rating]);

  const getProductReviews = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_HOST}/get-product-review/${product.product_id}`
    );
    if (!res.data) return;
    const readyRating = AverageRating(res.data);
    _setAvgRating(readyRating.final_rating ? readyRating.final_rating : 0);
  };

  return (
    <div
      className="px-[15px] pt-[15px] rounded-sm text-center bg-white h-[320px] relative hover:shadow-lg hover:-translate-y-[2px] transition-transform cursor-pointer"
      onClick={show}
    >
      <div className="img">
        <div className="flex flex-col items-center">
          <img
            src={product.product_images[0].imgURL}
            className="h-[200px]"
            alt=""
          />
        </div>
        <div className="text-primary absolute bottom-0 left-0 w-full h-[100px] bg-white flex flex-col text-left px-3 py-2">
          <p className=""> {product.product_Name}</p>
          <div className="rnp">
            <div className="rating_container flex">
              <h6 className="flex py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-star"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#14b8a6"
                  fill="#14b8a6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                </svg>

                {rating.toString().length == 1
                  ? rating.toString() + ".0"
                  : rating.toString().substr(0, 3)}
              </h6>
            </div>
            <h6 className="heading_6">₹ {product.product_Price} /-</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
