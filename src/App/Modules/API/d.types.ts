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