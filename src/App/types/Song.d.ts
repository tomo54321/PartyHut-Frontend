export interface Song {
    id: string;
    title: string;
    postedBy: string;
    platform: "YouTube" | "SoundCloud";
    thumbnailUrl: string;
    platformId: string;
    duration: number;
}