import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { PartyHut } from "../../api/api";
import { Error, ErrorResponse } from "../../types/Error";
import { PrimaryButton, SecondaryButton } from "../Button";
import { Form } from "../Form";
import { Modal } from "../Modal";
import { TextInputGroup } from "../TextInputGroup";

interface RenamePlaylistModalProps {
    onClose: Function;
    playlistName: string;
    playlistId: string;
}
export const RenamePlaylistModal: React.FC<RenamePlaylistModalProps> = ({
    onClose,
    playlistName,
    playlistId
}) => {

    const [name, setName] = useState(playlistName);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([] as Error[]);

    const cancelToken = useRef(axios.CancelToken.source());

    const onRename = useCallback(async () => {
        cancelToken.current = axios.CancelToken.source();
        setLoading(true);

        try {
            await PartyHut.playlist.rename(playlistId, name, cancelToken.current.token);

            onClose();

        } catch (e) {
            const error = e as ErrorResponse;
            setErrors(error.errors);
            setLoading(false);
        }

    }, [name, playlistId, onClose]);

    useEffect(() => {
        return () => {
            cancelToken.current.cancel();
        }
    }, []);

    return (
        <Modal
            title="Rename Playlist"
            onClose={onClose}
        >
            <Form errors={errors} onSubmit={onRename}>
                <TextInputGroup
                    title="Playlist Name"
                    placeholder="My Party Beats"
                    onTextChange={(text: string) => setName(text)}
                    value={name}
                    disabled={loading}
                    required
                />
                <div className="mt-5 flex space-x-2">
                    <SecondaryButton className="block w-full" title="Cancel" disabled={loading} onClick={() => onClose()} />
                    <PrimaryButton type="submit" className="block w-full" loading={loading} disabled={loading} title="Rename Playlist" />
                </div>
            </Form>
        </Modal>
    )
};