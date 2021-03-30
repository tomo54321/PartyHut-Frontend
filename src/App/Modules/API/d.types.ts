export interface APIError {
    param: string;
    msg: string;
}

export interface APIErrorResponse {
    errors: APIError[]
}

export interface APIUserResponse{
    id: string;
    username: string;
    createdAt?: Date;
}

export interface APISong{
    id: string;
    title: string;
    postedBy: string;
    platform: "YouTube" | "SoundCloud";
    thumbnailUrl: string;
    platformId: string;
}
export interface APIPlaylistResponse{
    id: string;
    title: string;
    user: APIUserResponse;
    songs: APISong[];
}
export interface APIPlaylistListResponse {
    id: string;
    title: string;
    totalSongs: Number;
}
export interface APIBasicRoomResponse {
    id: string;
    name: string;
}

export interface APIRoomLayoutRoomResponse extends APIBasicRoomResponse{
    thumbnail: string;
    host: {
        username: string
    }
}

export interface APIRoomLayoutResponse {
    title: string;
    rooms: APIRoomLayoutRoomResponse[]
}