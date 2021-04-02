import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "../Button";
import { Modal } from "../Modal";
import { TextInputGroup } from "../TextInputGroup";

interface CreatePlaylistModalProps {
    onClose: Function;
}
export const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
    onClose
}) => {

    const [playlistName, setPlaylistName] = useState("");

    return (
        <Modal
            title="New Playlist"
            onClose={onClose}
        >
            <form
                action=""
                method="POST"
                className="space-y-5"
                onSubmit={e => {
                    e.preventDefault();
                }}
            >
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
            </form>
        </Modal>
    )
};