import styles from "./Login.module.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function WalkerCall(): JSX.Element {
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo} alt="Walker logo" />
            <h1 className="subheading" style={{fontSize:"48px"}}>Create a new walker call request for pet care</h1>
            
            <div >
            <h1 className="subheading" style={{fontSize:"36px", display: "inline-block", marginRight:"12px"}}>Type of Pet Care</h1>
                <input type="checkbox" id="op1" name="walk" value="walk" />
                <label htmlFor="walk"> Walk </label> 
                <input type="checkbox" id="op2" name="petsitting" value="petsit" />
                <label htmlFor="petsitting"> Petsitting </label>
            </div>
            <h1 className="subheading" style={{fontSize:"36px"}}>Date</h1>
            <div >
            <h1 className="subheading" style={{fontSize:"36px", display: "inline-block", marginRight: "12px"}}>Details</h1>
            <input
                            placeholder="Add text"
                            type="request"
                            id="request"
                            name="request"
                            style={{
                                height: "36px",
                                width: "120px",
                                marginBottom: "20px",
                            }}
                        /> </div>
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
