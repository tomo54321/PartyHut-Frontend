import { useState } from "react";
import { Error } from "../../types/Error";
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
    const [errors, setErrors] = useState([] as Error[]);

    return (
        <Modal
            title="New Playlist"
            onClose={onClose}
        >
            <Form onSubmit={() => {}} errors={errors}>
                <TextInputGroup
                    title="Playlist Name"
                    placeholder="My Party Beats"
                    onTextChange={(text: string) => setPlaylistName(text)}
                    value={playlistName}
                    required
                />
                <div className="flex space-x-2">
                    <SecondaryButton className="block w-full" title="Cancel" onClick={() => onClose()}/>
                    <PrimaryButton type="submit" className="block w-full" title="Create Playlist" />
                </div>
            </Form>
        </Modal>
    )
};