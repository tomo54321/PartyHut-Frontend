import { useState } from "react";
import { Send } from "react-feather";
import { TextInput } from "../TextInput";

interface ChatBoxMessageInputProps {
    onSendMessage: Function;
 }
export const ChatBoxMessageInput: React.FC<ChatBoxMessageInputProps> = ({
    onSendMessage
}) => {
    const [message, setMessage] = useState("");
    return (
        <form
            className="flex-shrink-0 flex"
            onSubmit={e => {
                onSendMessage(message);
                setMessage("");
                e.preventDefault()
            }}>
            <TextInput 
                className="border-none" 
                placeholder="Send a message..."
                value={message}
                onChange={e => {
                    setMessage((e.target as HTMLInputElement).value)
                }}
            />
            <button className="focus:outline-none p-3">
                <Send size={20} className="opacity-50 hover:opacity-100 transition duration-75" />
            </button>
        </form>
    )
}