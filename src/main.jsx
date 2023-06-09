import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Profile from "./pages/Profile.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./context/AuthContext.jsx";
import "./index.css";
import CompleteSignup from "./components/CompleteSignup.jsx";

export const RootLayout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user) navigate("/login");
    if (!user?.fullName) {
      navigate("/complete-signup");
    }
  }, [user]);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/profile/:username", element: <Profile /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/complete-signup",
    element: <CompleteSignup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChakraProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
