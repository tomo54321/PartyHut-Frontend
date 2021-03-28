import { RoomBackgroundImage } from "../Components/RoomBackgroundImage"
import bgImage from '../Assets/Backgrounds/default.jpg';
import { RoomHeading } from "../Components/RoomHeading";
import { ChatBox } from "../Components/ChatBox";
import { useSelector } from "react-redux";
import { ApplicationState } from "../Redux/Store";
import { useCallback, useEffect, useState } from "react";
import io from 'socket.io-client';
import { LoadingIcon } from "../Components/LoadingIcon";
import { useHistory, useRouteMatch } from "react-router";
import { APIErrorResponse } from "../Modules/API/d.types";
import { AlertTriangle } from "react-feather";
import { PrimaryButton } from "../Components/Buttons";
import { Player } from "../Components/Players/Player";
import { PickAndQueue } from "../Components/Room/PickAndQueue";

const socket = io("192.168.68.134:4001", {
    autoConnect: false,
    reconnectionAttempts: 3,
    path: "/",
    transports: ["websocket"]
});
const defaultRoomState = { 
    id: "", 
    name: "", 
    host: { username: "" },
    on_deck: {
        playing: false,
        platform: "" as "YouTube" | "SoundCloud",
        platformId: "",
        songStartedAt: Date.now()
    }
};

export const Room = () => {

    const [isConnecting, setIsConnecting] = useState(true);
    const [socketError, setSocketError] = useState({ errors: [] } as APIErrorResponse);
    const [room, setRoom] = useState(defaultRoomState);

    const currentAuth = useSelector((state: ApplicationState) => state.user);
    const match = useRouteMatch();
    const history = useHistory();

    const onJoinedRoom = useCallback((roomData) => {
        setRoom(roomData);
        setIsConnecting(false);
    }, [setRoom, setIsConnecting]);

    const onSocketError = useCallback((error: APIErrorResponse) => {
        setSocketError(error);
        setIsConnecting(false);
    }, [setIsConnecting, setSocketError]);

    const onSocketConnectionError = useCallback((reason: string) => {
        if (reason === "io server disconnect") { // We were kicked by the server.
            setSocketError({
                errors: [{
                    param: "connection",
                    msg: "You were kicked from the PartyBus servers, please try again."
                }]
            });
            setIsConnecting(false);
        } else if (reason === "io client disconnect") { // We disconnected
            history.push("/");
        } else { // We lost connection
            console.log(reason);
            setSocketError({
                errors: [{
                    param: "connection",
                    msg: "Failed to connect to the server, please try again later."
                }]
            });
            setIsConnecting(false);
        }
    }, [history, setIsConnecting, setSocketError]);

    useEffect(() => {
        socket.on("joined room", onJoinedRoom);
        socket.on("critical error", onSocketError);
        socket.on("disconnect", onSocketConnectionError);

        socket.io.opts.query = {username: currentAuth.username};
        
        socket.emit("join room", { id: (match.params as any).roomId });
        return () => {
            socket.off("critical error", onSocketError);
            socket.off("disconnect", onSocketConnectionError);
            socket.off("joined room", onJoinedRoom);
        };
    }, [match.params, currentAuth, onJoinedRoom, onSocketError, onSocketConnectionError]);

    useEffect(() => {
        socket.connect();

        return () => {
            socket.disconnect();
        }
    }, []);

    if (isConnecting) {
        return (
            <div className="relative h-full w-full">
                <div className="text-center mx-auto absolute h-5 w-full top-52 left-0 right-0">
                    <LoadingIcon />
                    <span className="block mt-4 opacity-50">Getting ready to dance</span>
                </div>
            </div>
        )
    }

    if (socketError.errors.length > 0) {
        return (
            <div className="relative h-full w-full">
                <div className="text-center mx-auto absolute h-5 w-full max-w-sm top-52 left-0 right-0">
                    <AlertTriangle className="block mx-auto text-red-500" size={46} />
                    <span className="block my-3 text-red-500">{socketError.errors[0].msg}</span>
                    <PrimaryButton type="link" href="/" title="Go Home" />
                </div>
            </div>
        )
    }

    return (
        <div className="flex overflow-hidden h-screen w-full">
            <div className="relative overflow-hidden h-full w-full">
                <RoomBackgroundImage url={bgImage} />

                <div className="absolute h-full w-full">
                    <RoomHeading
                        loggedIn={currentAuth.logged_in}
                        name={room.name}
                        username={room.host.username}
                    />

                    <div className="mx-auto mt-5 w-4/5 lg:w-full lg:max-w-xl">
                        <Player 
                            isPlaying={room.on_deck.playing}
                            platform={room.on_deck.platform}
                            platformId={room.on_deck.platformId}
                        />
                    </div>

                    <div className="flex justify-between">
                        <div className="w-1/4">
                            <PickAndQueue 
                                isDJ={false}
                                isInQueue={false}
                            />
                        </div>
                        <div className="w-1/4">
                            <span>Woot!</span>
                        </div>

                    </div>

                </div>

            </div>

            <ChatBox
                loggedIn={currentAuth.logged_in}
                username={currentAuth.username || "User"}
                socket={socket}
            />
        </div>
    )

};