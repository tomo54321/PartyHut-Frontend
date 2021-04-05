import { Home} from "react-feather";
import { AuthLinks } from "./AuthLinks";
import { CurrentHut } from "./CurrentHut";
import { MyHuts } from "./MyHuts";
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
            <CurrentHut />
            <AuthLinks />
        </ul>

        <MyHuts />
    </div>
);