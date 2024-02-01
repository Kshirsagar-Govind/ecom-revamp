import React from "react";
import { REACT_APP_HOST } from "../lib/constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import AlertPopup from "../components/alerts/alert-popup";
import Loader from "../components/alerts/loader";

const BuyView = () => {
  const [userData, setUserData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams();
  const [buy_data, setBuyData] = React.useState({
    productData: "",
    addressData: "Your Address here",
    img: null,
    p_id: "",
  });
  const [myAlert, _setAlert] = React.useState({
    a_header: "",
    a_msg: "",
    a_type: "danger",
  });
  const [showAlert, _setShowAlert] = React.useState(false);

  React.useEffect(() => {
    document.title = "Buy";
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);

  React.useEffect(() => {
    userData && id && getAllDataFirst(id);
  }, [userData, id]);

  const getAllDataFirst = async (p_id) => {
    setLoading(true);
    try {
      const product = await axios.get(
        `${REACT_APP_HOST}/get-product-data/${p_id}`
      );
      const userAddress = await axios.get(
        `${REACT_APP_HOST}/get-user-address/${userData.user_id}`
      );
      const obj = buy_data;
      obj.productData = product.data.data;
      obj.addressData = userAddress.data.message.address;
      obj.img = product.data.data.product_images[0].imgURL;
      obj.p_id = p_id;
      setBuyData(obj);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  React.useEffect(() => {}, [buy_data, loading]);
  React.useEffect(() => {}, [showAlert]);

  const placeOrder = async () => {
    try {
      setLoading(true);
      const data = {
        product_id: id,
        price: buy_data.productData.product_Price,
        delivery_address: buy_data.addressData,
      };
      const res = await axios.post(
        `${REACT_APP_HOST}/product-purchased/${userData.user_id}`,
        data
      );
      console.log(res);
      setLoading(false);

      _setAlert({
        a_header: "SUCCESS",
        a_msg: "Order Placed Successfully, Check your mail inbox",
        a_type: "success",
      });
      _setShowAlert(true);
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert_popup("ERROR", "Failed to Place your order", "error");
    }
  };
  const alert_popup = (header, msg, type) => {
    _setAlert({
      a_header: header,
      a_msg: msg,
      a_type: type,
    });
    _setShowAlert(true);
  };

  console.log(buy_data, "--------------------------");
  if (buy_data && !loading) {
    return (
      <div className="w-full h-full pt-20 overflow-x-hidden">
        <div className="mb-4">
          <h1 className="text-xl text-center text-primary-dark font-semibold">
            Complete your purchase
          </h1>
        </div>

        <div className="flex gap-10 p-10 w-full justify-center h-full">
          <div className="w-2/3 h-full">
            <div className="w-full h-2/5 ">
              <div className="flex flex-row items-center gap-10 h-full ">
                <div className=" border-2 border-gray-300 p-10 h-full w-8/12">
                  <div className="">
                    <p className="text-2xl">
                      {buy_data.productData.product_Name}
                    </p>
                    <p className="text-lg">
                      {buy_data.productData.product_Decsription}
                    </p>
                    <p className="text-lg">
                      {buy_data.productData.product_Seller}
                    </p>
                    <p className="text-lg">
                      {buy_data.productData.product_Tag}
                    </p>
                  </div>
                </div>
                <div className="img  w-3/12">
                  <img src={buy_data.img} alt="" />
                </div>
              </div>
            </div>

            <div className="w-full h-2/5 mt-10">
              <div className="flex flex-row items-center gap-10 h-full ">
                <div className=" p-10 h-full w-8/12">
                  <div className="mb-3">
                    <p className="text-2xl">Address</p>
                    <p className="text-lg">
                      {buy_data.addressData || "Your address here"}
                    </p>
                  </div>
                  <div className="">
                    <p className="text-2xl">Final Price</p>
                    <p className="text-lg">
                      {buy_data.productData.product_Price}/-
                    </p>
                    <div
                      onClick={() => placeOrder()}
                      className="hover:bg-ternary-dark hover:text-primary bg-primary text-center my-3 font-semibold text-ternary-dark p-3 transition-all hover:-translate-y-1"
                    >
                      <button>Place My Order</button>
                    </div>
                  </div>
                </div>
                {/* <div className="bg-primary font-semibold text-ternary-dark p-3 ">
                  <button>Place My Order</button>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {showAlert ? (
          <div className="dark-back">
            <AlertPopup
              heading={myAlert.a_header}
              message={myAlert.a_msg}
              ok={() => {
                _setShowAlert(false);
                // reload();
              }}
              type={myAlert.a_type}
            />
          </div>
        ) : null}
      </div>
    );
  } else if(loading) {
    return (
      <div className="w-full h-full pt-20 overflow-x-hidden">
        <div className="mb-4">
          <h1 className="text-xl text-center text-primary-dark font-semibold">
            Complete your purchase
          </h1>
        </div>
        <div className="flex gap-10 p-10 w-full justify-center h-full">
          <Loader />
        </div>
      </div>
    );
  }
  
  else {
    return (
      <div className="w-full h-full pt-20 overflow-x-hidden">
        <div className="mb-4">
          <h1 className="text-xl text-center text-primary-dark font-semibold">
            Complete your purchase
          </h1>
        </div>
        <div className="flex gap-10 p-10 w-full justify-center h-full">
          <Loader />
        </div>
      </div>
    );
  }
};

export default BuyView;
