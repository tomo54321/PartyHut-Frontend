import { Trash } from "react-feather";
import { Link } from "react-router-dom";

interface PlaylistRowProps {
    id: string;
    title: string;
    songCount: Number;
    onDeleteClicked?: Function;
}
export const PlaylistRow: React.FC<PlaylistRowProps> = ({
    id,
    title,
    songCount,
    onDeleteClicked
}) => (
    <div 
        className="grid grid-cols-3 items-center p-3 hover:bg-gray-700 border-b border-gray-700 transition duration-150"
    >
        <Link to={`/playlist/${id}`} className="truncate">{title}</Link>
        <span>{songCount} Songs</span>
        <div className="text-right space-x-5 md:space-x-2">
            <button title="Delete this playlist" onClick={e => { if(onDeleteClicked) onDeleteClicked() }}>
                <Trash />
            </button>
        </div>
    </div>
);
PlaylistRow.defaultProps = {
    onDeleteClicked(){}
}