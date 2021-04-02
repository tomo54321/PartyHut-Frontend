interface UserProps {
    username: string;
    avatar: string;
    isDj?: boolean;
}
export const User: React.FC<UserProps> = ({
    username,
    avatar,
    isDj
}) => (
    <div className={isDj ? "" : "w-24"}>
        <img 
            src={avatar}
            className={`block mx-auto rounded-full ${isDj ? "w-16 h-16 border-4 border-indigo-500 shadow-lg" : "w-14 h-14"}`}
            alt={username}
        />
        <span className={"block mt-1 text-center font-medium" + (isDj ? "" : " truncate text-sm")}>{username}</span>
    </div>
);