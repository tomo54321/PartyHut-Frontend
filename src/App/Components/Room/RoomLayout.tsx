import { UserState } from "../../Redux/Reducers/UserReducer";
import { ChatBox } from "../ChatBox";
import { RoomBackgroundImage } from "../RoomBackgroundImage";
import { RoomHeading } from "../RoomHeading";

interface LayoutProps {
    background: string;
    roomName: string;
    roomHostUsername: string;
    user: UserState;
    volume: number;
    setVolume: Function;
    socket: SocketIOClient.Socket
}
export const RoomLayout: React.FC<LayoutProps> = ({
    children,
    roomName,
    roomHostUsername,
    user,
    socket,
    background,

    volume,
    setVolume
}) => (
    <div className="flex overflow-hidden h-screen w-full">

        <div className="relative overflow-hidden h-full w-full">
            <RoomBackgroundImage url={background} />

            <div className="h-full flex flex-col">
                <RoomHeading
                    volume={volume}
                    name={roomName}
                    username={roomHostUsername}
                    setVolume={setVolume}
                />

                {children}
            </div>
        </div>

        <ChatBox
            loggedIn={user.logged_in}
            username={user.username || "User"}
            socket={socket}
        />
    </div>
)