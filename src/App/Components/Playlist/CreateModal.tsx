import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { APIErrorResponse } from "../../Modules/API/d.types";
import { createPlaylist } from "../../Modules/API/Playlists";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { FormGroup } from "../FormGroup";
import { LoadingIcon } from "../LoadingIcon";
import { Modal } from "../Modal";

export const CreateModal: React.FC<{onCreated: Function, onCancel: Function}> = ({
    onCreated,
    onCancel
}) => {

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({errors: []} as APIErrorResponse);
    const cancelToken = useRef(axios.CancelToken.source());

    const onSubmitForm = useCallback(async () => {
        setLoading(true);
        cancelToken.current = axios.CancelToken.source();

        try {
            const playlist = await createPlaylist(name, cancelToken.current);
            setName("");
            setLoading(false);
            onCreated(playlist);
        } catch (e) {
            setLoading(false);
            setErrors(e);
        }
    }, [onCreated, name]);

    useEffect(() => {
        return () => {
            cancelToken.current.cancel();
        }
    } ,[]);

    return (
        <Modal>
            <h2 className="font-semibold text-xl mb-5">New Playlist</h2>
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
                <FormGroup 
                    type="text"
                    name="name"
                    title="Playlist Name"
                    value={name}
                    onTextChange={(text: string) => setName(text)}
                    required
                    disabled={loading}
                />
                <div className="flex space-x-2">
                    <PrimaryButton type="submit" disabled={loading}>
                        Create Playlist { loading ? <LoadingIcon /> : null}
                    </PrimaryButton>
                    <SecondaryButton type="button" disabled={loading} onClick={() => {onCancel()}} title="Cancel"/>
                </div>
            </form>
        </Modal>
    )

};