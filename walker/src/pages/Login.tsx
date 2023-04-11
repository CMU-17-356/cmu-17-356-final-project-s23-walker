import styles from "./Login.module.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Landing(): JSX.Element {
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo} alt="Walker logo" />
            <h1 className="subheading">Login to Your Walker Account Here</h1>
            <form className={styles.form}>
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
            </form>
            <Link to="/co-op-home" className="btn">
                Login
            </Link>
        </div>
    );
}
export default Landing;
