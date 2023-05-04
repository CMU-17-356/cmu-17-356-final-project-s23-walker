import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../App";
import styles from "./Login.module.css";
import logo from "../assets/logo.png";
import handleLogin from "../components/handleLogin";

function Login(): JSX.Element {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        // access the form values using the "get" method of the FormData object
        const email = formData.get("email");
        const password = formData.get("password");
        handleLogin(email as string, password as string).then((success) => {
            const sessionUser = sessionStorage.getItem("user");
            if (sessionUser) {
                setUser(JSON.parse(sessionUser));
            }
            success
                ? navigate(`/co-op-home/${success}`)
                : alert("Login failed in login");
        });
    };

    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo} alt="Walker logo" />
            <h1 className="subheading">Login to Your Walker Account Here</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label className="form-field" htmlFor="email">
                        Email
                    </label>
                    <input
                        placeholder="Add text"
                        type="email"
                        id="email"
                        name="email"
                    />
                </div>
                <div>
                    <label className="form-field" htmlFor="password">
                        Password
                    </label>
                    <input
                        placeholder="Add text"
                        type="password"
                        id="password"
                        name="password"
                    />
                </div>
                <button type="submit" className="btn">
                    Login
                </button>
                <Link to="/" className="btn">
                    Return Home
                </Link>
            </form>
        </div>
    );
}
export default Login;
