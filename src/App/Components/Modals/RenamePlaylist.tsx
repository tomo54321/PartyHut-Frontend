import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "../Button";
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

    return (
        <Modal
            title="Rename Playlist"
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
                    onTextChange={(text: string) => setName(text)}
                    value={name}
                    required
                />
                <div className="mt-5 flex space-x-2">
                    <SecondaryButton className="block w-full" title="Cancel" onClick={() => onClose()} />
                    <PrimaryButton type="submit" className="block w-full" title="Rename Playlist" />
                </div>
            </form>
        </Modal>
    )
};