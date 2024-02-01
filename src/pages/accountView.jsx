import React from "react";
import Loader from "../components/alerts/loader";

const MyAccount = () => {
  const [userData, setUserData] = React.useState(null);
  const [loading, setLoading] = React.useState();
  React.useEffect(() => {
    setLoading(true)
    document.title = "My Account";
    setUserData(JSON.parse(localStorage.getItem("user")));
    setLoading(false)
  }, []);

  React.useEffect(() => {
  }, [loading]);

  React.useEffect(() => {
  }, [userData]);

  if(!userData) {
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
  else return (
    <div className="w-full h-full pt-20">
      <div className="mb-4">
        <h1 className="text-xl text-center text-primary-dark font-semibold">
          My Account
        </h1>
      </div>
      <div className="w-full p-10 flex flex-col gap-5">
        <div className="">
          <p>Name</p>
          <h1 className="text-2xl text-primary-dark font-semibold">{userData.full_name}</h1>
        </div>
        <div className="">
          <p>Email</p>
          <h1 className="text-2xl text-primary-dark font-semibold">{userData.email}</h1>
        </div>
        <div className="">
          <p>Delivery Address</p>
          <h1 className="text-2xl text-primary-dark font-semibold">Govind</h1>
        </div>
      </div>
    </div>
  );
};
export default MyAccount;
