import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Link } from "react-router-dom";

import styles from "./CoOp.module.css";
import logo from "../assets/logo.png";

interface IUser {
    person_name: string;
    password: string;
    pet_name: string;
    email: string;
    coop_id: string;
}

interface ICall {
    activity: string;
    details: string;
    date: Date;
    requester: IUser;
    accepter: IUser;
    status: boolean;
}

interface GroupMember {
    person_name: string;
    pet_name: string;
}

interface ExtendedProps {
    accepted: boolean;
}

interface EventInfo {
    timeText: string;
    event: {
        title: string;
        start: Date;
        extendedProps: ExtendedProps;
    };
}

const getCalObj = ({ activity, date, details, requester, status }: ICall) => {
    return {
        title: `${requester?.pet_name} - ${activity}`,
        start: date,
        extendedProps: {
            accepted: status ?? false,
            details,
        },
    };
};

function CoOpHome({ user }: { user: any }): JSX.Element {
    const [coop, setCoop] = useState();
    const [calls, setCalls] = useState([]);
    const { id } = useParams();
    const [acceptedCalls, setAcceptedCalls] = useState(new Set());

    const handleAcceptCall = async (call: any) => {
        try {
            const response = await fetch(`/api/calls/accept`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "accepter": user._id,
                    "call": call._id
                }),
            });
            setAcceptedCalls(new Set([...acceptedCalls, call._id]));
            console.log(response);
        } catch (error) {
            console.error("Error accepting walker call", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetch(`/api/coops/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setCoop(data);
                    setCalls(data?.calls);
                });
        }
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.header} style={{ width: "100%" }}>
                <h1 className="heading" style={{ fontSize: "60px" }}>
                    {coop?.name ?? "Co-Op"}
                </h1>
                <img
                    src={logo}
                    alt="Walker logo"
                    style={{ width: "220px", height: "220px" }}
                />
                <div className={styles.welcome}>
                    <p className={"subheading"} style={{ fontSize: "36px" }}>
                        Welcome {user?.person_name} & {user?.pet_name}!
                    </p>
                    <Link
                        to="/create-walker-call"
                        className="btn"
                        style={{ fontSize: "18px" }}
                    >
                        Create Walker Call
                    </Link>
                    <p className={"subheading"} style={{ fontSize: "36px" }}>
                        Pending Walker Calls
                    </p>
                    <ul>
                        {calls.map((call: any, index: number) => (
                            <li
                                key={index}
                                style={{
                                    display: "block",
                                    whiteSpace: "nowrap",
                                    marginBottom: "5px",
                                }}
                            >
                                <div>
                                    <strong>{call.requester?.pet_name}</strong>{" "}
                                    - {call.activity} -{" "}
                                    {new Date(call.date).toLocaleString()}
                                
                                    {" "}
                                    "{call.details}"
                                    {acceptedCalls.has(call._id) ? (
                                        <div>Call accepted!</div>
                                        ) : (
                                        <button
                                            className="btn"
                                            style={{ display: "inline-block" }}
                                            onClick={() => handleAcceptCall(call)}
                                        >
                                            Accept Call
                                        </button>
                                        )}
                                {/* <button
                                    className="btn"
                                    style={{ display: "inline-block" }}
                                    onClick={() => handleAcceptCall(call)}
                                    //onClick={handleAccept}
                                >
                                    Accept Call
                                </button> */}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className={"subheading"} style={{ fontSize: "36px" }}>
                        Co-Op Calendar
                    </p>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        weekends={false}
                        events={calls.map(getCalObj)}
                        eventContent={renderEventContent}
                        themeSystem="standard"
                    />
                    <p
                        className={"subheading"}
                        style={{ marginBottom: "-10px", fontSize: "36px" }}
                    >
                        Group Members
                    </p>
                    <ul style={{ listStyleType: "none" }}>
                        {(coop?.users ?? []).map(
                            (user: GroupMember, index: number) => (
                                <li
                                    key={index}
                                    style={{ paddingRight: "20px" }}
                                >
                                    {user?.person_name} & {user?.pet_name}
                                </li>
                            )
                        )}
                    </ul>

                    <div>
                        <label
                            className="subheading"
                            htmlFor="email"
                            style={{ fontSize: "20px", marginRight: "20px" }}
                        >
                            Invite new group members via email:
                        </label>
                        <input
                            placeholder="Add text"
                            type="email"
                            id="email"
                            name="email"
                            style={{
                                height: "5px",
                                width: "120px",
                                marginRight: "20px",
                            }}
                        />
                        <button
                            className="btn"
                            style={{
                                lineHeight: "0",
                                height: "5px",
                                display: "inline-block",
                            }}
                        >
                            Invite Member
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// a custom render function
function renderEventContent(eventInfo: EventInfo) {
    return (
        <p
            style={{
                color: eventInfo.event.extendedProps.accepted ? "green" : "red",
                border: `1px solid ${
                    eventInfo.event.extendedProps.accepted ? "green" : "red"
                }`,
            }}
            className={styles.event}
        >
            {eventInfo.timeText} <b>{eventInfo.event.title}</b>
        </p>
    );
}

export default CoOpHome;
