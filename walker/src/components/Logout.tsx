import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

function Logout() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/login')
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setUser(null);
    };

    return (
        <div style={{ position: "fixed", right: "2vw", top: "2vh" }}>
            <button onClick={handleLogout} className="btn">
                Logout
            </button>
        </div>
    );
}

export default Logout;
