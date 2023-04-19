import styles from "./Login.module.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function WalkerCall(): JSX.Element {
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo} alt="Walker logo" />
            <h1 className="subheading" style={{fontSize:"48px"}}>Create a new walker call request for pet care</h1>
            <h1 className="subheading" style={{fontSize:"48px"}}>Type of Pet Care</h1>
            <h1 className="subheading" style={{fontSize:"48px"}}>Date</h1>
            <h1 className="subheading" style={{fontSize:"48px"}}>Details</h1>
            <button
                className="btn"
                style={{ display: "inline-block" }}
            >
                Send Out the Walker Call
            </button>
        
        </div>
    );
}
export default WalkerCall;
