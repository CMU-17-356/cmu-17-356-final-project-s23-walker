import IUser from "./IUser";

export default interface ICall {
    activity: string;
    details: string;
    date: Date;
    requester: IUser;
    accepter: IUser;
    status: boolean;
}