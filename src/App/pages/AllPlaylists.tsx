import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PartyHut } from "../api/api";
import { PrimaryButton } from "../components/Button";
import { Card } from "../components/Card";
import { CardGrid } from "../components/CardGrid";
import { Layout } from "../components/Layout";
import { CreatePlaylistModal } from "../components/Modals/CreatePlaylist";
import { ApplicationState } from "../redux/Store";
import { SimplePlaylistResponse } from "../types/api/PlaylistResponse";
import { ErrorResponse } from "../types/Error";
import { setPlaylists as setCachePlaylists } from "../redux/actions/PlaylistActions";

interface AllPlaylistsPageProps { }
export const AllPlaylistsPage: React.FC<AllPlaylistsPageProps> = () => {

    const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false);
    const cachePlaylists = useSelector((state: ApplicationState) => state.playlist.playlists);
    const dispatch = useDispatch();
    const [playlists, setPlaylists] = useState(cachePlaylists as SimplePlaylistResponse[]);

    
    useEffect(() => {

        const cancelToken = axios.CancelToken.source();
        PartyHut.playlist.all(cancelToken.token)
        .then(data => {
            dispatch(setCachePlaylists({
                updated_at: Date.now(),
                playlists: data
            }));
            setPlaylists(data);
        })
        .catch(e => {
            const error = e as ErrorResponse;
            alert(error.errors[0].msg);
        })

        return () => {
            cancelToken.cancel();
        };
    }, [dispatch]);

    return (
        <Layout
            title="My Playlists"
            RightItem={() => <PrimaryButton onClick={() => setShowCreatePlaylistModal(true)} title="New Playlist" />}
        >

            <CardGrid>

                {
                    playlists.length > 0 ?
                        playlists.map((playlist, index) => (
                            <Card
                                key={`playist-${index}-${playlist.id}`}
                                image={playlist.artwork}
                                title={playlist.name}
                                link={`/playlist/${playlist.id}`}
                                subtitle={`${playlist.total_songs} songs`}
                            />
                        ))
                        :
                        <p className="col-span-full text-center font-medium my-2">You don't have any playlists.</p>
                }

            </CardGrid>

            {showCreatePlaylistModal ? <CreatePlaylistModal onClose={() => setShowCreatePlaylistModal(false)} /> : null}
        </Layout>
    );
};