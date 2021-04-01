import { BottomPlayer } from "./components/BottomPlayer"
import { NavBar } from "./components/NavBar"
import { PageWrapper } from "./components/PageWrapper"

interface AppProps {};
export const App: React.FC<AppProps> = () => {

    return (
        <PageWrapper>
            <NavBar />
            {/* The main content */}
            <div className="flex flex-col flex-grow">
                <div className="flex-grow">

                </div>
                <BottomPlayer />
            </div>
        </PageWrapper>
    );

};