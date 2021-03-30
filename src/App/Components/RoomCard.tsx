import { LogIn } from "react-feather";
import { Link } from "react-router-dom";

interface RoomCardProps {
    id: string;
    title: string;
    image: string;
    username: string;
}
export const RoomCard: React.FC<RoomCardProps> = ({
    id,
    image,
    title, 
    username,
}) => (
    <Link to={`/room/${id}`} className="relative rounded-md">
        <img src={image} alt="" className="block w-full h-full object-cover object-center"/>
        <div className="flex absolute bottom-0 w-full bg-gray-800 p-3 text-sm bg-opacity-75">
            <div className="flex-grow">
                <span className="block font-semibold truncate">{title}</span>
                <span className="block truncate text-xs opacity-75">Hosted by: {username}</span>
            </div>
            <button>
                <LogIn />
            </button>
        </div>
    </Link>
);