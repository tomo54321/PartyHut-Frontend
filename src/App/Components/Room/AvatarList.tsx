import React from 'react';
import { RoomUser } from "../../@types/Room";
import { Avatar } from './Avatar';

export const AvatarList: React.FC<{ users: RoomUser[], currentDj?: string }> = ({
    users,
    currentDj
}) => {

    const avatars = users.map(usr => {
        if (usr.id === currentDj) { return null }
        return (
            <Avatar key={"avatar-user-" + usr.id} user={usr} />
        )
    });

    return (
        <div className="flex flex-wrap flex-grow space-x-2">
            {avatars}
        </div>
    );

};