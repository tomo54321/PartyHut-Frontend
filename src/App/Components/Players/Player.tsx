import { useCallback, useRef } from "react";
import { SCPlayer } from "./SoundCloud"
import { YTPlayer } from "./YouTube"

interface PlayerProps {
    isPlaying: Boolean;
    platformId?: string;
    itemStartedAt?: number;
    onEnded: Function;
    volume: number;
    platform?: "YouTube" | "SoundCloud"
}

export const Player: React.FC<PlayerProps> = ({
    isPlaying,
    platformId,
    itemStartedAt,
    onEnded,
    volume,
    platform
}) => {

    const player = useRef(null as any);

    const onPlayerCanPlay = useCallback(() => {
            const elapsed = Date.now() - itemStartedAt!;
            const elapsedSec = elapsed / 1000;
            player.current.seekTo(elapsedSec, "seconds");
        
    }, [player, itemStartedAt]);

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
                    playerRef={player}
                    id={platformId!}
                    onEnded={onEnded}
                    volume={volume}
                    onReady={onPlayerCanPlay}
                    onPlay={() => {}}
                    onBufferEnded={() => {}}
                />
            </PlayerFrame>
        )
    } else {
        return (
            <PlayerFrame>
                <SCPlayer 
                    playerRef={player}
                    id={platformId!}
                    onEnded={onEnded}
                    volume={volume}
                    onReady={onPlayerCanPlay}
                    onPlay={() => {}}
                    onBufferEnded={() => {}}
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