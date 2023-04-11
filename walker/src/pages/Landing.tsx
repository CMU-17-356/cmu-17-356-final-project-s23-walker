import styles from "./Landing.module.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Landing(): JSX.Element {
    return (
        <div className={styles.container}>
            <h1 className="heading">Welcome to Walker</h1>
            <img src={logo} alt="Walker logo" />
            <p className="subheading">"It takes a village!"</p>
            <Link to="/login" className="btn">
                Login
            </Link>
            <div className={styles.coop}>
                <Link to="/accept-invite" className="btn">
                    Accept Co-Op Invite
                </Link>
                <Link to="/create-co-op" className="btn">
                    Create New Co-Op
                </Link>
            </div>
        </div>
    );
}
export default Landing;
