import { BottomPlayer } from "./components/BottomPlayer"
import { ChatBox } from "./components/ChatBox"
import { NavBar } from "./components/NavBar"
import { PageWrapper } from "./components/PageWrapper"
import { HutsPage } from "./pages/Huts"

interface AppProps {};
export const App: React.FC<AppProps> = () => {

    return (
        <PageWrapper>
            <NavBar />
            {/* The main content */}
            <div className="flex flex-col flex-grow">
                <div className="flex-grow h-16 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-700">
                    <HutsPage />
                </div>
                <BottomPlayer />
            </div>
            <ChatBox />
        </PageWrapper>
    );

};