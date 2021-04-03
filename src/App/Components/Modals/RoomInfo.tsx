import dayjs from "dayjs";
import { DangerButton } from "../Button";
import { Modal } from "../Modal";

interface RoomInfoModalProps {
    onClose: Function;
    isOwner: boolean;
    onDelete: Function;
}
export const RoomInfoModal: React.FC<RoomInfoModalProps> = ({
    onClose,
    isOwner,
    onDelete
}) => (
    <Modal
        onClose={onClose}
        title="About">
        <div className="space-y-3 ">
            <span className="block font-bold text-xl truncate">The Hut</span>
            <div className="grid grid-cols-2 gap-5 mt-3">
                <div>
                    <span className="block text-sm opacity-75">Owned By</span>
                    <span className="block truncate font-medium">tomo54321</span>
                </div>
                <div>
                    <span className="block text-sm truncate opacity-75">Created</span>
                    <span className="block font-medium">{dayjs("2021-04-02").format("D MMM YYYY")}</span>
                </div>
                <div>
                    <span className="block text-sm truncate opacity-75">Followers</span>
                    <span className="block font-medium">123,232</span>
                </div>
                {
                    isOwner ?
                    <div>
                        <DangerButton onClick={() => onDelete()} title="Delete Hut"/>
                    </div>
                    : null
                }
            </div>
        </div>
    </Modal>
);