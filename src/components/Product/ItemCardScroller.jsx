import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Services/Reducers/productReducer";
import ItemCardSkeleton from "../Skeletons/ItemCard";
import ItemCard from "./ItemCard";
const skeletons = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 4, 5];

const ItemCardScroller = () => {
  const { data } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    dispatch(getAllProducts());
  };

  useEffect(() => {}, [data]);
  if (data.length > 0) {
    return (
      <div className="flex pb-10 w-fit gap-5">
        {data.map((item) => {
          return (
            <div key={item.product_id} className="w-[240px] h-[300px]">
              <ItemCard product={item} />
            </div>
          );
        })}
      </div>
    );
  } else
    return (
      <div className="flex pb-5 w-fit gap-5">
        {skeletons.map((item) => {
          return (
            <div className="w-[240px] h-[300px]">
              <ItemCardSkeleton />
            </div>
          );
        })}
      </div>
    );
};

export default ItemCardScroller;
