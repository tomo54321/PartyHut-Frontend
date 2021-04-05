import { useEffect, useRef } from "react";
import { ChatMessage } from "../../types/ChatMessage";

interface ChatBoxMessagesProps {
    messages: ChatMessage[]
}
export const ChatBoxMessages: React.FC<ChatBoxMessagesProps> = ({
    messages
}) => {

    const bottomMessagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(bottomMessagesRef.current === null){ return; }

        if(bottomMessagesRef.current.scrollTop === (bottomMessagesRef.current.scrollHeight - bottomMessagesRef.current.offsetHeight)){
            bottomMessagesRef.current.scrollIntoView({ behavior: "smooth" });
        }
    });

    return (
        <div className="p-3 text-sm space-y-5 flex-grow bg-gray-900 border-l border-gray-800 overflow-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-700">
            {
                messages.map(msg => {
                    const msg_date = new Date(Date.parse(msg.created_at));
                    return (
                        <div key={`msg-${msg_date.getTime()}-${Date.now()}`} className="flex items-start space-x-2">
                            <img src={msg.avatar || "http://placehold.it/75x75"} alt={msg.username} className="h-4 w-4 rounded-full" />
                            <div>
                                <span className="text-indigo-500">{msg.username}</span>
                                {' '}
                                <span className="opacity-50">&bull; {`${msg_date.getHours()}:${msg_date.getMinutes()}`}</span>
                                <span className="block">{msg.message}</span>
                            </div>
                        </div>
                    )
                })
            }
            <div ref={bottomMessagesRef} />
        </div>
    )
};