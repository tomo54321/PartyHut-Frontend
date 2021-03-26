import { useCallback, useState } from "react";
import { Send } from "react-feather";

interface Message {
    id: any;
    username: string;
    message: string;
}

export const ChatBox = () => {

    const [chats, setChats] = useState([] as Message[]);
    const [message, setMessage] = useState("");

    const onSendChatMessage = useCallback(() => {
        const messages = [...chats];
        messages.push({
            id: Date.now(),
            username: "tomo54321",
            message: message
        } as Message);
        setChats(messages);
        setMessage("");
    }, [message, chats, setMessage, setChats]);

    const allMessages = chats.map(msg => (
        <div key={msg.id} className="p-3">
            <span className="text-blue-500 pr-1">{msg.username}:</span>
            <span>{msg.message}</span>
        </div>
    ))

    return (
        <div className="hidden md:flex flex-col md:w-44 lg:w-72 bg-gray-900 flex-shrink-0">
            <div className="p-4 border-b border-gray-800 flex-shrink-0">
                <span className="block text-lg font-medium">Chat</span>
            </div>
            <div className="h-full overflow-hidden overflow-y-auto bg-gray-800 text-sm">
                {allMessages}
            </div>

            <form
                action=""
                method="POST"
                onSubmit={e => {
                    onSendChatMessage();
                    e.preventDefault();
                }}
                className="flex flex-shrink-0">
                <input
                    placeholder="Type your message here"
                    className="bg-gray-900 p-3 text-sm flex-grow focus:outline-none"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className="px-2"
                >
                    <Send size={18} className="opacity-75" />
                </button>

            </form>
        </div>
    )

};