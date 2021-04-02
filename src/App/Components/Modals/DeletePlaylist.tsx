import { DangerButton, SecondaryButton } from "../Button";
import { Modal } from "../Modal";

interface DeletePlaylistModalProps {
    onClose: Function;
    playlistId: string;
}
export const DeletePlaylistModal: React.FC<DeletePlaylistModalProps> = ({
    onClose,
    playlistId
}) => {

    return (
        <Modal
            title="Are you sure?"
            onClose={onClose}
        >
            <p>Are you sure you would like to delete this playlist? Once deleted, It cannot be recovered.</p>
            <form
                action=""
                method="POST"
                className="space-y-5"
                onSubmit={e => {
                    e.preventDefault();
                }}
            >
                <div className="mt-5 flex space-x-2">
                    <SecondaryButton className="block w-full" title="Cancel" onClick={() => onClose()}/>
                    <DangerButton type="submit" className="block w-full" title="Delete Playlist" />
                </div>
            </form>
        </Modal>
    )
};