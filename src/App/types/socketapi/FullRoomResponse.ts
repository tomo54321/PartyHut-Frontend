import { Song } from "../Song";

export interface FullRoomResponse {
    id: string;
    name: string;
    owner: {
        id: string;
        username: string;
    },
    users: {
        id: string;
        username: string;
    }[],
    on_deck: {
        playing: boolean;
        song: Song | null;
        song_start_time: Date,
        current_dj: {
            id: string;
            username: string;
        } | null
    },
    is_dj: boolean;
    in_queue: boolean;
}