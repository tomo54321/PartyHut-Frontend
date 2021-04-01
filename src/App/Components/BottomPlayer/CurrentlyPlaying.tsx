import { BottomPlayerArtwork } from "./Artwork";

interface CurrentlyPlayingProps {
    currentSong: string;
    djUsername: string;
    artwork: string;
}
export const BottomPlayerCurrentlyPlaying: React.FC<CurrentlyPlayingProps> = ({
    currentSong,
    djUsername,
    artwork,
}) => (
    <div className="hidden sm:flex items-center space-x-2">
        <BottomPlayerArtwork path={artwork} alt={currentSong} />
        <div>
            <span className="block font-medium truncate w-28 md:w-36 lg:w-40 xl:w-44">{currentSong}</span>
            <span className="block truncate text-sm opacity-50 hover:opacity-100 w-32 md:w-40 lg:w-44 xl:w-48">Played by {djUsername}</span>
        </div>
    </div>
);