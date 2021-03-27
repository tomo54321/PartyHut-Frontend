import { Info, Share } from "react-feather";
import { PrimaryButton } from "./Buttons";

interface RoomHeadingProps {
    loggedIn: boolean;
    name: string;
    username: string;
};
export const RoomHeading: React.FC<RoomHeadingProps> = ({
    loggedIn,
    name,
    username
}) => (
    <div className="flex justify-between w-full p-4 bg-gray-900">
        <div className="flex items-center space-x-2">
            <h1 className="text-xl truncate font-medium">{name}</h1>
            <span className="md:hidden lg:block truncate text-xs opacity-50">Hosted by: {username}</span>
        </div>


        <ul className="flex space-x-2">
            <button className="focus:outline-none"><Share /></button>
            <button className="focus:outline-none"><Info /></button>
            {
                loggedIn ? null :
                <PrimaryButton type="button" sm title="Login / Sign Up" />
            }
        </ul>
    </div>
);