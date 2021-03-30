import { NavLink, NavLinkProps } from "react-router-dom";
import { Home, Icon, Music, User, Menu, X, List } from 'react-feather';
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAuthForm } from "../Redux/Actions/AuthFormActions";

export const NavBar = () => {
    const [navbarOpen, setNavOpen] = useState(false);

    return (
        <aside className="flex justify-between flex-wrap sm:block sm:w-40 md:w-60 bg-gray-900 p-5">
            <h1 className="sm:text-lg md:text-2xl sm:mb-5 md:mb-10 font-semibold text-indigo-200">PartyHut</h1>

            <button
                onClick={e => {
                    setNavOpen(open => !open)
                }}
                className="block sm:hidden focus:outline-none"
            >
                {
                    navbarOpen ?
                        <X /> :
                        <Menu />
                }
            </button>

            <ul className={(navbarOpen ? "block" : "hidden") + " w-full mt-5 sm:mt-0 sm:block"}>
                <NavBarLink
                    to="/"
                    title="Rooms"
                    LinkIcon={(props) => <Home {...props} />}
                />
                <NavBarLink
                    to="/music"
                    title="Music"
                    LinkIcon={(props) => <Music {...props} />}
                />
                <NavBarLink
                    to="/playlists"
                    title="Playlists"
                    LinkIcon={(props) => <List {...props} />}
                />
                <UserNavBarLink />
            </ul>
        </aside>
    )
};


const UserNavBarLink = () => {
    const userStatus = useSelector(state => (state as any).user);
    const dispatch = useDispatch();

    const onOpenSignUp = useCallback(() => {
        dispatch(showAuthForm())
    }, [dispatch]);

    if (!userStatus.logged_in) {
        return (
            <NavBarLink
                to="/login"
                title="Login / Sign Up"
                onClick={e => {
                    onOpenSignUp();
                    e.preventDefault();
                }}
                className="bg-indigo-700"
                LinkIcon={(props) => <User {...props} />}
            />
        )
    }
    return (
        <NavBarLink
            to="/profile"
            title={userStatus.username}
            LinkIcon={props => <User {...props} />}
        />
    )
};


interface NavBarLinkProps extends NavLinkProps {
    title: string;
    LinkIcon: Icon;
}
export const NavBarLink: React.FC<NavBarLinkProps> = ({
    title,
    className,
    LinkIcon,
    ...props
}) => (
    <li>
        <NavLink
            activeClassName="bg-indigo-500"
            className={["flex items-center sm:space-x-2 mb-2 text-sm md:text-md px-2 py-3 rounded-md transition duration-150 hover:bg-indigo-700", className].join(" ")}
            {...props}
        >
            <LinkIcon className="hidden sm:block" />
            <span>{title}</span>
        </NavLink>
    </li>
)

NavBarLink.defaultProps = {
    exact: true,
}