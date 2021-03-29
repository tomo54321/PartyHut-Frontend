import { useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../Redux/Store";
import { PrimaryButton } from "../Buttons";
import { SelectDropdown } from "../SelectDropdown";

export const PickAndQueue: React.FC<{
    isDJ: boolean,
    isInQueue: boolean,
    onJoinQueue: Function,
}> = ({
    isDJ,
    isInQueue,
    onJoinQueue
}) => {

    const playlists = useSelector((state: ApplicationState) => state.user.playlists);
    const [playlistValue, setPlaylistValue] = useState(playlists && playlists.length > 0 ? playlists![0].id : "");

    if(playlists && playlists.length < 1){
        return (
            <div className="space-y-3">
                <SelectDropdown
                    onChange={() => {}}
                    value={""}
                    disabled={true}
                    options={[
                        {
                            title: "You don't have any playlists",
                            value: ""
                        }
                    ]}
                />
                <PrimaryButton
                    type="link"
                    href="/playlist"
                    title="Create a playlist"
                />
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <SelectDropdown
                onChange={(val: string) => setPlaylistValue(val)}
                value={playlistValue}
                options={playlists!.map((playlist) => ({
                    title: playlist.title,
                    value: playlist.id
                }))}
            />
            <PrimaryButton
                type="button"
                title={isDJ ? "You're DJing" : isInQueue ? "You're in the queue" : "Start DJing"}
                disabled={isDJ || isInQueue}
                onClick={e => {
                    onJoinQueue(playlistValue)
                    e.preventDefault();
                }}
            />
        </div>
    )

};