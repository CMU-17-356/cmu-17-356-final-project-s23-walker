interface ExtendedProps {
    accepted: boolean;
    setOpen: () => void;
}

export default interface EventInfo {
    timeText: string;
    event: {
        title: string;
        start: Date;
        extendedProps: ExtendedProps;
    };
}