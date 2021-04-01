import { ChevronDown, ChevronUp } from "react-feather";

interface ChatBoxHeaderProps {
    isOpen: boolean;
    onOpenToggle: Function;
    newMessages: number;
}
export const ChatBoxHeader: React.FC<ChatBoxHeaderProps> = ({
    isOpen,
    newMessages,
    onOpenToggle
}) => (
    <div className="flex justify-between h-12 p-3">
        <span className="block font-medium">Chat <span className="opacity-50">({newMessages})</span></span>
        <button className="focus:outline-none md:hidden" onClick={() => onOpenToggle()}>
            {isOpen ? <ChevronDown /> : <ChevronUp />}
        </button>
    </div>
);