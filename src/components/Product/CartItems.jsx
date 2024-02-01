import axios from "axios";
import React from "react";
import { getSingleProduct } from "../../Services/getData";
import { REACT_APP_HOST } from "../../lib/constants";
import AlertPopup from "../alerts/alert-popup";
import Loader from "../alerts/loader";
import { useNavigate } from "react-router-dom";

const CartItem = ({ reload, product, user_id }) => {
  const [productData, _setProductData] = React.useState({});
  const [loading, _setLoading] = React.useState(false);
  const [productImage, _setProductImage] = React.useState("");
  const [showAlert, _setShowAlert] = React.useState(false);
  const [myAlert, _setAlert] = React.useState({
    a_header: "",
    a_msg: "",
    a_type: "danger",
  });
  const navigate = useNavigate(); 

  React.useEffect(() => {
    user_id && getProductData();
  }, [user_id]);
  const getProductData = async () => {
    await fetch(`${REACT_APP_HOST}/get-product-data/${product.product_id}`)
      .then(async (res) => {
        const data = await res.json();
        _setProductImage(data.data.product_images[0].imgURL);
        _setProductData(data.data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const alert_popup = (header, msg, type) => {
    _setAlert({
      a_header: header,
      a_msg: msg,
      a_type: type,
    });
    _setShowAlert(true);
  };

  const removeFromCartlist = async () => {
    _setLoading(true);
    const res = await axios.post(
      `${REACT_APP_HOST}/remove-from-cart/${user_id}`,
      { product_id: product.product_id }
    );
    alert_popup("REMOVED", "Item Removed From your wishlist!", "danger");
    _setLoading(false);
  };

  const show = () => {
    // window.open(
    //     `${window.location.origin}/item-view-page/${product.product_id}`
    //   );
    navigate(`/item-view-page/${product.product_id}`)
  };
  return (
    <div className="bg-white h-fit rounded-md p-5 mb-5 relative flex justify-between hover:shadow-md">
      <div className="l-section w-10/12 px-3">
        <div className="w-full h-44 flex align-middle justify-left flex-row">
          <div className="flex items-center gap-8">
            <div className="w-[50%]" onClick={() => show()}>
              <img
              style={{maxHeight:"280px"}}
              src={productImage} alt="" />
            </div>
            <span className="desc h-full w-full p-3 py-5">
              <h1 className="heading_4">{productData.product_Name}</h1>
              <h3 className="lek-20-regular">
                Price -{productData.product_Price}{" "}
              </h3>
            </span>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="right-section">
          <div className="just-center">
            <Loader />
          </div>
        </div>
      ) : (
        <div className="btn-section w-2/12 h-44 flex flex-col justify-around">
          <button className="bg-primary py-2 mx-10 rounded-md font-semibold text-ternary-dark">
            Buy Now
          </button>

          <button
            className="border-2 border-primary bg-pu p-3 py-2 mx-10 rounded-md text-primary font-bold"
            onClick={() => removeFromCartlist()}
          >
            Remove
          </button>
        </div>
      )}
      {showAlert ? (
        <div className="dark-back">
          <AlertPopup
            heading={myAlert.a_header}
            message={myAlert.a_msg}
            ok={() => {
              _setShowAlert(false);
              reload();
            }}
            type={myAlert.a_type}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CartItem;
