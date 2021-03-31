import { useState } from "react";
import { Link } from "react-router-dom";
import { RoomUser } from "../../@types/Room";

import DefaultBoy from '../../Assets/Avatars/boy.svg';

export const Avatar: React.FC<{ user: RoomUser, isDj?: boolean }> = ({
    user,
    isDj
}) => {
    const [mouseOver, setMouseOver] = useState(false);

    return (
        <Link
            to={`/u/${user.username.toLocaleLowerCase()}`}
            className={"block relative" + (isDj ? " mx-auto w-14 h-20" : " w-9 h-14")}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
        >
            {
                mouseOver ? <div className="absolute -top-5 z-10 p-1 bg-gray-900 rounded-md text-white">{user.username}</div> : null
            }
            <img
                key={`user-avatar-${user.id}`}
                src={DefaultBoy}
                alt={user.username}
                className="block w-full h-full"
            />
        </Link>
    );
};

Avatar.defaultProps = {
    isDj: false
}