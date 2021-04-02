import { BottomPlayer } from "./BottomPlayer";
import { ChatBox } from "./ChatBox";
import { NavBar } from "./NavBar";

interface PageWrapperProps { }
export const PageWrapper: React.FC<PageWrapperProps> = ({
    children
}) => (
    <div className="w-screen h-screen flex flex-col md:flex-row overflow-hidden">
        <NavBar />
        
        {/* The main content */}
        <div className="flex flex-col flex-grow">
            <div className="flex-grow h-16 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-700">
                {children}
            </div>
            <BottomPlayer />
        </div>

        <ChatBox />
    </div>
);