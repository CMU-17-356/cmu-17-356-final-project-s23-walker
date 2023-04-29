import styles from "./Login.module.css";
import logo from "../assets/logo.png";
// import { Link } from "react-router-dom";
import { React } from "react";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";




function WalkerCall({ user }: { user: any }): JSX.Element {
    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_PROD === "true" ? process.env.REACT_APP_BACKEND_URL_PROD : process.env.REACT_APP_BACKEND_URL_DEV
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const activity = formData.get("activity");
        const date = formData.get("datetime");
        const details = formData.get("request");
        try {
            const response = await fetch(`${BACKEND_URL}/calls`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    activity,
                    date,
                    details,
                    requester: user?._id, // Assuming the user object has an _id property
                }),
            });


            const data = await response.json();
            console.log(data);
            navigate(`/co-op-home/${user.coop_id}`);
            // You may navigate to another page or show a success message here
        } catch (error) {
            console.error("Error creating walker call", error);
        }
    };


    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo} alt="Walker logo" />
            <h1 className="subheading" style={{ fontSize: "48px" }}>
                Create a new walker call request for pet care
            </h1>
            <form onSubmit={handleSubmit}>
            <div>
                <h1
                    className="subheading"
                    style={{
                        fontSize: "36px",
                        display: "inline-block",
                        marginRight: "12px",
                    }}
                >
                    Type of Pet Care
                </h1>
                <input type="radio" id="walk" name="activity" value="Walk" />
                <label htmlFor="walk"> Walk </label>
                <input type="radio" id="petsitting" name="activity" value="Petsitting" />
                <label htmlFor="petsitting"> Petsitting </label>
            </div>
            <div className={"calendar-container"}>
                <h1
                    className="subheading"
                    style={{
                        fontSize: "36px",
                        display: "inline-block",
                        marginRight: "12px",
                    }}
                >
                    Date
                </h1>
                <input type="datetime-local" id="datetime" name="datetime" />
            </div>

            <div>
                <h1
                    className="subheading"
                    style={{
                        fontSize: "36px",
                        display: "inline-block",
                        marginRight: "12px",
                    }}
                >
                    Details
                </h1>
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
                />{" "}
            </div>
            <button type="submit" className="btn" style={{ display: "inline-block" }}>
                Send Out the Walker Call
            </button>
            </form>
        </div>
    );
}
export default WalkerCall;
