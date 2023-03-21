import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "./context";

const ProtectedRoute = (props) => {

    const navigate = useNavigate();
    // const { userData } = useContext(MyContext);
    const userData = JSON.parse(localStorage.getItem("user-profile"));

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = () => {
        if (!userData || userData === {}) {
            setIsLoggedIn(false);
            return navigate('/auth/login');
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}

export default ProtectedRoute;