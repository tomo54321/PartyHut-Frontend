import { useState } from "react";
import { Song } from "../../types/Song";
import { PrimaryButton, SecondaryButton } from "../Button";
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

    return (
        <Modal
            title="Add To Playlist"
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
                    <SecondaryButton className="block w-full" title="Cancel" onClick={() => onClose()}/>
                    <PrimaryButton type="submit" className="block w-full" title="Add" />
                </div>
            </form>
        </Modal>
    )
};