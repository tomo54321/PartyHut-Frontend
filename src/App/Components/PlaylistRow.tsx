import { Link } from "react-router-dom";
interface PlaylistRowProps{
    id: string;
    title: string;
    thumbnailUrl: string;
    totalSongs: number;
}
export const PlaylistRow: React.FC<PlaylistRowProps> = ({
    id,
    title,
    thumbnailUrl,
    totalSongs
}) => (
    <Link to={`/playlist/${id}`} className="flex flex-wrap sm:flex-nowrap md:space-x-3 pb-3 sm:pb-0 border-b border-gray-700 sm:border-b-0 items-center">
        <img src={thumbnailUrl} alt={title} className="hidden md:block flex-shrink-0 w-24 h-24" />
        <div className="space-y-1 w-full">
            <span className="block truncate md:max-w-xs lg:max-w-md xl:max-w-lg 2xl:max-w-none font-medium text-lg">{title}</span>
            <div className="block text-sm opacity-60">
                <span>{totalSongs} songs</span>
            </div>
        </div>
    </Link>
);