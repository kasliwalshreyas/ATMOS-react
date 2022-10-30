import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("user");
        navigate("/login");
    }, []);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    )
}

export default Logout;