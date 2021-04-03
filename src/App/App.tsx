import { Route } from "react-router"
import { PageWrapper } from "./components/PageWrapper"
import { AllPlaylistsPage } from "./pages/AllPlaylists";
import { HutsPage } from "./pages/Huts"
import { MusicPage } from "./pages/Music";
import { Room } from "./pages/Room";
import { SettingsPage } from "./pages/Settings";
import { SinglePlaylistPage } from "./pages/SinglePlaylist";

interface AppProps {};
export const App: React.FC<AppProps> = () => {

    return (
        <PageWrapper>
            <Route path="/" exact component={HutsPage} />
            <Route path="/settings" exact component={SettingsPage} />
            <Route path="/music" exact component={MusicPage} />
            <Route path="/playlists" exact component={AllPlaylistsPage} />
            <Route path="/playlist/:playlistId" exact component={SinglePlaylistPage} />
            <Route path="/room/:roomId" exact component={Room} />
        </PageWrapper>
    );

};