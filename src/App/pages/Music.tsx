import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { PartyHut } from "../api/api";
import { Layout } from "../components/Layout";
import { AddToPlaylistModal } from "../components/Modals/AddToPlaylist";
import { SearchInput } from "../components/SearchInput";
import { SelectField } from "../components/SelectField";
import { SongList } from "../components/SongList";
import { SongRow } from "../components/SongRow";
import { Spinner } from "../components/Spinner";
import { ErrorResponse } from "../types/Error";
import { Song } from "../types/Song";

interface MusicPageProps { }
export const MusicPage: React.FC<MusicPageProps> = () => {

    const [platform, setPlatform] = useState("YouTube" as "YouTube" | "SoundCloud");
    const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
    const [songs, setSongs] = useState([] as Song[]);
    
    const [loading, setLoading] = useState(false);
    const cancelToken = useRef(axios.CancelToken.source());

    const songIndex = useRef(0);

    const onSearch = useCallback(async (query: string) => {
        cancelToken.current = axios.CancelToken.source();
        setLoading(true);

        try{

            let sngs = [];
            if(platform === "YouTube"){
                sngs = await PartyHut.external.searchYouTube(query, cancelToken.current.token);
            } else {
                sngs = await PartyHut.external.searchSoundCloud(query, cancelToken.current.token);
            }

            setSongs(sngs);
            setLoading(false);
        } catch (e) {
            const error = e as ErrorResponse;
            alert(error.errors[0].msg);
        }

    }, [platform]);
    useEffect(() => {
        return () => {
            cancelToken.current.cancel();
        }
    }, []);


    return (
        <Layout title="Search Music">

            <div className="flex space-x-2">
                <SearchInput
                    placeholder="Search for music"
                    onSearch={onSearch}
                    disabled={loading}
                    loading={loading}
                />
                <SelectField
                    value={platform}
                    className="w-52"
                    disabled={loading}
                    onChange={(value: "YouTube" | "SoundCloud") => { setPlatform(value) }}
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
                />
            </div>

            <SongList>
                {
                    loading ? <Spinner /> :
                    songs.map((song, index) => (
                        <SongRow 
                            key={`song-${index}-${song.id}`}
                            {...song}
                            onSelect={() => {
                                songIndex.current = index;
                                setShowAddToPlaylist(true)
                            }}
                        />
                    ))
                }
            </SongList>


            { showAddToPlaylist && !loading ? <AddToPlaylistModal song={songs[songIndex.current]} onClose={() => setShowAddToPlaylist(false)} /> : null}
        </Layout>
    );
};