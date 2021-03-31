import React from 'react';
import io from 'socket.io-client';

import bgImage from '../Assets/Backgrounds/default.jpg';

import { ApplicationState } from '../Redux/Store';
import { connect } from 'react-redux';
import { UserState } from '../Redux/Reducers/UserReducer';
import { RoomLayout } from '../Components/Room/RoomLayout';
import { Player } from '../Components/Players/Player';
import { PickAndQueue } from '../Components/Room/PickAndQueue';
import { Room as RoomInterface, RoomOnDeck, RoomUser } from '../@types/Room';
import { APIErrorResponse } from '../Modules/API/d.types';
import { ConnectingToRoom } from '../Components/Room/Connecting';
import { CriticalRoomError } from '../Components/Room/CriticalError';
import { RouteComponentProps } from 'react-router';
import { AvatarList } from '../Components/Room/AvatarList';
import { Avatar } from '../Components/Room/Avatar';
import { PrimaryButton } from '../Components/Buttons';
import { Heart, Meh, PlusCircle } from 'react-feather';

const socket = io("192.168.68.134:4001", {
    autoConnect: false,
    reconnectionAttempts: 3,
    path: "/",
    transports: ["websocket"]
});

interface RoomPageProps extends RouteComponentProps {
    user: UserState;
};
interface RoomPageState {
    conn: boolean;
    room: RoomInterface | null;
    critical: APIErrorResponse | null;
    playerVolume: number;
}
class RoomPage extends React.Component<RoomPageProps> {

    // Component is created
    constructor(props: RoomPageProps) {
        super(props);
        this.state = {
            conn: true,
            room: null,
            critical: null,
            playerVolume: 0
        } as RoomPageState;

        this.socketOnConnected = this.socketOnConnected.bind(this);
        this.socketOnJoinRoom = this.socketOnJoinRoom.bind(this);
        this.socketOnCriticalError = this.socketOnCriticalError.bind(this);
        this.socketOnBasicError = this.socketOnBasicError.bind(this);
        this.socketOnUserLeave = this.socketOnUserLeave.bind(this);
        this.socketOnUserJoin = this.socketOnUserJoin.bind(this);
        this.socketOnJoinedDJQueue = this.socketOnJoinedDJQueue.bind(this);
        this.socketOnBecomeDJ = this.socketOnBecomeDJ.bind(this);
        this.socketOnRoomDeckChange = this.socketOnRoomDeckChange.bind(this);
        this.socketOnConnectionError = this.socketOnConnectionError.bind(this);

        this.onSongHasFinished = this.onSongHasFinished.bind(this);

    }

    // Component Mounts
    componentDidMount() {

        socket.on("joined room", this.socketOnJoinRoom);
        socket.on("joined queue", this.socketOnJoinedDJQueue);
        socket.on("became dj", this.socketOnBecomeDJ);
        socket.on("deck change", this.socketOnRoomDeckChange);

        socket.on("user leave", this.socketOnUserLeave);
        socket.on("user join", this.socketOnUserJoin);

        socket.on("critical error", this.socketOnCriticalError);
        socket.on("basic error", this.socketOnBasicError);

        socket.on("connect", this.socketOnConnected);
        socket.on("disconnect", this.socketOnConnectionError);

        socket.connect();
    }

    // Component Unmounts
    componentWillUnmount() {

        socket.off("joined room", this.socketOnJoinRoom);
        socket.off("joined queue", this.socketOnJoinedDJQueue);
        socket.off("became dj", this.socketOnBecomeDJ);
        socket.off("deck change", this.socketOnRoomDeckChange);

        socket.off("user leave", this.socketOnUserLeave);
        socket.off("user join", this.socketOnUserJoin);

        socket.off("critical error", this.socketOnCriticalError);
        socket.off("basic error", this.socketOnBasicError);

        socket.off("connect", this.socketOnConnected);
        socket.off("disconnect", this.socketOnConnectionError);

        socket.disconnect();
    }

    // When the user is successfully connected to the socket server.
    socketOnConnected() {
        socket.emit("join room", { id: (this.props.match.params as any).roomId });
    }
    // When the server has let us in the room
    socketOnJoinRoom(room: RoomInterface) {
        document.title = room.name + " - PartyHut";
        this.setState({
            conn: false,
            critical: null,
            room
        })
    }
    // The server has a said there was a major error!
    socketOnCriticalError(err: APIErrorResponse) {
        if((this.state as RoomPageState).critical !== null){
            this.setState({ conn: false });
        } else {
            this.setState({
                critical: err,
                conn: false
            })
        }
    }
    // The server has said there was an error
    socketOnBasicError(err: APIErrorResponse) {
        alert(err.errors[0].msg);
    }
    // User has joined the queue to be a DJ
    socketOnJoinedDJQueue() {
        this.setState((previousState: RoomPageState) => {
            const oldRoom = { ...previousState.room };
            oldRoom.in_queue = true;
            oldRoom.is_dj = false;
            return { room: oldRoom }
        })
    }
    // An error happend with the server connection
    socketOnConnectionError(reason: string) {
        switch (reason) {
            case "io server disconnect":
                this.socketOnCriticalError({
                    errors: [
                        {
                            param: "connection",
                            msg: "You were disconnected from the PartyHut servers."
                        }
                    ]
                });
                break;
            case "io client disconnect":
                // GO HOME AS WE DISCONNECTED
                break;
            default:
                this.socketOnCriticalError({
                    errors: [
                        {
                            param: "connection",
                            msg: "You lost connection to the server, please try again.."
                        }
                    ]
                });
                break;

        }
    }
    // I am now the DJ
    socketOnBecomeDJ() {
        this.setState((previousState: RoomPageState) => {
            const oldRoom = { ...previousState.room };
            oldRoom.in_queue = false;
            oldRoom.is_dj = true;
            return { room: oldRoom }
        });
    }
    // The Room Deck changed
    socketOnRoomDeckChange(roomDeck: RoomOnDeck) {
        this.setState((previousState: RoomPageState) => {
            const oldRoom = { ...previousState.room };
            oldRoom.on_deck = roomDeck;
            return { room: oldRoom }
        });
    }
    // When a user joins the room
    socketOnUserJoin(user: RoomUser) {
        const room = { ...(this.state as RoomPageState).room };
        if (room.users) {
            room.users.push(user);
        } else {
            room.users = [user];
        }
        this.setState({ room });
    }
    // When a user leaves the room
    socketOnUserLeave(userId: string) {
        const room = { ...(this.state as RoomPageState).room };
        if (room.users) {
            const userIndex = room.users.findIndex(usr => usr.id === userId);
            room.users.splice(userIndex, 1);
        } else {
            room.users = [];
        }
        this.setState({ room });
    }


    // The player has reached the end.
    onSongHasFinished() {
        if ((this.state as RoomPageState).room?.is_dj) {
            socket.emit("next song");
        }
    }

    // Component Render
    render() {
        const { user } = this.props;
        const { room, conn, critical, playerVolume } = this.state as RoomPageState;

        if (critical !== null && critical.errors.length > 0) { return <CriticalRoomError errors={critical} /> }
        if (conn || (room === null)) { return <ConnectingToRoom /> }

        return (
            <RoomLayout
                roomName={room.name}
                roomHostUsername={room.host.username}
                background={bgImage}
                socket={socket}
                user={user}
                volume={playerVolume}
                setVolume={(vol: number) => {
                    this.setState({ playerVolume: vol })
                }}
            >

                {/* The Player */}
                <div className="mx-auto mt-5 w-4/5 md:w-1/2 lg:w-full lg:max-w-xl">
                    <Player
                        isPlaying={room!.on_deck.playing}
                        platform={room!.on_deck.platform}
                        platformId={room!.on_deck.platformId}
                        itemStartedAt={room!.on_deck.songStartedAt}
                        onEnded={this.onSongHasFinished}
                        volume={playerVolume / 100}
                    />
                </div>

                <div className="flex flex-col flex-grow p-3 pb-5">
                    {/* All the users in the room */}
                    <AvatarList currentDj={room.on_deck.current_dj} users={room.users} />

                    {/* DJ & Woot Controls */}
                    <div className="flex flex-shrink-0 justify-between">

                        {/* DJ Queue and Playlist Select */}
                        <div className="w-1/3">
                            <PickAndQueue
                                isDJ={room!.is_dj}
                                isInQueue={room!.in_queue}
                                onJoinQueue={(playlistId: string) => {
                                    socket.emit("join queue", { playlistId });
                                }}
                            />
                        </div>

                        {/* Current DJ */}
                        <div className="w-1/3">
                            {
                                room.on_deck.current_dj ? <Avatar isDj user={room!.users.find(usr => usr.id === room.on_deck.current_dj)!}/> : null
                            }
                        </div>

                        {/* Woot etc. */}
                        <div className="w-1/3">
                            {
                                room.is_dj ? 
                                    <PrimaryButton type="button" onClick={() => { socket.emit("next song") }} title="Skip Song"/>
                                : 
                                <div className="flex space-x-2">
                                    <button className="w-full text-center" type="button" onClick={() => {}}><Heart className="mx-auto"/><br />Love</button>
                                    <button className="w-full text-center" type="button" onClick={() => {}}><PlusCircle className="mx-auto"/><br />Grab</button>
                                    <button className="w-full text-center" type="button" onClick={() => {}}><Meh className="mx-auto"/><br />Boo</button>
                                </div>
                            }
                        </div>
                    </div>

                </div>

            </RoomLayout>
        )
    }


}

const mapStateToProps = (state: ApplicationState) => ({
    user: state.user
})
export const Room = connect(mapStateToProps)(RoomPage);