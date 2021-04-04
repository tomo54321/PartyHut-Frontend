import { Song } from "../types/Song";
import { secondsToReadableTime } from "../utils/duration";
import { PrimaryButton } from "./Button";

interface SongRowProps extends Song {
    onSelect: Function;
    Button?: any;
}
export const SongRow: React.FC<SongRowProps> = ({
    title,
    artist,
    duration,
    platform,
    platform_id,
    platform_url,
    artwork,
    onSelect,
    Button
}) => (
    <div className="flex flex-wrap sm:flex-nowrap md:space-x-3 pb-3 sm:pb-0 border-b border-gray-700 sm:border-b-0 items-center">
        <img src={artwork} alt={title} className="hidden md:block flex-shrink-0 w-24 h-24 rounded-md" />
        <div className="space-y-1 w-full">
            <span className="block truncate md:max-w-xs lg:max-w-md xl:max-w-lg 2xl:max-w-none font-medium text-lg">{title}</span>
            <span className="block truncate md:max-w-xs lg:max-w-md xl:max-w-lg 2xl:max-w-none opacity-75">{artist}</span>
            
            <div className="block text-sm opacity-60">
                {
                    typeof duration === "number" ?
                    <>
                    <span>{secondsToReadableTime(duration)}</span>
                    {' '}&bull;{' '}
                    </>
                    : null
                }
                <a href={platform_url ? platform_url : `https://youtube.com/watch?v=${platform_id}`} target="_blank" rel="noreferrer" className="hover:underline">Preview on {platform}</a>
            </div>
        </div>
        {
            Button ? <Button className="w-full sm:w-32 mt-5 sm:mt-0 flex-shrink-0"/> : 
            <PrimaryButton className="w-full sm:w-32 mt-5 sm:mt-0 flex-shrink-0" title="Add To..." onClick={() => onSelect()} />
        }
    </div>
);