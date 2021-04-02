import { Info, Share } from "react-feather";

interface RoomHeaderProps {
    name: string;
    onShowInfoPressed: Function;
    onSharePressed: Function;
}
export const RoomHeader: React.FC<RoomHeaderProps> = ({
    name,
    onShowInfoPressed,
    onSharePressed
}) => (
    <div className="h-16 flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
        <span className="block text-lg font-medium">{name}</span>
        <div className="flex space-x-4">
            <button type="button" className="focus:outline-none" onClick={() => onShowInfoPressed()}>
                <Info />
            </button>
            <button type="button" className="focus:outline-none" onClick={() => onSharePressed()}>
                <Share />
            </button>
        </div>
    </div>
);