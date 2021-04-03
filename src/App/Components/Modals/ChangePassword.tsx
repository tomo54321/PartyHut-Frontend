import { useState } from "react";
import { Error } from "../../types/Error";
import { PrimaryButton, SecondaryButton } from "../Button";
import { ErrorMessage } from "../ErrorMessage";
import { Form } from "../Form";
import { Modal } from "../Modal";
import { TextInputGroup } from "../TextInputGroup";

interface ChangePasswordModalProps {
    onClose: Function;
}
export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
    onClose
}) => {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [errors, setErrors] = useState([] as Error[]);

    return (
        <Modal
            title="Change your password"
            onClose={onClose}
        >
            <Form errors={errors} onSubmit={() => { }}>
                <TextInputGroup
                    type="password"
                    title="Current password"
                    onTextChange={(text: string) => setCurrentPassword(text)}
                    value={currentPassword}
                    required
                />
                <TextInputGroup
                    type="password"
                    title="New password"
                    onTextChange={(text: string) => setNewPassword(text)}
                    value={newPassword}
                    required
                />
                <TextInputGroup
                    type="password"
                    title="Confirm new password"
                    onTextChange={(text: string) => setConfirmNewPassword(text)}
                    value={confirmNewPassword}
                    required
                />
                <div className="flex space-x-2">
                    <SecondaryButton className="block w-full" title="Cancel" onClick={() => onClose()} />
                    <PrimaryButton type="submit" className="block w-full" title="Update Password" />
                </div>
            </Form>
        </Modal>
    )
};