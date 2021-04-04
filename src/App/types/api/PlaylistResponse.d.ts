import { Song } from "../Song";

export interface SimplePlaylistResponse {
    id: string;
    name: string;
    artwork: string;
    total_songs: number;
}
export interface PlaylistResponse extends SimplePlaylistResponse {
    user: {
        id: string,
        username: string,
    },
    songs: Song[]
}