import { useState } from "react"
import { ChatBoxHeader } from "./ChatBox/ChatBoxHeader";
import { ChatBoxMessageInput } from "./ChatBox/ChatBoxMessageInput";
import { ChatBoxMessages } from "./ChatBox/ChatBoxMessages";

interface ChatBoxProps {}
export const ChatBox: React.FC<ChatBoxProps> = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);

    return (
        <div className={`${isOpen ? "h-48" : "h-12"} md:h-full flex flex-col md:hidden lg:flex w-full lg:w-56 xl:w-64 bg-gray-800 border-t border-gray-700`}>
            <ChatBoxHeader 
                isOpen={isOpen}
                onOpenToggle={() => setIsOpen(open => !open)}
                newMessages={0}
            />

            <ChatBoxMessages messages={messages}/>

            <ChatBoxMessageInput onSendMessage={(message: string) => { }}/>
        </div>
    );
}