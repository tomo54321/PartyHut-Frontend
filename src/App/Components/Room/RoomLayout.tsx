import { UserState } from "../../Redux/Reducers/UserReducer";
import { ChatBox } from "../ChatBox";
import { RoomBackgroundImage } from "../RoomBackgroundImage";

interface LayoutProps {
    background: string;
    user: UserState;
    socket: SocketIOClient.Socket
}
export const RoomLayout: React.FC<LayoutProps> = ({
    children,
    user,
    socket,
    background
}) => (
    <div className="flex overflow-hidden h-screen w-full">

        <div className="relative overflow-hidden h-full w-full">
            <RoomBackgroundImage url={background} />
            {children}
        </div>

        <ChatBox
            loggedIn={user.logged_in}
            username={user.username || "User"}
            socket={socket}
        />
    </div>
)