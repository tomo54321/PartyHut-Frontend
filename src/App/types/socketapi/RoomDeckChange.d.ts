import { Song } from "../Song";

export interface RoomDeckChange {
    playing: boolean;
    song: Song | null;
    song_start_time: string;
    current_dj: string;
}