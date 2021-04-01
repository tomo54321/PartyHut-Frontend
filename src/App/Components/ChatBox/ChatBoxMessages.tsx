import { ChatMessage } from "../../types/ChatMessage";

interface ChatBoxMessagesProps {
    messages: ChatMessage[]
}
export const ChatBoxMessages: React.FC<ChatBoxMessagesProps> = ({
    messages
}) => (
    <div className="p-3 text-sm flex-grow bg-gray-900 border-l border-gray-800 overflow-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-700">
        {
            messages.map(msg => (
                <div key={`msg-${msg.createdAt.getTime()}-${Date.now()}`} className="flex items-start space-x-2">
                    <img src={msg.avatar} alt={msg.username} className="h-4 w-4 rounded-full"/>
                    <div>
                        <span className="text-indigo-500">{msg.username}</span>
                        {' '}
                        <span className="opacity-50">&bull; {`${msg.createdAt.getHours()}:${msg.createdAt.getMinutes()}`}</span>
                        <span className="block">{msg.message}</span>
                    </div>
                </div>
            ))
        }
    </div>
);