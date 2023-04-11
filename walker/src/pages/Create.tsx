import styles from "./Login.module.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Accept(): JSX.Element {
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo} alt="Walker logo" />
            <h1 className="subheading">
                Create a New Walker Pet Care Co-Op Here!
            </h1>
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
                <div>
                    <label className="form-field" htmlFor="name">
                        Your Name
                    </label>
                    <input
                        placeholder="Add text"
                        type="text"
                        id="name"
                        name="name"
                    />
                </div>
                <div>
                    <label className="form-field" htmlFor="petName">
                        Your Pet's Name
                    </label>
                    <input
                        placeholder="Add text"
                        type="text"
                        id="petName"
                        name="petName"
                    />
                </div>
                <div>
                    <label className="form-field" htmlFor="group">
                        Group Name
                    </label>
                    <input
                        placeholder="Add text"
                        type="text"
                        id="group"
                        name="group"
                    />
                </div>
            </form>
            <Link to="/co-op-home" className="btn">
                Create New Co-Op
            </Link>
        </div>
    );
}
export default Accept;
