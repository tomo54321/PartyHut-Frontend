import { secondsToReadableTime } from "../../utils/duration";
import { RangeSlider } from "../RangeSlider";

interface BottomPlayerDurationProps {
    currentTime: number;
    totalTime: number;
}
export const BottomPlayerDuration: React.FC<BottomPlayerDurationProps> = ({
    currentTime,
    totalTime
}) => (
    <div className="hidden sm:block flex-grow">
        <RangeSlider 
            value={(currentTime / totalTime)}
        />
        <div className="flex justify-between text-white text-sm mt-2">
            <span className="opacity-50 hover:opacity-100 transition duration-75">{secondsToReadableTime(currentTime)}</span>
            <span className="opacity-50 hover:opacity-100 transition duration-75">{secondsToReadableTime(totalTime)}</span>
        </div>
    </div>
)