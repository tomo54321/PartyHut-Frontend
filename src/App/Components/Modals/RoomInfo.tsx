import { Modal } from "../Modal";

interface RoomInfoModalProps {
    onClose: Function
}
export const RoomInfoModal: React.FC<RoomInfoModalProps> = ({
    onClose
}) => (
    <Modal 
    onClose={onClose}
    title="About">
        
    </Modal>
);