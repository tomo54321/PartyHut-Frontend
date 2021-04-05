import { useCallback, useState } from "react";
import { useSelector } from "react-redux"
import { socketAPI } from "../../api/socketapi";
import { ApplicationState } from "../../redux/Store";
import { PrimaryButton, SecondaryButton } from "../Button";
import { Form } from "../Form";
import { Modal } from "../Modal";
import { SelectField } from "../SelectField";

interface JoinDjQueuePlaylistProps {
    onClose: Function;
}
export const JoinDjQueuePlaylist: React.FC<JoinDjQueuePlaylistProps> = ({
    onClose,
}) => {

    const playlists = useSelector((state: ApplicationState) => state.playlist.playlists);
    const [selectedPlaylist, setSelected] = useState(playlists[0].id);
    
    const onJoinDJQueue = useCallback(() => {
        socketAPI.emit("join queue", { playlistId: selectedPlaylist });
        onClose();
    }, [selectedPlaylist, onClose]);

    return (
        <Modal
            title="Join DJ Queue"
            onClose={onClose}
        >
            {
                playlists.length < 1 ?
                    <p className="text-center font-medium">You need to create a playlist to become a DJ.</p>
                    :
                    <Form errors={[]} onSubmit={() => { }}>
                        <p>Which playlist would you like to DJ?</p>
                        <SelectField
                            value={selectedPlaylist}
                            onChange={(val: string) => setSelected(val)}
                            options={playlists.map(playlist => ({
                                title: playlist.name,
                                value: playlist.id
                            }))}
                        />

                        <div className="flex space-x-2">
                            <SecondaryButton className="block w-full" title="Cancel" onClick={() => onClose()} />
                            <PrimaryButton type="submit" className="block w-full" title="Join DJ Queue" onClick={onJoinDJQueue}/>
                        </div>
                    </Form>
            }
        </Modal>
    )
};