export interface Song {
    id: string;
    title: string;
    artist: string;
    platform: "YouTube" | "SoundCloud";
    artwork: string;
    platformId: string;
    duration: number;
}