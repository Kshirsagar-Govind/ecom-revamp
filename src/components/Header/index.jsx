import React, { Component } from "react";
import ProfileIcon from "../../Assets/SVG/profile_icon";
import CartIcon from "./../../Assets/SVG/my_cart_icon";
import WishlistIcon from "./../../Assets/SVG/wishlist_icon";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../Assets/SVG/logout";
import { logoutUser } from "../../lib/features/authReducer";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = React.useState(null);
  React.useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);

  const checkUser = () => {
    if (userData) return true;
    return false;
  };
  return (
    <div className="fixed top-0 bg-primary h-12 w-full flex items-center justify-between px-5 shadow-md z-50">
      <div className="brand">
        <div
          onClick={() => navigate("/")}
          className="text-ternary-dark text-xl cursor-pointer"
        >
          My Shop
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="cursor-pointer">
          <div
            onClick={() => {
              userData ? navigate("/my-account") : navigate("/auth");
            }}
          >
            <ProfileIcon />
          </div>
        </div>

        <div className="cursor-pointer ">
          <div
            onClick={() => {
              userData ? navigate("/cart-list") : navigate("/auth");
            }}
          >
            <CartIcon />
          </div>
        </div>

        <div className="cursor-pointer">
          <div
            onClick={() => {
              userData ? navigate("/wish-list") : navigate("/auth");
            }}
          >
            <WishlistIcon />
          </div>
        </div>

        <div className="cursor-pointer">
          <div
            onClick={() => {
              dispatch(logoutUser())
              localStorage.clear();
              navigate("/auth");
            }}
          >
            <LogoutIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
