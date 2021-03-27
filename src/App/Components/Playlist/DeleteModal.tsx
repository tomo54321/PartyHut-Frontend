import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { APIErrorResponse } from "../../Modules/API/d.types";
import { deletePlaylist } from "../../Modules/API/Playlists";
import { DangerButton, SecondaryButton } from "../Buttons";
import { LoadingIcon } from "../LoadingIcon";
import { Modal } from "../Modal";

export const DeleteModal: React.FC<{id: string, onDeleted: Function, onCancel: Function}> = ({
    id,
    onDeleted,
    onCancel
}) => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({errors: []} as APIErrorResponse);
    const cancelToken = useRef(axios.CancelToken.source());

    const onSubmitForm = useCallback(async () => {
        setLoading(true);
        cancelToken.current = axios.CancelToken.source();

        try {
            await deletePlaylist(id, cancelToken.current);
            setLoading(false);
            onDeleted(id);
        } catch (e) {
            setLoading(false);
            setErrors(e);
        }
    }, [onDeleted, id]);

    useEffect(() => {
        return () => {
            cancelToken.current.cancel();
        }
    } ,[]);

    return (
        <Modal>
            <h2 className="font-semibold text-xl mb-5">Are you sure?</h2>
            {
                errors.errors.length > 0 ? 
                <p className="text-red-500 my-3">{errors.errors[0].msg}</p>
                : null
            }
            <form
                action=""
                method="POST"
                onSubmit={e => {
                    onSubmitForm();
                    e.preventDefault();
                }}
            >
                <p className="mb-5">Are you sure you would like to delete this playlist? You cannot restore a playlist once it has been deleted.</p>
                <div className="flex space-x-2">
                    <DangerButton type="submit" disabled={loading}>
                        Delete Playlist { loading ? <LoadingIcon /> : null}
                    </DangerButton>
                    <SecondaryButton type="button" disabled={loading} onClick={() => {onCancel()}} title="Cancel"/>
                </div>
            </form>
        </Modal>
    )

};