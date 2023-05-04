import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BACKEND_URL } from "../assets/constants";
import styles from "./CoOp.module.css";
import logo from "../assets/logo.png";
import ICall from "../types/ICall";
import IGroupMember from "../types/IGroupMember";
import EventInfo from "../types/EventInfo";
import { UserContext } from "../App";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

function CoOpHome(): JSX.Element {
    const [coop, setCoop] = useState();
    const [calls, setCalls] = useState([] as ICall[]);
    const [openCall, setOpenCall] = useState(null);
    const { id } = useParams();
    const handleClose = () => setOpenCall(null);

    const { user } = useContext(UserContext);

    const getCallObj = (call: ICall) => {
        return {
            title: `${call.requester?.pet_name} - ${call.activity}`,
            start: call.date,
            extendedProps: {
                accepted: call.status ?? false,
                details: call.details,
                setOpen: () => setOpenCall(call),
            },
        };
    };

    const handleAcceptCall = async (call: any) => {
        try {
            const response = await fetch(`${BACKEND_URL}/calls/accept`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    accepter: user._id,
                    call: call._id,
                }),
            });
            const data = await response.json();
            setCoop(data);
            const calls = data.calls as ICall
            setCalls(calls ?? []);
        } catch (error) {
            console.error("Error accepting walker call", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetch(`${BACKEND_URL}/coops/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setCoop(data);
                    const calls = data.calls as ICall
                    setCalls(calls ?? []);
                });
        }
    }, [id]);

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
                    {calls && calls.length > 0 && (
                        <>
                            <p
                                className={"subheading"}
                                style={{ fontSize: "36px" }}
                            >
                                Pending Walker Calls
                            </p>
                            <ul>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <div style={{ flex: 1 }}>Pet Name</div>
                                        <div style={{ flex: 1 }}>Activity</div>
                                        <div style={{ flex: 1 }}>Time</div>
                                        <div style={{ flex: 2 }}>Details</div>
                                        <div style={{ flex: 1 }}>Status</div>
                                    </div>
                                    {calls.filter(function (call: ICall) {
                                const currDate = new Date()
                                const callDate = new Date(call.date)
                                return(callDate.getTime() > currDate.getTime())
                            }).map((call: any, index: number) => (
                                        <div
                                            key={index}
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            <div style={{ flex: 1 }}>
                                                {call.requester?.pet_name}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                {call.activity}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                {new Date(
                                                    call.date
                                                ).toLocaleString()}
                                            </div>
                                            <div style={{ flex: 2 }}>
                                                {call.details}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                {call.status ? (
                                                    <div
                                                        style={{
                                                            display:
                                                                "inline-block",
                                                        }}
                                                    >
                                                        Call accepted by{" "}
                                                        {
                                                            call.accepter
                                                                ?.person_name
                                                        }
                                                    </div>
                                                ) : (
                                                    <button
                                                    className="btn"
                                                    onClick={() =>
                                                        handleAcceptCall(call)
                                                    }
                                                    style={{display: call.requester.email === user.email 
                                                            ? 'none' : 'inherit'}}
                                                >
                                                    Accept Call
                                                </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ul>
                        </>
                    )}
                    <p className={"subheading"} style={{ fontSize: "36px" }}>
                        Co-Op Calendar
                    </p>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        weekends={true}
                        events={calls.map(getCallObj)}
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
                            (user: IGroupMember, index: number) => (
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
            <Modal
                open={openCall != null}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        style={{
                            fontWeight: 600,
                            color: openCall?.status ? "green" : "red",
                        }}
                    >
                        {openCall?.requester?.pet_name} - {openCall?.activity}
                    </Typography>
                    <div
                        id="modal-modal-description"
                        style={{ marginTop: "2px" }}
                    >
                        <p>Date: {new Date(openCall?.date).toLocaleString()}</p>
                        <p>Requester: {openCall?.requester?.person_name}</p>
                        <p>Details: {openCall?.details}</p>
                        {openCall?.status && (
                            <p>
                                Walker Call Accepter:{" "}
                                {openCall?.accepter?.person_name}
                            </p>
                        )}
                    </div>
                </Box>
            </Modal>
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
            onClick={eventInfo.event.extendedProps.setOpen}
        >
            {eventInfo.timeText} <b>{eventInfo.event.title}</b>
        </p>
    );
}

export default CoOpHome;
