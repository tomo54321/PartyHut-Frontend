import { Disc, Home, List, Music, Settings } from "react-feather";
import { NavLink } from "./NavLink";

interface NavProps {
    isOpen: boolean;
}
export const Nav: React.FC<NavProps> = ({
    isOpen
}) => (
    <div
        className={`${isOpen ? "block" : "hidden"} space-y-3 mt-5 md:block`}
    >
        <ul className="space-y-2">
            <li>
                <NavLink
                    to="/"
                    title="Huts"
                    Icon={Home}
                />
            </li>
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
        </ul>

        <ul className="space-y-2 max-h-24 overflow-auto md:max-h-60 scrollbar scrollbar-thumb-gray-700 scrollbar-thin scrollbar-track-gray-900">
            <li className="sticky top-0 bg-gray-800 uppercase font-medium text-sm text-gray-400">My Huts</li>
            <li>
                <NavLink
                    to={"/room/abcd"}
                    title="The Hut" 
                    Icon={Disc}
                />
            </li>
        </ul>
    </div>
);