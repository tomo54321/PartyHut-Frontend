import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { PartyHut } from "../../api/api";
import { ApplicationState } from "../../redux/Store";
import { Error, ErrorResponse } from "../../types/Error";
import { Song } from "../../types/Song";
import { PrimaryButton, SecondaryButton } from "../Button";
import { Form } from "../Form";
import { Modal } from "../Modal";
import { SelectField } from "../SelectField";

interface AddToPlaylistModalProps {
    onClose: Function;
    song: Song;
}
export const AddToPlaylistModal: React.FC<AddToPlaylistModalProps> = ({
    onClose,
    song
}) => {

    const playlists = useSelector((state: ApplicationState) => state.playlist.playlists);
    const [selectedPlaylist, setSelected] = useState(playlists[0]?.id || "");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([] as Error[]);

    const cancelToken = useRef(axios.CancelToken.source());

    const onAddToPlaylist = useCallback(async () => {
        cancelToken.current = axios.CancelToken.source();
        setLoading(true);
        setErrors([]);
        
        try {
            await PartyHut.playlist.addSong(selectedPlaylist, song.platform_id, song.platform, cancelToken.current.token);
            onClose();

        } catch (e) {
            console.log(e);
            const error = e as ErrorResponse;
            setErrors(error.errors);
            setLoading(false);
        }

    }, [song, selectedPlaylist, onClose]);

    useEffect(() => {
        return () => cancelToken.current.cancel();
    }, []);

    return (
        <Modal
            title="Add To Playlist"
            onClose={onClose}
        >
            {
                playlists.length < 1 ?
                    <p className="text-center font-medium">You don't have any playlists.</p>
                    :
                    <Form errors={errors} onSubmit={onAddToPlaylist}>
                        <p>Add {song.title} to playlist</p>
                        <SelectField
                            value={selectedPlaylist}
                            onChange={(val: string) => setSelected(val)}
                            options={playlists.map(playlist => ({
                                title: playlist.name,
                                value: playlist.id
                            }))}
                        />

                        <div className="flex space-x-2">
                            <SecondaryButton className="block w-full" disabled={loading} title="Cancel" onClick={() => onClose()} />
                            <PrimaryButton type="submit" className="block w-full" disabled={loading} loading={loading} title="Add" />
                        </div>
                    </Form>
            }
        </Modal>
    )
};