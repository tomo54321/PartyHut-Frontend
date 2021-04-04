import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { PartyHut } from "../../api/api";
import { setPlaylists } from "../../redux/actions/PlaylistActions";
import { ApplicationState } from "../../redux/Store";
import { Error, ErrorResponse } from "../../types/Error";
import { PrimaryButton, SecondaryButton } from "../Button";
import { Form } from "../Form";
import { Modal } from "../Modal";
import { TextInputGroup } from "../TextInputGroup";

interface CreatePlaylistModalProps {
    onClose: Function;
}
export const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
    onClose
}) => {

    const [playlistName, setPlaylistName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([] as Error[]);

    const dispatch = useDispatch();
    const playlists = useSelector((state: ApplicationState) => state.playlist.playlists);
    const history = useHistory();
    const cancelToken = useRef(axios.CancelToken.source());

    const onCreatePlaylist = useCallback(async () => {
        cancelToken.current = axios.CancelToken.source();
        setLoading(true);
        setErrors([]);
        
        try {
            const playlist = await PartyHut.playlist.create(playlistName, cancelToken.current.token);

            const oldPlaylists = [...playlists, playlist];
            dispatch(setPlaylists({
                updated_at: Date.now(),
                playlists: oldPlaylists
            }));
            history.push(`/playlist/${playlist.id}`);

        } catch (e) {
            const error = e as ErrorResponse;
            setErrors(error.errors);
            setLoading(false);
        }

    }, [history, dispatch, playlists, playlistName]);

    useEffect(() => {
        return () => cancelToken.current.cancel();
    }, []);

    return (
        <Modal
            title="New Playlist"
            onClose={onClose}
        >
            <Form onSubmit={onCreatePlaylist} errors={errors}>
                <TextInputGroup
                    title="Playlist Name"
                    placeholder="My Party Beats"
                    onTextChange={(text: string) => setPlaylistName(text)}
                    value={playlistName}
                    disabled={loading}
                    required
                />
                <div className="flex space-x-2">
                    <SecondaryButton disabled={loading} className="block w-full" title="Cancel" onClick={() => onClose()}/>
                    <PrimaryButton loading={loading} disabled={loading} type="submit" className="block w-full" title="Create Playlist" />
                </div>
            </Form>
        </Modal>
    )
};