import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../assets/constants";

import Logout from "./Logout";

function AuthWrapper() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (token) {
            fetch(`${BACKEND_URL}/auth/validate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                }),
            }).then(async (res) => {
                const status = res.status;
                if (status === 200) {
                    return true;
                } else {
                    const resJson = await res.json();
                    console.log(resJson.message);
                    navigate(`/login`);
                    return false;
                }
            });
        } else {
            navigate(`/login`);
        }
    }, [navigate, token]);
    return (
        <div>
            <Logout />
            <Outlet />
        </div>
    );
}

export default AuthWrapper;
