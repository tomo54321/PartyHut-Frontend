import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { StandardLayout } from "../../Components/Layout";
import { LoadingIcon } from "../../Components/LoadingIcon";
import { PageHeading } from "../../Components/PageHeading";
import { APIErrorResponse, APIPlaylistResponse, APISong } from "../../Modules/API/d.types";
import { fetchSinglePlaylist } from "../../Modules/API/Playlists";
import { SongRow } from '../../Components/Song/SongRow';
import { DeleteSongModal } from "../../Components/Song/DeleteSongModal";
import { ContextMenu } from "../../Components/ContextMenu";
import { EditPlaylistModal } from "../../Components/Playlist/EditPlaylistModal";
import { DeleteModal } from "../../Components/Playlist/DeleteModal";
import { SearchBar } from "../../Components/SearchBar";
import { DownloadFile } from "../../Utils/DownloadFile";

export const ShowPlaylist = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [showConfirmSongDelete, setShowConfirmSongDelete] = useState(false);
    const [showPlaylistEditModal, setShowPlaylistEditModal] = useState(false);
    const [showPlaylistDeleteModal, setShowPlaylistDeleteModal] = useState(false);
    const [playlist, setPlaylist] = useState({} as APIPlaylistResponse);

    const songId = useRef("0");

    const history = useHistory();
    const match = useRouteMatch();

    const onSongDeleted = useCallback(() => {
        let oldPlaylist = {...playlist};
        const oldSongs = oldPlaylist.songs;
        const songIndex = oldSongs.findIndex(song => song.id === songId.current);

        if(songIndex > 0){
            oldSongs.splice(songIndex, 1);
            oldPlaylist.songs = oldSongs;
        }

        setPlaylist(oldPlaylist);
        setShowConfirmSongDelete(false);

    }, [setPlaylist, playlist]);

    const onPlaylistUpdated = useCallback((name: string) => {
        let oldPlaylist = {...playlist};
        oldPlaylist.title = name;
        setPlaylist(oldPlaylist);
        setShowPlaylistEditModal(false);
    }, [setPlaylist, playlist]);

    const onPlaylistExport = useCallback(() => {
        let playlistExport = {
            name: playlist.title,
            createdBy: playlist.user.username,
            totalSongs: playlist.songs.length,
            songs: playlist.songs.map((song) => ({
                title: song.title,
                artist: song.postedBy,
                artwork: song.thumbnailUrl,
                platform: song.platform,
                platformId: song.platformId
            }))
        };
        let exportString = JSON.stringify(playlistExport);
        DownloadFile(exportString, `partyhouse-export-${Date.now()}.json`);
        
    }, [playlist]);

    useEffect(() => {
        const token = axios.CancelToken.source();
        setIsLoading(true);
        fetchSinglePlaylist((match.params as any).playlistId, token)
            .then(playlist => {
                setPlaylist(playlist);
                setIsLoading(false);
            })
            .catch((e: APIErrorResponse) => {
                if (e.errors[0].msg === "You are not logged in.") {
                    history.push("/login");
                } else {
                    alert(e.errors[0].msg);
                    history.push("/");
                }
            })

        return () => {
            token.cancel();
        }
    }, [match, history]);

    if (isLoading) {
        return (
            <StandardLayout>
                <PageHeading title="Playlist" />
                <LoadingIcon />
            </StandardLayout>
        )
    }

    return (
        <StandardLayout>
            <div className="flex justify-between">
                <div>
                    <PageHeading title={playlist.title} />
                    <span className="block -mt-5 mb-5 text-lg opacity-50">By {playlist.user.username}</span>
                </div>
                <div>
                    <ContextMenu items={[
                        {
                            title: "Export Playlist",
                            onClick: onPlaylistExport
                        },
                        {
                            title: "Edit Playlist",
                            onClick() { setShowPlaylistEditModal(true); }
                        },
                        {
                            title: "Delete Playlist",
                            onClick() { setShowPlaylistDeleteModal(true); }
                        }
                    ]}/>
                </div>
            </div>

            {/* Songs */}
            <PlaylistSongs 
                songs={playlist.songs}
                currentSongId={songId}
                setShowConfirmSongDelete={setShowConfirmSongDelete}
            />


            {/* Modals */}
            { 
                showConfirmSongDelete ? 
                    <DeleteSongModal 
                        id={songId.current} 
                        playlistId={(match.params as any).playlistId} 
                        onDeleted={() => { onSongDeleted(); }}
                        onCancel={() => { setShowConfirmSongDelete(false) }}
                    /> 
                : null 
            }
            { 
                showPlaylistEditModal ? 
                    <EditPlaylistModal 
                        id={(match.params as any).playlistId} 
                        playlistName={playlist.title}
                        onCancel={() => setShowPlaylistEditModal(false) }
                        onEdited={(name: string) => onPlaylistUpdated(name)}
                    />
                : null
            }
            {
                showPlaylistDeleteModal ? 
                    <DeleteModal 
                        id={(match.params as any).playlistId} 
                        onCancel={() => setShowPlaylistDeleteModal(false) }
                        onDeleted={() => history.push("/playlists")}
                    />
                : null
            }
        </StandardLayout>
    );

};

const PlaylistSongs: React.FC<{ songs: APISong[], currentSongId: React.MutableRefObject<string>, setShowConfirmSongDelete: Function }> = ({
    songs,
    currentSongId,
    setShowConfirmSongDelete,
}) => {

    const [query, setQuery] = useState("");
    const songList = songs.map((song) => {
        if(query !== "" && !song.title.includes(query)){
            return null;
        }
        return (
            <SongRow
                key={`${song.id}`}
                platformId={song.platformId}
                title={song.title}
                postedBy={song.postedBy}
                thumbnailUrl={song.thumbnailUrl}
                platform={song.platform}
                onDeleteClicked={() => { 
                    currentSongId.current = song.id;
                    setShowConfirmSongDelete(true);
                }}
            />
        )
    })

    return (
        <div>
            <SearchBar 
                value={query}
                onQueryChange={(text: string) => setQuery(text)}
                placeholder="Filter Songs"
                onSubmit={() => {}}
            />
            {songList}
        </div>
    )
}