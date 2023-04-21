import styles from "./Login.module.css";
import logo from "../assets/logo.png";
// import { Link } from "react-router-dom";
import { React, useState } from "react";
import "react-calendar/dist/Calendar.css";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";

function WalkerCall(): JSX.Element {
    // const [date, setDate] = useState(new Date());

    /* 
      TODO: 
      - change div into a form   
      - create a handleSubmit function that will send the data to the backend (like in Create.tsx)
      - make a post request to /calls (make sure body mathces schema in walker-backend/src/models/call.ts)
      {
        activity: ...
        details: ...,
        date: ...,
        requester: ..., // make sure that this is a user object
        coop: ... // coop object
      }
    */
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo} alt="Walker logo" />
            <h1 className="subheading" style={{ fontSize: "48px" }}>
                Create a new walker call request for pet care
            </h1>
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
                <input type="checkbox" id="op1" name="walk" value="walk" />
                <label htmlFor="walk"> Walk </label>
                <input
                    type="checkbox"
                    id="op2"
                    name="petsitting"
                    value="petsit"
                />
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
                <input type="date" id="date"></input>
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
            <button className="btn" style={{ display: "inline-block" }}>
                Send Out the Walker Call
            </button>
        </div>
    );
}
export default WalkerCall;
