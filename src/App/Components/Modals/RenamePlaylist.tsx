import { useState } from "react";
import { Error } from "../../types/Error";
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
    const [errors, setErrors] = useState([] as Error[]);

    return (
        <Modal
            title="Rename Playlist"
            onClose={onClose}
        >
            <Form errors={errors} onSubmit={() => {}}>
                <TextInputGroup
                    title="Playlist Name"
                    placeholder="My Party Beats"
                    onTextChange={(text: string) => setName(text)}
                    value={name}
                    required
                />
                <div className="mt-5 flex space-x-2">
                    <SecondaryButton className="block w-full" title="Cancel" onClick={() => onClose()} />
                    <PrimaryButton type="submit" className="block w-full" title="Rename Playlist" />
                </div>
            </Form>
        </Modal>
    )
};