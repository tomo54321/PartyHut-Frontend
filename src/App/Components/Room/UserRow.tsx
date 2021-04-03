interface UserRowProps {
    username: string;
    avatar: string;
}
export const UserRow: React.FC<UserRowProps> = ({
    username,
    avatar,
}) => (
    <div className="w-full flex space-x-2 items-center">
        <img 
            src={avatar}
            className={`block rounded-full w-10 h-10`}
            alt={username}
        />
        <span className={"block truncate text-sm font-medium"}>{username}</span>
    </div>
);