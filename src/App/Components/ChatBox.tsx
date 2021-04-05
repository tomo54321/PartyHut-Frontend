import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { socketAPI } from "../api/socketapi";
import { onChatRecieved } from "../redux/actions/RoomActions";
import { ApplicationState } from "../redux/Store";
import { ChatBoxHeader } from "./ChatBox/ChatBoxHeader";
import { ChatBoxMessageInput } from "./ChatBox/ChatBoxMessageInput";
import { ChatBoxMessages } from "./ChatBox/ChatBoxMessages";

interface ChatBoxProps {}
export const ChatBox: React.FC<ChatBoxProps> = () => {

    const [isOpen, setIsOpen] = useState(false);

    const inRoom = useSelector((state: ApplicationState) => state.room.connected);
    const messages = useSelector((state: ApplicationState) => state.room.chats);
    const user = useSelector((state: ApplicationState) => state.user);
    const [newMessages, setNewMessages] = useState(0);
    const dispatch = useDispatch();

    const onSendMessage = useCallback((msg: string) => {
        if(!inRoom && user.logged_in){ return; }
        dispatch(onChatRecieved({
            id: "me-" + Date.now(),
            username: user.user!.username,
            message: msg,
            avatar: user.user!.avatar,
            created_at: (new Date()).toString()
        }));
        socketAPI.emit("send chat message", { message: msg });
    }, [dispatch, user, inRoom]);

    useEffect(() => {
        if(!isOpen){
            setNewMessages(msg => msg + 1);
        } else {
            setNewMessages(0);
        }
    }, [messages, isOpen]);

    if(!inRoom){ return null; }

    return (
        <div className={`${isOpen ? "h-48" : "h-12"} md:h-full flex flex-col md:flex-shrink-0 md:hidden lg:flex w-full lg:w-56 xl:w-64 bg-gray-800 border-t border-gray-700`}>
            <ChatBoxHeader 
                isOpen={isOpen}
                onOpenToggle={() => setIsOpen(open => !open)}
                newMessages={newMessages}
            />

            <ChatBoxMessages messages={messages!}/>

            <ChatBoxMessageInput onSendMessage={onSendMessage}/>
        </div>
    );
}