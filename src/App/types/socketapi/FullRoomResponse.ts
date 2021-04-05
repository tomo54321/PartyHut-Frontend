import { RoomDeckChange } from "./RoomDeckChange";
import { RoomUser } from "./RoomUser";

export interface FullRoomResponse {
    id: string;
    name: string;
    owner: {
        id: string;
        username: string;
    },
    users: RoomUser[],
    on_deck: RoomDeckChange,
    is_dj: boolean;
    in_queue: boolean;
}