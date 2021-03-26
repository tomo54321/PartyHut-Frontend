import { Info, Share } from "react-feather";

interface RoomHeadingProps {
    name: string;
    username: string;
};
export const RoomHeading: React.FC<RoomHeadingProps> = ({
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
            <button className="bg-indigo-900 p-2 rounded-md transition duration-150 hover:bg-indigo-500 text-sm focus:outline-none">Login / Sign Up</button>
        </ul>
    </div>
);