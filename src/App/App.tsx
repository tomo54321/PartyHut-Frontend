import { Route } from "react-router"
import { AuthRoute } from "./components/AuthRoute";
import { PageWrapper } from "./components/PageWrapper"
import { AllPlaylistsPage } from "./pages/AllPlaylists";
import { ForgotPasswordPage } from "./pages/ForgotPassword";
import { HutsPage } from "./pages/Huts"
import { LoginPage } from "./pages/Login";
import { MusicPage } from "./pages/Music";
import { ResetPasswordPage } from "./pages/ResetPassword";
import { Room } from "./pages/Room";
import { SettingsPage } from "./pages/Settings";
import { SignUpPage } from "./pages/SignUp";
import { SinglePlaylistPage } from "./pages/SinglePlaylist";

interface AppProps {};
export const App: React.FC<AppProps> = () => {

    return (
        <PageWrapper>
            <Route path="/" exact component={HutsPage} />
            <AuthRoute path="/settings" exact component={SettingsPage} />
            <AuthRoute path="/music" exact component={MusicPage} />
            <AuthRoute path="/playlists" exact component={AllPlaylistsPage} />
            <AuthRoute path="/playlist/:playlistId" exact component={SinglePlaylistPage} />
            <AuthRoute path="/room/:roomId" exact component={Room} />

            <Route path="/login" exact component={LoginPage} />
            <Route path="/signup" exact component={SignUpPage} />
            <Route path="/forgot-password" exact component={ForgotPasswordPage} />
            <Route path="/reset-password/:resetId" exact component={ResetPasswordPage} />
        </PageWrapper>
    );

};