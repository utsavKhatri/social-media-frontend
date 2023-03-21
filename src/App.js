import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
// import { MyContext } from "./context";
function App() {
//   const { userData } = useContext(MyContext);

const userData = JSON.parse(localStorage.getItem("user-profile"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const checkUserToken = () => {
    setIsLoggedIn(true);
    const userToken = localStorage.getItem("user-token");
    if (
      !userData ||
      !userToken ||
      userToken === "undefined" ||
      userData.token === undefined
    ) {
      navigate("/auth/login");
      setIsLoggedIn(false);
    }
    else{
      navigate("/");
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkUserToken();
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
}

export default App;
