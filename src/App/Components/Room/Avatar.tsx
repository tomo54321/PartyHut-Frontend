import { useState } from "react";
import { Link } from "react-router-dom";
import { RoomUser } from "../../@types/Room";

import Boy from '../../Assets/Avatars/boy/boy-front.svg';
import BoyBack from '../../Assets/Avatars/boy/boy-back.svg';

export const Avatar: React.FC<{ user: RoomUser, isDj?: boolean }> = ({
    user,
    isDj
}) => {
    const [mouseOver, setMouseOver] = useState(false);

    return (
        <Link
            to={`/u/${user.username.toLocaleLowerCase()}`}
            className={"block relative" + (isDj ? " mx-auto -top-10 w-24 h-28" : " w-9 h-14")}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
        >
            {
                mouseOver ? <div className="absolute -top-5 z-10 py-1 px-2 text-sm bg-gray-900 rounded-md text-white">{user.username}</div> : null
            }
            
            <img
                src={isDj ? BoyBack : Boy}
                alt={user.username}
                className="block w-full h-full"
            />
        </Link>
    );
};

Avatar.defaultProps = {
    isDj: false
}