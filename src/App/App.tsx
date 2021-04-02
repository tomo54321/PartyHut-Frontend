import { Route } from "react-router"
import { PageWrapper } from "./components/PageWrapper"
import { HutsPage } from "./pages/Huts"
import { MusicPage } from "./pages/Music";

interface AppProps {};
export const App: React.FC<AppProps> = () => {

    return (
        <PageWrapper>
            <Route path="/" exact component={HutsPage} />
            <Route path="/music" exact component={MusicPage} />
        </PageWrapper>
    );

};