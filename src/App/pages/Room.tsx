import { useState } from "react";
import { PrimaryButton } from "../components/Button";
import { RoomDeleteModal } from "../components/Modals/RoomDelete";
import { RoomInfoModal } from "../components/Modals/RoomInfo";
import { RoomShareModal } from "../components/Modals/RoomShare";
import { PlayerOffset } from "../components/PlayerOffset";
import { RoomBackgroundImage } from "../components/Room/BackgroundImage"
import { RoomHeader } from "../components/Room/Header";
import { User } from "../components/Room/User";

interface RoomProps { }

export const Room: React.FC<RoomProps> = () => {

    const [showRoomInfoModal, setShowRoomInfoModal] = useState(false);
    const [showRoomDeleteModal, setShowRoomDeleteModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    return (
        <div className="relative h-full w-full">
            <RoomHeader
                name="The Hut"
                onShowInfoPressed={() => setShowRoomInfoModal(true)}
                onSharePressed={() => setShowShareModal(true)}
            />
            <RoomBackgroundImage src="https://cdn.radiant.dj/rcs/bg/16.png" />
            <PlayerOffset />
            <div className="relative mt-5 z-20">

                <div className="grid grid-cols-3 max-w-xl m-auto items-center">
                    <div>
                        <PrimaryButton title="Join DJ Queue" />
                    </div>
                    <User
                        username="tomo54321"
                        avatar="http://placehold.it/75x75"
                        isDj
                    />
                </div>

                <div className="px-2 py-5 md:px-5 mt-5 overflow-y-auto max-h-full flex space-x-3">
                    <User
                        username="tomo54321"
                        avatar="http://placehold.it/75x75"
                    />
                    <User
                        username="sdfjiosgdfjiogdfiogd"
                        avatar="http://placehold.it/75x75"
                    />
                    <User
                        username="tomo54321"
                        avatar="http://placehold.it/75x75"
                    />
                    <User
                        username="tomo54321"
                        avatar="http://placehold.it/75x75"
                    />
                </div>
            </div>

            {showRoomInfoModal ?
                <RoomInfoModal
                    isOwner
                    onDelete={() => {
                        setShowRoomDeleteModal(true);
                        setShowRoomInfoModal(false);
                    }}
                    onClose={() => setShowRoomInfoModal(open => !open)}
                />
                : null}
            { showRoomDeleteModal ? <RoomDeleteModal onDelete={() => {}} onClose={() => setShowRoomDeleteModal(false)}/> : null}
            {showShareModal ? <RoomShareModal onClose={() => setShowShareModal(open => !open)} /> : null}
        </div>
    );

};