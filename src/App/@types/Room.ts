import { APIUserResponse } from "../Modules/API/d.types";

export interface RoomOnDeck {
    playing: boolean;
    platform: "YouTube" | "SoundCloud";
    platformId?: string;
    songStartedAt?: number;

    current_dj?: string;
}

export interface Room {
    id: string;
    name: string;
    host: APIUserResponse;
    on_deck: RoomOnDeck;
    is_dj: boolean;
    in_queue: boolean;
}