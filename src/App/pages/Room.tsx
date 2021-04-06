import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { socketAPI } from "../api/socketapi";
import { PrimaryButton } from "../components/Button";
import { JoinDjQueuePlaylist } from "../components/Modals/JoinDjQueuePlaylist";
import { RoomDeleteModal } from "../components/Modals/RoomDelete";
import { RoomInfoModal } from "../components/Modals/RoomInfo";
import { RoomShareModal } from "../components/Modals/RoomShare";
import { PlayerOffset } from "../components/PlayerOffset";
import { RoomBackgroundImage } from "../components/Room/BackgroundImage"
import { RoomHeader } from "../components/Room/Header";
import { User } from "../components/Room/User";
import { ApplicationState } from "../redux/Store";

interface RoomProps { }

export const Room: React.FC<RoomProps> = () => {

    const [showRoomInfoModal, setShowRoomInfoModal] = useState(false);
    const [showRoomDeleteModal, setShowRoomDeleteModal] = useState(false);
    const [showJoinDJQueueModal, setShowJoinDJQueueModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    const currentRoom = useSelector((state: ApplicationState) => state.room);
    const currentUser = useSelector((state: ApplicationState) => state.user.user!);
    const match = useRouteMatch();

    useEffect(() => {
        if (
            (currentRoom.connected && currentRoom.room!.id !== (match.params as any).roomId) // In a room but joined a different one?
            ||  // Or.....
            (currentRoom.connected === false && currentRoom.connecting === false) // Not joined any room.
        ) {
            socketAPI.disconnect();
            socketAPI.connect();
            socketAPI.emit("join room", { id: (match.params as any).roomId });
        }
    }, [currentRoom, match.params]);

    // Todo add room connecting
    if(!currentRoom.connected){ return null; }

    const currentDj = currentRoom.room!.users.find(usr => usr.id === currentRoom.room!.on_deck.current_dj)

    return (
        <div className="relative h-full w-full">
            <RoomHeader
                name={currentRoom.room!.name}
                onShowInfoPressed={() => setShowRoomInfoModal(true)}
                onSharePressed={() => setShowShareModal(true)}
            />
            <RoomBackgroundImage src="https://cdn.radiant.dj/rcs/bg/16.png" />
            <PlayerOffset />
            <div className="relative mt-5 z-20">
                
                {/* Current DJ */}
                <div className="grid grid-cols-3 max-w-xl m-auto items-center">
                    <div>
                        <PrimaryButton 
                            onClick={() => setShowJoinDJQueueModal(true)} 
                            disabled={currentRoom.room!.in_queue || currentRoom.room!.is_dj} 
                            title={currentRoom.room!.in_queue ? "You're in the Queue" : currentRoom.room!.is_dj ? "You're the DJ" :"Join DJ Queue" }
                        />
                    </div>

                    {
                        currentRoom.room!.on_deck.playing ?
                            <User
                                username={currentDj?.username || "User"}
                                avatar="http://placehold.it/75x75"
                                isDj
                            />
                            : null
                    }

                </div>

                {/* All Users */}
                <div className="px-2 py-5 md:px-5 mt-5 overflow-y-auto max-h-full flex space-x-3">
                    {
                        currentRoom.room!.users.map(user => (
                            <User
                                key={user.id}
                                username={user.username}
                                avatar="http://placehold.it/75x75"
                            />
                        ))
                    }
                </div>
            </div>

            {showRoomInfoModal ?
                <RoomInfoModal
                    isOwner={currentRoom.room!.owner.id === currentUser.id}
                    room={currentRoom}
                    onDelete={() => {
                        setShowRoomDeleteModal(true);
                        setShowRoomInfoModal(false);
                    }}
                    onClose={() => setShowRoomInfoModal(open => !open)}
                />
                : null}
            { showRoomDeleteModal ? <RoomDeleteModal onDelete={() => { }} onClose={() => setShowRoomDeleteModal(false)} /> : null}
            {showShareModal ? <RoomShareModal onClose={() => setShowShareModal(open => !open)} /> : null}
            {showJoinDJQueueModal && !currentRoom.room!.is_dj && !currentRoom.room!.in_queue ? <JoinDjQueuePlaylist onClose={() => setShowJoinDJQueueModal(open => !open)} /> : null}
        </div>
    );

};