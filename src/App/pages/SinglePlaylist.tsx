import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { PartyHut } from "../api/api";
import { PrimaryButton, DangerButton } from "../components/Button";
import { Layout } from "../components/Layout";
import { DeletePlaylistModal } from "../components/Modals/DeletePlaylist";
import { RenamePlaylistModal } from "../components/Modals/RenamePlaylist";
import { SongList } from "../components/SongList";
import { SongRow } from "../components/SongRow";
import { Spinner } from "../components/Spinner";
import { PlaylistResponse } from "../types/api/PlaylistResponse";
import { ErrorResponse } from "../types/Error";
interface SinglePlaylistPageProps { }
export const SinglePlaylistPage: React.FC<SinglePlaylistPageProps> = () => {

    const [showDeletePlaylistModal, setShowDeletePlaylistModal] = useState(false);
    const [showRenamePlaylistModal, setShowRenamePlaylistModal] = useState(false);
    
    const [loading, setLoading] = useState(true);
    const [playlist, setPlaylist] = useState<PlaylistResponse | null>(null);

    const match = useRouteMatch();
    const history = useHistory();
    const cancelToken = useRef(axios.CancelToken.source());

    const removeSong = useCallback(async (id: string) => {
        setLoading(true);
        cancelToken.current = axios.CancelToken.source();

        try {
            await PartyHut.playlist.removeSong(playlist!.id, id, cancelToken.current.token);

            const oldPlaylist = {...playlist};
            const songRemoveIndex = oldPlaylist.songs!.findIndex(song => song.id === id);
            oldPlaylist.songs!.splice(songRemoveIndex, 1);
            setPlaylist(oldPlaylist as PlaylistResponse);

            setLoading(false);
        } catch (e) {
            const error = e as ErrorResponse;
            alert(error.errors[0].msg);
            setLoading(false);
        }
    }, [playlist]);

    useEffect(() => {
        setLoading(true);
        setPlaylist(null);
        
        PartyHut.playlist.get((match.params as any).playlistId, cancelToken.current.token)
        .then(data => {
            setLoading(false);
            setPlaylist(data);
        })
        .catch((error: ErrorResponse) => {
            alert(error.errors[0].msg);
            history.push("/playlists");
        });
        return () => {
            cancelToken.current.cancel();
        };
    }, [match, history]);

    if(loading || playlist === null) {
        return <Layout title={"Playlist"}><Spinner /></Layout>
    }

    return (
        <Layout
            title={playlist!.name}
            RightItem={() => (
                <div className="flex flex-wrap space-y-2 md:flex-nowrap md:space-y-0 md:space-x-2">
                    <PrimaryButton onClick={() => setShowRenamePlaylistModal(true)} className="w-full md:w-max" title="Rename Playlist" />
                    <DangerButton onClick={() => setShowDeletePlaylistModal(true)} className="w-full md:w-max" title="Delete Playlist" />
                </div>
            )}
        >
            <div className="block -mt-5 font-medium opacity-75">
                <span>By {playlist!.user.username}</span>
                {' '}&bull;{' '}
                <span>{playlist!.songs.length} songs</span>
            </div>

            <SongList>
                {
                    playlist!.songs.length < 1 ? 
                    <div className="w-full text-center space-y-3">
                        <p className="text-sm opacity-75">You don't have any songs</p>
                        <Link to="/music" className="inline-block bg-indigo-500 py-3 px-5 font-medium rounded-md">Add Some</Link>
                    </div>
                    :
                    playlist!.songs.map((song, index) => (
                        <SongRow 
                            key={`song-${song.id}-${index}`} 
                            {...song} 
                            Button={({className}: {className: string}) => (
                                <DangerButton className={className} onClick={() => removeSong(song.id)} title="Remove"/>
                            )}
                            onSelect={() => {}}
                        />
                    ))
                }
            </SongList>

            {showDeletePlaylistModal ? <DeletePlaylistModal playlistId={playlist!.id} onClose={() => setShowDeletePlaylistModal(false)} /> : null}
            {showRenamePlaylistModal ? <RenamePlaylistModal playlistName={playlist!.name} playlistId={playlist!.id} onClose={() => setShowRenamePlaylistModal(false)} /> : null}
        </Layout>
    );
};