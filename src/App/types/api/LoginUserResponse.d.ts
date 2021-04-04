import { SimpleRoomResponse } from "./SimpleRoomResponse";

export interface LoginUserResponse {
    id: string;
    username: string;
    avatar: string;
    huts: SimpleRoomResponse[];
    created_at: Date;
}