import { Info, Share } from "react-feather";
import { VolumeSlider } from "./VolumeSlider";

interface RoomHeadingProps {
    name: string;
    volume: number;
    setVolume: Function;
    username: string;
};
export const RoomHeading: React.FC<RoomHeadingProps> = ({
    name,
    volume,
    setVolume,
    username
}) => (
    <div className="flex justify-between w-full p-4 bg-gray-900">
        <div className="flex items-center space-x-2">
            <h1 className="text-xl truncate font-medium">{name}</h1>
            <span className="md:hidden lg:block truncate text-xs opacity-50">Hosted by: {username}</span>
        </div>


        <ul className="flex items-center space-x-2">
            <VolumeSlider 
                value={volume}
                onChange={setVolume}
            />
            <button className="focus:outline-none"><Share /></button>
            <button className="focus:outline-none"><Info /></button>
        </ul>
    </div>
);