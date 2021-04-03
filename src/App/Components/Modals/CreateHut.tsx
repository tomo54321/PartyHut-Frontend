import { useState } from "react";
import { Error } from "../../types/Error";
import { PrimaryButton, SecondaryButton } from "../Button";
import { ErrorMessage } from "../ErrorMessage";
import { Form } from "../Form";
import { Modal } from "../Modal";
import { TextInputGroup } from "../TextInputGroup";

interface CreateHutModalProps {
    onClose: Function;
}
export const CreateHutModal: React.FC<CreateHutModalProps> = ({
    onClose
}) => {

    const [hutName, setHutName] = useState("");
    const [errors, setErrors] = useState([] as Error[]);

    return (
        <Modal
            title="Create a Hut"
            onClose={onClose}
        >
            <Form onSubmit={() => {}} errors={errors}>
                <TextInputGroup
                    title="Hut Name"
                    placeholder="The Party Hut"
                    onTextChange={(text: string) => setHutName(text)}
                    value={hutName}
                    required
                />
                <div className="flex space-x-2">
                    <SecondaryButton className="block w-full" title="Cancel" onClick={() => onClose()} />
                    <PrimaryButton type="submit" className="block w-full" title="Create Hut" />
                </div>
            </Form>
        </Modal>
    )
};