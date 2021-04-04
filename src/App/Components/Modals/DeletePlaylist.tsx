import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { PartyHut } from "../../api/api";
import { Error, ErrorResponse } from "../../types/Error";
import { DangerButton, SecondaryButton } from "../Button";
import { Form } from "../Form";
import { Modal } from "../Modal";

interface DeletePlaylistModalProps {
    onClose: Function;
    playlistId: string;
}
export const DeletePlaylistModal: React.FC<DeletePlaylistModalProps> = ({
    onClose,
    playlistId
}) => {
;
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([] as Error[]);

    const cancelToken = useRef(axios.CancelToken.source());
    const history = useHistory();

    const onRemove = useCallback(async () => {
        cancelToken.current = axios.CancelToken.source();
        setLoading(true);

        try {
            await PartyHut.playlist.remove(playlistId, cancelToken.current.token);
            history.push("/playlists");

        } catch (e) {
            const error = e as ErrorResponse;
            setErrors(error.errors);
            setLoading(false);
        }

    }, [history, playlistId]);

    useEffect(() => {
        return () => {
            cancelToken.current.cancel();
        }
    }, []);
    return (
        <Modal
            title="Are you sure?"
            onClose={onClose}
        >
            <p>Are you sure you would like to delete this playlist? Once deleted, It cannot be recovered.</p>
            <Form onSubmit={onRemove} errors={errors}>
                <div className="mt-5 flex space-x-2">
                    <SecondaryButton disabled={loading} className="block w-full" title="Cancel" onClick={() => onClose()}/>
                    <DangerButton disabled={loading} loading={loading} type="submit" className="block w-full" title="Delete Playlist" />
                </div>
            </Form>
        </Modal>
    )
};