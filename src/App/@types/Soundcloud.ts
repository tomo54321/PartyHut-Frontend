
export interface SoundCloudUser {
    id: number;
    kind: string;
    username: string;
    last_modified: string;
    uri: string;
    permalink_url: string;
    avatar_url: string;
}
export interface SoundCloudSong {
    title: string;
    artwork_url: string;
    bpm: number;
    comment_count: number;
    commentable: boolean;
    created_at: string;
    description: string;
    download_count: number;
    downloadable: string;
    duration: number;
    favorititings_count: number;
    genre: string;
    id: number;
    isrc: string;
    key_signature: string;
    kind: string;
    label_name: string;
    license: string;
    permalink_url: string;
    playback_count: number;
    purchase_title?: string;
    purchase_url?: string;
    release: string;
    release_day: number;
    release_month: number;
    release_year: number;
    sharing: string;
    stream_url: string;
    streamable: boolean;
    tag_list: string[];
    uri: string;
    user: SoundCloudUser;
    user_favorite?: boolean;
    user_playback_count?: number;
    waveform_url: string;
}
export interface SoundCloudSearchAPIResponse {
    collection: SoundCloudSong[];
    next_href: string;
}