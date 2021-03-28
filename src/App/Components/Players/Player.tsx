import { SCPlayer } from "./SoundCloud"
import { YTPlayer } from "./YouTube"

interface PlayerProps {
    isPlaying: Boolean;
    platformId?: string;
    platform?: "YouTube" | "SoundCloud"
}

export const Player: React.FC<PlayerProps> = ({
    isPlaying,
    platformId,
    platform
}) => {

    if (!isPlaying) {
        return (
            <PlayerFrame>
                <div className="bg-gray-800 text-center flex flex-col justify-center">
                    <span className="block text-center font-semibold text-3xl">Nothing is playing</span>
                    <p className="mt-3 opacity-70">Jump and and start this party!</p>
                </div>
            </PlayerFrame>
        )
    }

    if(platform === "YouTube"){
        return (
            <PlayerFrame>
                <YTPlayer 
                    id={platformId!}
                />
            </PlayerFrame>
        )
    } else {
        return (
            <PlayerFrame>
                <SCPlayer 
                    id={platformId!}
                />
            </PlayerFrame>
        )
    }

};

const PlayerFrame: React.FC<{}> = ({
    children
}) => (
    <div className="aspect-h-9 aspect-w-16">{children}</div>
)