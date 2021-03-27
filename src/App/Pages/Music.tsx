import axios from "axios";
import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { StandardLayout } from "../Components/Layout";
import { PageHeading } from "../Components/PageHeading";
import { SearchBar } from "../Components/SearchBar";
import { SelectDropdown } from "../Components/SelectDropdown";
import { SongRow } from "../Components/Song/SongRow";
import { APIErrorResponse, APISong } from "../Modules/API/d.types";
import { addSong } from "../Modules/API/Playlists";
import { searchSoundCloud } from "../Modules/Soundcloud";
import { searchYouTube } from "../Modules/YouTube";
import { ApplicationState } from "../Redux/Store";

export const Music = () => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState([] as APISong[]);
    const [platform, setPlatform] = useState("YouTube" as "YouTube" | "SoundCloud");

    const myPlaylists = useSelector((state: ApplicationState) => state.user.playlists);

    const history = useHistory();

    const nextPageUrl = useRef("");
    const cancelToken = useRef(axios.CancelToken.source());

    const onSearchSubmit = useCallback(async () => {
        setLoading(true);
        setSongs([]);
        try {
            if (platform === "SoundCloud") {
                const data = await searchSoundCloud(query, cancelToken.current);
                const parsedSongs = data.collection.map(sng => ({
                    id: sng.id.toString(),
                    title: sng.title,
                    postedBy: sng.user.username,
                    platform: "SoundCloud",
                    thumbnailUrl: sng.artwork_url,
                    platformId: sng.id.toString()
                } as APISong));
                setSongs(parsedSongs);
                setLoading(false);
                nextPageUrl.current = data.next_href;
            } else {
                const songs = await searchYouTube(query, cancelToken.current);
                setSongs(songs);
                setLoading(false);
                nextPageUrl.current = "";
            }
        } catch (e) {
            const exception = e as APIErrorResponse;
            if(exception.errors[0].msg === "You are not logged in."){
                history.push("/");
            } else {
                alert(exception.errors[0].msg);
            }
            setLoading(false);
            setQuery("");
        }

    }, [history, platform, query]);


    const onAddSongToPlaylist = useCallback(async (songId: string, playlistId: string, platform: "YouTube" | "SoundCloud") => {
        setLoading(true);
        try {
            await addSong(songId, platform, playlistId, cancelToken.current);
            setLoading(false);
        } catch (e) {
            const exception = e as APIErrorResponse;
            alert(exception.errors[0].msg);
            setLoading(false);
        }
    }, []);

    return (
        <StandardLayout>

            <PageHeading title="Search Music" />

            <div className="flex space-x-2">
                <div className="w-1/4 sm:w-1/2 md:w-3/4 lg:w-full lg:flex-grow">
                    <SearchBar
                        value={query}
                        placeholder={"Search for songs on " + platform}
                        disabled={loading}
                        isBusy={loading}
                        onQueryChange={(text: string) => setQuery(text)}
                        onSubmit={onSearchSubmit}
                    />
                </div>
                <div className="w-1/4 sm:w-1/2 md:w-1/4 lg:w-full lg:max-w-sm">
                    <SelectDropdown
                        disabled={loading}
                        value={platform}
                        options={[
                            {
                                title: "YouTube",
                                value: "YouTube"
                            },
                            {
                                title: "SoundCloud",
                                value: "SoundCloud"
                            }
                        ]}
                        onChange={(value: "YouTube" | "SoundCloud") => {
                            setQuery("");
                            setPlatform(value)
                        }}
                    />
                </div>
            </div>

            {
                songs.length > 0 ?
                    songs.map(song => (
                        <SongRow
                            title={song.title}
                            postedBy={song.postedBy}
                            platform={song.platform}
                            thumbnailUrl={song.thumbnailUrl}
                            contextItems={myPlaylists?.map((playlist) => ({
                                title: playlist.title,
                                onClick() {
                                    onAddSongToPlaylist(song.platformId, playlist.id, song.platform);
                                }
                            })) || undefined}
                        />
                    ))
                    : null
            }

        </StandardLayout>
    )

};