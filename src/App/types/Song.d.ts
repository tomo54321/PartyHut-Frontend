export interface Song {
    id: string;
    title: string;
    artist: string;
    platform: "YouTube" | "SoundCloud";
    platform_url?: string;
    artwork: string;
    platform_id: string;
    duration: number;
}