import { useContext } from "react";

import { UserContext } from "../App";

function Logout() {
    const { setUser } = useContext(UserContext);
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setUser(null);
        window.location.reload();
    };

    return (
        <div>
            <button onClick={handleLogout} className="btn">
                Logout
            </button>
        </div>
    );
}

export default Logout;
