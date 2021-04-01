import { Link } from "react-router-dom";
import { Hut } from "../types/Hut";

interface HutCardProps {
    hut: Hut
}
export const HutCard: React.FC<HutCardProps> = ({
    hut
}) => (
    <Link 
    className="block relative"
    to={`/room/${hut.id}`}>
        <img 
            src={hut.thumbnail} 
            alt={hut.name} 
            className="rounded-t-md"
        />
        <div className="bg-gray-800 p-3 rounded-b-md">
            <span className="block font-medium text-lg truncate">{hut.name}</span>
            <span className="block font-medium text-xs truncate opacity-50">Listening to {hut.song.name}</span>
        </div>
    </Link>
);