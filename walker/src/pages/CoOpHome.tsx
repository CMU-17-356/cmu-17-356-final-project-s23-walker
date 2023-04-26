import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import styles from "./CoOp.module.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

interface WalkerCall {
    id: number;
    petName: string;
    job: string;
    scheduledTime: Date;
    request: string;
    accepted: boolean;
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

const pendingWalkerCalls: WalkerCall[] = [
    {
        id: 1,
        petName: "Jeanie",
        job: "Walk",
        scheduledTime: new Date("2023-03-02T09:00:00"),
        request:
            "I'm working late, could Jeanie join someone on their afternoon walk please?",
        accepted: true,
    },
    {
        id: 2,
        petName: "Bruce",
        job: "Petsitting",
        scheduledTime: new Date("2023-04-19T11:00:00"),
        request:
            "I've got a weekend trp to Buffalo, could someone watch Bruce for the weekend?",
        accepted: false,
    },
];

const events = pendingWalkerCalls.map(
    ({ petName, job, scheduledTime, accepted }) => {
        return {
            title: `${petName} - ${job}`,
            start: scheduledTime,
            extendedProps: {
                accepted,
            },
        };
    }
);

function CoOpHome({
    userName,
    petName,
}: {
    userName: string;
    petName: string;
    groupName: string;
}): JSX.Element {
    const [coop, setCoop] = useState();
    const { id } = useParams();

    useEffect(() => {
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
            });
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className="heading" style={{ fontSize: "60px" }}>
                    {coop?.name ?? "Co-Op"}
                </h1>
                <img
                    src={logo}
                    alt="Walker logo"
                    style={{ width: "120px", height: "120px" }}
                />
                <div className={styles.welcome}>
                    <p className={"subheading"} style={{ fontSize: "36px" }}>
                        Welcome {userName} & {petName}!
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
                        {pendingWalkerCalls.map((call) => (
                            <li
                                key={call.id}
                                style={{
                                    display: "inline-block",
                                    whiteSpace: "nowrap",
                                    marginBottom: "5px",
                                }}
                            >
                                <div>
                                    <strong>{call.petName}</strong> - {call.job}{" "}
                                    - {call.scheduledTime.toLocaleString()}
                                </div>
                                <div
                                    style={{
                                        display: "inline-block",
                                        marginRight: "10px",
                                    }}
                                >
                                    {" "}
                                    "{call.request}"
                                </div>
                                <button
                                    className="btn"
                                    style={{ display: "inline-block" }}
                                >
                                    Accept Call
                                </button>
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
                        events={events}
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
