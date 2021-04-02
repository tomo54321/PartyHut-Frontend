import { Modal } from "../Modal";
import { TextInputGroup } from "../TextInputGroup";

interface RoomShareModalProps {
    onClose: Function
}
export const RoomShareModal: React.FC<RoomShareModalProps> = ({
    onClose
}) => (
    <Modal 
    onClose={onClose}
    title="Share">
        <p className="mb-3 text-sm">Share the following link with your friends and family to let them join!</p>
        <TextInputGroup 
            title="Share URL"
            value={window.location.href}
            onTextChange={() => {}}
            disabled
        />

    </Modal>
);