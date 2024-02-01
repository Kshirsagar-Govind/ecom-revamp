import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/alerts/loader";
import { getCartProducts } from "../lib/features/cartReducer";
import CartItem from "../components/Product/CartItems";

const CartView = () => {
  const { cartlist, isLoading } = useSelector(
    (state) => state.cartlistReducer
  );
  const dispatch = useDispatch();
  const [userData, setUserData] = React.useState();
  React.useEffect(() => {
    document.title='Cart'
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);
  React.useEffect(() => {
    userData && getData();
  }, [userData]);
  const getData = async () => {
    dispatch(getCartProducts(userData.user_id));
  };

  React.useEffect(() => {
    console.log(cartlist, "----------------", userData);
  }, [cartlist]);

  if (isLoading || !userData) {
    return (
      <div className="dark-back just-center">
        <Loader />
      </div>
    );
  } else
    return (
      <div className="w-full overflow-x-hidden h-full p-2 px-12 mt-24">
           <div className="mb-4">
        <h1 className="text-xl text-center text-primary-dark font-semibold">Your Cart</h1>
        </div>
        {cartlist.length > 0 ? (
          cartlist.map((item, index) => {
            return (
              <div key={index} className="">
                <CartItem
                  reload={() => getData()}
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
                className="icon icon-tabler icon-tabler-mood-empty"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 10l.01 0" />
                <path d="M15 10l.01 0" />
                <path d="M9 15l6 0" />
              </svg>
              <h1 className="text-xl font-light">Your cart is empty...</h1>
              <button className="bg-primary px-3 py-1 text-ternary-dark">
                Add now
              </button>
            </div>
          </div>
        )}
        {/* <WishlistedItem/> */}
      </div>
    );
};

export default CartView;
