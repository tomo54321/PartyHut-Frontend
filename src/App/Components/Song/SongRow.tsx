import { ContextMenu } from "../ContextMenu";

interface SongRowProps {
    platformId: string;
    title: string;
    postedBy: string;
    platform: "YouTube" | "SoundCloud";
    thumbnailUrl: string;
    onDeleteClicked?: Function;
}
export const SongRow: React.FC<SongRowProps> = ({
    platformId,
    title,
    postedBy,
    platform,
    thumbnailUrl,
    onDeleteClicked
}) => {

    const contextItems = [
        {
            title: "Remove Song",
            onClick() { if (onDeleteClicked) onDeleteClicked() }
        }
    ];

    if(platform  === "YouTube"){
        contextItems.push({
            title: "View on YouTube",
            onClick() {
                window.open("https://youtube.com/watch?v=" + platformId, "_blank");
            }
        })
    }

    return (
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
                <ContextMenu
                    items={contextItems}
                />
            </div>
        </div>
    )
};
SongRow.defaultProps = {
    onDeleteClicked() { }
}