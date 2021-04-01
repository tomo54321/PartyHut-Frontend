import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "../Button";
import { Modal } from "../Modal";
import { TextInputGroup } from "../TextInputGroup";

interface CreateHutModalProps {
    onClose: Function;
}
export const CreateHutModal: React.FC<CreateHutModalProps> = ({
    onClose
}) => {

    const [hutName, setHutName] = useState("");

    return (
        <Modal
            title="Create a Hut"
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
                    title="Hut Name"
                    placeholder="The Party Hut"
                    onTextChange={(text: string) => setHutName(text)}
                    value={hutName}
                    required
                />
                <div className="flex space-x-2">
                    <SecondaryButton className="block w-full" title="Cancel" onClick={() => onClose()}/>
                    <PrimaryButton type="submit" className="block w-full" title="Create Hut" />
                </div>
            </form>
        </Modal>
    )
};