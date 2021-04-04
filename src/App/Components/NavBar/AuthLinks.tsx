import { List, Lock, Music, Settings, User } from "react-feather";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../redux/Store";
import { NavLink } from "./NavLink";

interface AuthLinksProps { }
export const AuthLinks: React.FC<AuthLinksProps> = () => {

    const isLoggedIn = useSelector((state: ApplicationState) => state.user.logged_in);
    if (isLoggedIn) {
        return (
            <>
                <li>
                    <NavLink
                        to="/music"
                        title="Music"
                        Icon={Music}
                    />
                </li>
                <li>
                    <NavLink
                        to="/playlists"
                        title="Playlists"
                        Icon={List}
                    />
                </li>
                <li>
                    <NavLink
                        to="/settings"
                        title="Settings"
                        Icon={Settings}
                    />
                </li>
            </>
        )
    } else {
        return (
            <>
                <li>
                    <NavLink
                        to="/login"
                        title="Login"
                        Icon={Lock}
                    />
                </li>
                <li>
                    <NavLink
                        to="/signup"
                        title="Sign Up"
                        Icon={User}
                    />
                </li>
            </>
        )
    }

};