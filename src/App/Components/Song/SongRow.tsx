import { Trash } from "react-feather";

interface SongRowProps {
    title: string;
    postedBy: string;
    platform: string;
    thumbnailUrl: string;
    onDeleteClicked?: Function;
}
export const SongRow: React.FC<SongRowProps> = ({
    title,
    postedBy,
    platform,
    thumbnailUrl,
    onDeleteClicked
}) => (
    <div 
        className="grid grid-cols-4 items-center p-3 hover:bg-gray-700 border-b border-gray-700 transition duration-150"
    >   
        <img
            src={thumbnailUrl} 
            alt={title} 
            className="w-20 h-20 object-contain object-center"
        />
        <div>
            <span className="block truncate">{title}</span>
            <span className="block text-sm opacity-50">{postedBy}</span>
        </div>
        <span>{platform}</span>
        <div className="text-right space-x-5 md:space-x-2">
            <button title="Remove song from playlist" onClick={e => { if(onDeleteClicked) onDeleteClicked() }}>
                <Trash />
            </button>
        </div>
    </div>
);
SongRow.defaultProps = {
    onDeleteClicked(){}
}