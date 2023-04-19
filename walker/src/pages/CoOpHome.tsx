import React, { useState } from "react";
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
}

interface GroupMember {
    dogOwnerName: string;
    dogName: string;
}

interface EventInfo {
    timeText: string;
    event: {
        title: string;
        start: Date;
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
    },
    {
        id: 2,
        petName: "Bruce",
        job: "Petsitting",
        scheduledTime: new Date("2023-04-19T11:00:00"),
        request:
            "I've got a weekend trp to Buffalo, could someone watch Bruce for the weekend?",
    },
];

const events = pendingWalkerCalls.map(({ petName, job, scheduledTime }) => {
    return {
        title: `${petName} - ${job}`,
        start: scheduledTime,
    };
});

const groupMembers: GroupMember[] = [
    { dogOwnerName: "Rebecca", dogName: "Jeanie" },
    { dogOwnerName: "Alex", dogName: "Bruce" },
    { dogOwnerName: "Susanna", dogName: "Hubble" },
];

function CoOpHome({
    userName,
    petName,
    groupName,
}: {
    userName: string;
    petName: string;
    groupName: string;
}): JSX.Element {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className="heading" style={{ fontSize: "60px" }}>
                    {groupName}
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
                        {groupMembers.map((member, index) => (
                            <li key={index} style={{ paddingRight: "20px" }}>
                                {member.dogOwnerName} & {member.dogName}
                            </li>
                        ))}
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
        <p className={styles.event}>
            {eventInfo.timeText} <b>{eventInfo.event.title}</b>
        </p>
    );
}

export default CoOpHome;
