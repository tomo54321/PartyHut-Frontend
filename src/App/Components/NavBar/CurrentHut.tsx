import { Headphones } from "react-feather";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../redux/Store";
import { NavLink } from "./NavLink";

interface CurrentHutProps {}
export const CurrentHut: React.FC<CurrentHutProps> = () => {

    const in_room = useSelector((state: ApplicationState) => state.room.connected);
    const room = useSelector((state: ApplicationState) => state.room.room);

    if(!in_room){ return null; }

    return (
        <li>
            <NavLink
                to={`/room/${room?.id || ""}`}
                title={room?.name || "Current Hut"}
                Icon={Headphones}
                className="bg-indigo-500 hover:bg-indigo-600"
            />
        </li>
    );

};