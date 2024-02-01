import axios from "axios";
import React, { Component, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormError from "./../Containers/[ Container]form-error";
import { REACT_APP_HOST } from "../lib/constants";
import { Navigate, useNavigate } from "react-router-dom";
import { userLogin } from "../lib/features/authReducer";
import AlertPopup from "../components/alerts/alert-popup";

const RegistrationWrapper = () => {
  const { data, isError, error } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  React.useEffect(() => {
    console.log(isError , data, error);
    if (!isError && data.user_id) {
      navigate("/");
    }
    if (error && isError) {
      alert(error);
    }
  }, [data, isError, error]);
  console.log(data, isError, error);
  return (
    <div className="registration-page just-center w-full">
      <div className="w-full">
        <div className="registration-forms flex w-full justify-around ">
          <div className="login-page">
            <center>
              <h1 className="text-2xl font-semibold">Login</h1>
            </center>
            <Login />
          </div>

          <div className="registration-page w-[300px]">
            <center>
              <h1 className="text-2xl font-semibold">Register</h1>
            </center>
            <Registration />
          </div>
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const [isUserValid_, setUserValid] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { data: user, isLoading } = useSelector((state) => state.authReducer);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      dispatch(userLogin({ email: data.email, password: data.password }));
      // navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {}, [user]);
  return (
    <div className="login-section just-center">
      <form onSubmit={handleSubmit(onSubmit)} className="reg-form">
        <div className="input-div-2 m-yy-20">
          <label htmlFor="input-label-2" className="text_label">
            Username {"(gvnxyz@gmail.com)"}
          </label>{" "}
          <div className="flex align-middle">
            <input
              type="email"
              {...register("email", { required: true })}
              className={errors.email ? "error_input" : ""}
              placeholder="enter your email"
            />
            {errors.email && <FormError />}
          </div>
        </div>

        <div className="input-div-2 m-yy-20">
          <label htmlFor="input-label-2" className="text_label">
            Password {"(123456)"}
          </label>
          <div className="flex align-middle">
            <input
              type="password"
              {...register("password", { required: true })}
              className={errors.password ? "error_input" : ""}
              placeholder="enter password"
            />
          </div>
        </div>

        <div className="input-div-2 my-2">
          {isLoading ? (
            <div className="primary_button_2 flex justify-center">
              <span class="btn-loader"></span>
            </div>
          ) : (
            <input
              type="submit"
              className="head-16-semi primary_button_2"
              value={"Login"}
            />
          )}
        </div>
      </form>
    </div>
  );
};

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showAlert, _setShowAlert] = React.useState(false);
  const [myAlert, _setAlert] = React.useState({
    a_header: "",
    a_msg: "",
    a_type: "danger",
  });
  const onSubmit = async (data, e) => {
    const object = {
      full_name: data.name,
      email: data.email,
      password: data.password,
      contact: data.contact,
    };

    e.preventDefault();
    try {
      const res = await axios.post(
        `${REACT_APP_HOST}/user-registration`,
        object
      );
      console.log(res);
      alert(res.data.message);
      if ((res.data.code = "200")) {
        dispatch(userLogin({ email: object.email, password: object.password }));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registration-section just-center w-full ">
      <form className="reg-form w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-div-2 m-yy-20">
          <label htmlFor="input-label-2">Name</label>
          <div className="flex justify-center items-baseline align-middle">
            <input
              type="text"
              {...register("name", { required: true })}
              className={errors.name ? "error_input" : ""}
              placeholder="enter your full name"
            />
            {errors.name && <FormError />}
          </div>
        </div>

        <div className="input-div-2 m-yy-20">
          <label htmlFor="input-label-2">Email</label>
          <div className="flex align-middle">
            <input
              type="email"
              {...register("email", { required: true })}
              className={errors.email ? "error_input" : ""}
              placeholder="enter your email"
            />
            {errors.email && <FormError />}
          </div>
        </div>

        <div className="input-div-2 m-yy-20">
          <label htmlFor="input-label-2">Contact</label>
          <div className="flex align-middle">
            <input
              type="text"
              {...register("contact", { required: true })}
              className={errors.contact ? "error_input" : ""}
              placeholder="enter your contact"
            />
            {errors.contact && <FormError />}
          </div>
        </div>

        <div className="input-div-2 m-yy-20">
          <label htmlFor="input-label-2">Password</label>
          <div className="flex align-middle">
            <input
              type="password"
              {...register("password", { required: true })}
              className={errors.password ? "error_input" : ""}
              placeholder="enter password"
            />
            {errors.password && <FormError />}
          </div>
        </div>

        <div className="input-div-2">
          <label htmlFor="input-label-2">Confirm Password</label>
          <div className="flex align-middle">
            <input
              type="password"
              {...register("c_password", { required: true })}
              className={errors.c_password ? "error_input" : ""}
              placeholder="confirm password"
            />
            {errors.c_password && <FormError />}
          </div>
        </div>

        <div className="input-div-2 submit-btn m-yy-20">
          <input
            type="submit"
            className="head-16-semi primary_button_2"
            // onCLick={()=>}
            value="Register"
          />
        </div>
      </form>
      {showAlert ? (
        <div className="dark-back">
          <AlertPopup />
        </div>
      ) : null}
    </div>
  );
};

export default RegistrationWrapper;
