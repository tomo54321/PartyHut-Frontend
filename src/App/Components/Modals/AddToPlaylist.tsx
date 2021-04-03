import { useState } from "react";
import { Error } from "../../types/Error";
import { Song } from "../../types/Song";
import { PrimaryButton, SecondaryButton } from "../Button";
import { ErrorMessage } from "../ErrorMessage";
import { Form } from "../Form";
import { Modal } from "../Modal";
import { SelectField } from "../SelectField";

interface AddToPlaylistModalProps {
    onClose: Function;
    song: Song;
}
export const AddToPlaylistModal: React.FC<AddToPlaylistModalProps> = ({
    onClose
}) => {

    const [selectedPlaylist, setSelected] = useState(0);
    const [errors, setErrors] = useState([] as Error[]);

    return (
        <Modal
            title="Add To Playlist"
            onClose={onClose}
        >
            <Form errors={errors} onSubmit={() => {}}>
                <SelectField
                    value={selectedPlaylist}
                    onChange={(val: number) => setSelected(val)}
                    options={[
                        {
                            value: 0,
                            title: "Monstercat"
                        },
                        {
                            value: 1,
                            title: "Chill Out"
                        }
                    ]}
                />

                <div className="flex space-x-2">
                    <SecondaryButton className="block w-full" title="Cancel" onClick={() => onClose()} />
                    <PrimaryButton type="submit" className="block w-full" title="Add" />
                </div>
            </Form>
        </Modal>
    )
};