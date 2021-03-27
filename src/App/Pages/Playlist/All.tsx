import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { PrimaryButton } from "../../Components/Buttons";
import { StandardLayout } from "../../Components/Layout";
import { LoadingIcon } from "../../Components/LoadingIcon";
import { PageHeading } from "../../Components/PageHeading";
import { CreateModal } from "../../Components/Playlist/CreateModal";
import { DeleteModal } from "../../Components/Playlist/DeleteModal";
import { PlaylistRow } from "../../Components/Playlist/PlaylistRow";
import { APIErrorResponse, APIPlaylistListResponse } from "../../Modules/API/d.types";
import { fetchAllPlaylists } from "../../Modules/API/Playlists";

export const AllPlaylists = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [playlists, setPlaylists] = useState([] as APIPlaylistListResponse[]);

    const playlistRemoveId = useRef("0");

    const history = useHistory();

    const onPlaylistCreated = useCallback(playlist => {
        setShowCreateModal(false);
        const playlistList = [...playlists];
        playlistList.push({...playlist, totalSongs: 0});
        setPlaylists(playlistList);
    }, [playlists, setPlaylists, setShowCreateModal]);
    const onPlaylistDeleted = useCallback(id => {
        setShowDeleteModal(false);
        const playlistList = [...playlists];
        const index = playlistList.findIndex(playlist => playlist.id === id);
        if(index !== -1){
            playlistList.splice(index, 1);
        }
        setPlaylists(playlistList);
    }, [playlists, setPlaylists, setShowDeleteModal]);

    useEffect(() => {
        const token = axios.CancelToken.source();
        fetchAllPlaylists(token)
        .then(playlists => {
            setPlaylists(playlists);
            setIsLoading(false);
        })
        .catch((e: APIErrorResponse) => {
            if(e.errors[0].msg === "You are not logged in."){
                history.push("/login");
            } else {
                alert(e.errors[0].msg);
                history.push("/");
            }
        })
    
        return () => {
            token.cancel();
        }
    }, [history]);

    if(isLoading){ 
        return (    
            <StandardLayout>
                <PageHeading title="Playlists" />
                <LoadingIcon />
            </StandardLayout>
        )
    }

    const myPlaylists = playlists.map(playlist => (
        <PlaylistRow 
            key={"playlist-" + playlist.id} 
            id={playlist.id} 
            title={playlist.title} 
            songCount={playlist.totalSongs}
            onDeleteClicked={() => {
                playlistRemoveId.current = playlist.id;
                setShowDeleteModal(true);
            }}
        />
    ))

    return (
        <StandardLayout>
            {
                showCreateModal ? <CreateModal onCancel={() => { setShowCreateModal(false) }} onCreated={onPlaylistCreated} /> : null
            }
            {
                showDeleteModal ? <DeleteModal id={playlistRemoveId.current} onCancel={() => { setShowDeleteModal(false) }} onDeleted={onPlaylistDeleted} /> : null
            }
            <div className="flex justify-between">
                <PageHeading title="Playlists" />
                <div>
                    <PrimaryButton type="button" sm title="Create Playlist" onClick={() => { setShowCreateModal(true) }}/>
                </div>
            </div>

            <div>
                {myPlaylists}
            </div>

        </StandardLayout>
    );

};

