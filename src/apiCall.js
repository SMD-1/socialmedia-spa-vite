import axios from "axios";
import { toast } from "react-toastify";
import { prefix } from "./apiconfig";

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
    // toast({
    //   position: "top-right",
    //   title: "Error.",
    //   description: err.response.data.msg,
    //   status: "error",
    //   duration: 3000,
    //   isClosable: true,
    // });
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
    dispatch({ type: "LOGIN_FAILURE", payload: err });
    console.log(err.response);
  }
};
