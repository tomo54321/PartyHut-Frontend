import { useState } from "react";
import { Error } from "../../types/Error";
import { DangerButton, SecondaryButton } from "../Button";
import { Form } from "../Form";
import { Modal } from "../Modal";

interface RoomDeleteModalProps {
    onClose: Function;
    onDelete: Function;
}
export const RoomDeleteModal: React.FC<RoomDeleteModalProps> = ({
    onClose,
    onDelete
}) => {
    
    const [errors, setErrors] = useState([] as Error[]);
    return (
        <Modal
            onClose={onClose}
            title="Are you sure?">
            <p>Are you sure you would like to delete this hut? Once deleted, It cannot be recovered.</p>
            <Form onSubmit={() => { }} errors={errors}>
                <div className="mt-5 flex space-x-2">
                    <SecondaryButton className="block w-full" title="Cancel" onClick={() => onClose()} />
                    <DangerButton type="submit" className="block w-full" title="Delete Gut" />
                </div>
            </Form>
        </Modal>
    )
};