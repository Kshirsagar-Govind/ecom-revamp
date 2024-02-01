import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistProducts } from "../Services/Reducers/wishlistReducer";
import WishlistedItem from "../components/Product/WishlistedItem";
import Loader from "../components/alerts/loader";
import { useNavigate } from "react-router-dom";

const WishlistView = () => {
  const { wishlist, isLoading } = useSelector(
    (state) => state.wishlistReducer
  );
  const navigate = useNavigate(); 
  const [userData, setUserData] = React.useState();
  React.useEffect(() => {
    document.title='Wishlist'
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);
  const dispatch = useDispatch();
  React.useEffect(() => {
    userData && getWishlist();
  }, [userData]);

  const getWishlist = async () => {
      dispatch(getWishlistProducts(userData.user_id));
  };

  React.useEffect(() => {
  }, [wishlist]);

  if (isLoading) {
    return (
      <div className="dark-back just-center">
        <Loader />
      </div>
    );
  } else
    return (
      <div className="w-full h-full p-2 px-12 mt-24">
        <div className="mb-4">
        <h1 className="text-xl text-center text-primary-dark font-semibold">Your Wishlist</h1>
        </div>
        {userData && wishlist.length > 0 ? (
          wishlist.map((item, index) => {
            return (
              <div key={index} className="">
                <WishlistedItem
                  reload={() => getWishlist()}
                  product={item}
                  user_id={userData.user_id}
                />
              </div>
            );
          })
        ) : (
          <div className="just-center">
            <div className="flex flex-col items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-mood-empty"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#000000"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 10l.01 0" />
                <path d="M15 10l.01 0" />
                <path d="M9 15l6 0" />
              </svg>
              <h1 className="text-xl font-light">Your wishlist is empty...</h1>
              <button className="bg-primary px-3 py-1 text-ternary-dark"
              onClick={()=>navigate('/')}
              >
                Add now
              </button>
            </div>
          </div>
        )}
        {/* <WishlistedItem/> */}
      </div>
    );
};

export default WishlistView;
