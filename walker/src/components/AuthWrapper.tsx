import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AuthWrapper() {
    const navigate = useNavigate()
    const token = sessionStorage.getItem("token");
    const BACKEND_URL = process.env.REACT_APP_PROD === "true" ? process.env.REACT_APP_BACKEND_URL_PROD : process.env.REACT_APP_BACKEND_URL_DEV
    useEffect(() => {
        if (token) {
            fetch(`${BACKEND_URL}/auth/validate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token
                }),
            })
            .then(async (res) => {
                const status = res.status
                if (status === 200) {
                    return true
                }
                else {
                    const resJson = await res.json()
                    console.log(resJson.message)
                    navigate(`/login`)
                    return false
                }
            })
        } else {
            navigate(`/login`)
        }
    }, [navigate, token, BACKEND_URL]);
    return(
        <div>
            <Outlet/>
        </div>
    )
}

export default AuthWrapper