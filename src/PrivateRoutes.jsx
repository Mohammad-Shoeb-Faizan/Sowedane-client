import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  let auth = { token: token && email ? true : false };

  return auth.token ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
