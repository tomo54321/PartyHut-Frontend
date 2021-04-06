export interface RoomResponse {
    id: string;
    name: string;
    genres: string[];
    playing: boolean;
    song: {
        title?: string;
        artwork?: string;
    }
}