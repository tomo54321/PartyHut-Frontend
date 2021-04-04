import React, { useState } from "react";
import { PrimaryButton, DangerButton } from "../components/Button";
import { Layout } from "../components/Layout";
import { DeletePlaylistModal } from "../components/Modals/DeletePlaylist";
import { RenamePlaylistModal } from "../components/Modals/RenamePlaylist";
import { SongList } from "../components/SongList";
import { SongRow } from "../components/SongRow";
import { Song } from "../types/Song";
interface SinglePlaylistPageProps { }
export const SinglePlaylistPage: React.FC<SinglePlaylistPageProps> = () => {

    const [showDeletePlaylistModal, setShowDeletePlaylistModal] = useState(false);
    const [showRenamePlaylistModal, setShowRenamePlaylistModal] = useState(false);

    const [playlist, setPlaylist] = useState({
        id: "abcd",
        title: "Monstercat",
        owner: {
            username: "tomo54321"
        },
        totalSongs: 10,
        songs: [{
            id: "abcd",
            title: "Yes",
            artist: "Monstercat",
            platform: "YouTube",
            artwork: "http://placehold.it/150x150",
            platform_id: "abcd",
            duration: 158.22
        } as Song]
    });

    return (
        <Layout
            title={playlist.title}
            RightItem={() => (
                <div className="flex flex-wrap space-y-2 md:flex-nowrap md:space-y-0 md:space-x-2">
                    <PrimaryButton onClick={() => setShowRenamePlaylistModal(true)} className="w-full md:w-max" title="Rename Playlist" />
                    <DangerButton onClick={() => setShowDeletePlaylistModal(true)} className="w-full md:w-max" title="Delete Playlist" />
                </div>
            )}
        >
            <div className="block -mt-5 font-medium opacity-75">
                <span>By {playlist.owner.username}</span>
                {' '}&bull;{' '}
                <span>{playlist.totalSongs} songs</span>
            </div>

            <SongList>
                {
                    playlist.songs.map((song, index) => (
                        <SongRow 
                            key={`song-${song.id}-${index}`} 
                            {...song} 
                            Button={({className}: {className: string}) => (
                                <DangerButton className={className} title="Remove"/>
                            )}
                            onSelect={() => {}}
                        />
                    ))
                }
            </SongList>

            {showDeletePlaylistModal ? <DeletePlaylistModal playlistId={playlist.id} onClose={() => setShowDeletePlaylistModal(false)} /> : null}
            {showRenamePlaylistModal ? <RenamePlaylistModal playlistName={playlist.title} playlistId={playlist.id} onClose={() => setShowRenamePlaylistModal(false)} /> : null}
        </Layout>
    );
};