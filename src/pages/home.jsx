import React, { useEffect } from "react";
import ItemCard from "../components/Product/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import {
  extraReducers,
  getAllProducts,
} from "../Services/Reducers/productReducer";
import ItemCardSkeleton from "../components/Skeletons/ItemCard";
import AddvertiseSection from "../components/Banner";
const skeletons = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 4, 5];
const Home = () => {
  const dispatch = useDispatch();
  const {
    data: product,
    isLoading,
    isError,
  } = useSelector((state) => state.productReducer);
  const [userData, setUserData] = React.useState();

  useEffect(() => {
    getData();

  }, [userData]);

  React.useEffect(() => {
    document.title='My Shop';
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);

  const getData = async () => {
    dispatch(getAllProducts());
  };
  return (
    <div className="relative w-full h-full pt-20 pb-10 px-10 overflow-x-hidden">
      <div className="advertise_section h-fit mb-10">
          <AddvertiseSection />
        </div>
      <div class="grid grid-cols-5 gap-10">
        {isLoading
          ? skeletons.map((item) => {
              return <ItemCardSkeleton />;
            })
          : product?.map((item, index) => {
              return <ItemCard product={item} key={item.product_id} />;
            })}
      </div>
    </div>
  );
};

export default Home;
