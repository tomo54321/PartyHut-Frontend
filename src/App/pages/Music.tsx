import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { AddToPlaylistModal } from "../components/Modals/AddToPlaylist";
import { SearchInput } from "../components/SearchInput";
import { SelectField } from "../components/SelectField";
import { SongList } from "../components/SongList";
import { SongRow } from "../components/SongRow";
import { Song } from "../types/Song";

interface MusicPageProps { }
export const MusicPage: React.FC<MusicPageProps> = () => {

    const [platform, setPlatform] = useState("YouTube" as "YouTube" | "SoundCloud");
    const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
    const [songs, setSongs] = useState([
        {
            id: "abc",
            title: "Koven - Numb [Monstercat Release]",
            postedBy: "Monstercat Uncaged",
            platform: platform,
            platformId: "ABCD",
            thumbnailUrl: "http://placehold.it/150x150",
            duration: 185.6
        }
    ] as Song[]);

    return (
        <Layout title="Search Music">

            <div className="flex space-x-2">
                <SearchInput
                    placeholder="Search for music"
                    onSearch={(query: string) => { }}
                />
                <SelectField
                    value={platform}
                    className="w-52"
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
                <SongRow
                    {...songs[0]}
                    onSelect={() => {
                        setShowAddToPlaylist(true)
                    }}
                />
            </SongList>


            { showAddToPlaylist ? <AddToPlaylistModal song={songs[0]} onClose={() => setShowAddToPlaylist(false)} /> : null}
        </Layout>
    );
};