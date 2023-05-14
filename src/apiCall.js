import axios from "axios";
import { toast } from "react-toastify";
import { prefix } from "./apiconfig";

export const registerCall = async (userCredential, dispatch) => {
  dispatch({ type: "REGISTER_START" });
  try {
    const res = await axios.post(prefix + "auth/register", userCredential);
    dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
    if (res.status === 200) {
      toast("Registered Successfully!", {
        position: "top-right",
        type: "success",
        theme: "dark",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  } catch (err) {
    // console.log(err.message);
    toast(err.response.data.msg, {
      position: "top-right",
      type: "error",
      theme: "dark",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    dispatch({ type: "REGISTER_FAILURE", payload: err });
  }
};

export const updateUser = async (data, dispatch) => {
  const id = data.userId;
  try {
    const res = await axios.patch(prefix + `users/${id}`, data);
    // console.log("success update", res.data);
    dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
  } catch (err) {
    toast(err.response.data.msg, {
      position: "top-right",
      type: "error",
      theme: "dark",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    dispatch({ type: "UPDATE_FAILURE", payload: err.response.data.msg });
  }
};

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(prefix + "auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    if (res.status === 200) {
      toast("Logged in Successfully!", {
        position: "top-right",
        type: "success",
        theme: "dark",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  } catch (err) {
    toast(err.response.data.msg, {
      position: "top-right",
      type: "error",
      theme: "dark",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.msg });
    // console.log(err.response.data.msg);
  }
};
