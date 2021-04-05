import { ChevronDown, ChevronUp } from "react-feather";

interface ChatBoxHeaderProps {
    isOpen: boolean;
    onOpenToggle: Function;
}
export const ChatBoxHeader: React.FC<ChatBoxHeaderProps> = ({
    isOpen,
    onOpenToggle
}) => (
    <div className="flex justify-between h-12 p-3">
        <span className="block font-medium">Chat</span>
        <button className="focus:outline-none md:hidden" onClick={() => onOpenToggle()}>
            {isOpen ? <ChevronDown /> : <ChevronUp />}
        </button>
    </div>
);