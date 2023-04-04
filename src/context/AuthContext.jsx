import { createContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";
import AuthReducer from "./AuthReducer.jsx";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  var [state, dispatch] = useReducer(AuthReducer, initialState);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    toast("Logged out Successfully!", {
      position: "top-right",
      type: "success",
      theme: "dark",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        logout: logout,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
