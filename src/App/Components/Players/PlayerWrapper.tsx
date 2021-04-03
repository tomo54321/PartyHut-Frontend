import { MutableRefObject, useCallback, useRef } from "react";
import ReactPlayer from "react-player";
import { NothingPlayer } from "./Nothing";
import { SCPlayer } from "./SoundCloud"
import { YTPlayer } from "./YouTube"

export interface PlayerWrapperProps {
    isPlaying: Boolean;
    platformId?: string;
    songStartedAt?: number;
    onEnded: Function;
    onDuration: Function;
    volume: number;
    platform?: "YouTube" | "SoundCloud"
}
export const PlayerWrapper: React.FC<PlayerWrapperProps> = ({
    isPlaying,
    platformId,
    songStartedAt,
    onEnded,
    onDuration,
    volume,
    platform
}) => {

    const player = useRef() as MutableRefObject<ReactPlayer | null>;

    // Catchup to where the play should be
    const playerCatchup = useCallback(() => {
        let startAtSeconds = songStartedAt;
        // Becuase the player could be undefined when this is called.
        if (!player.current) { return; }
        // The song start at is at date string not a unix timestamp..
        if (typeof startAtSeconds === "string") {
            const startAtDate = new Date(startAtSeconds);
            startAtSeconds = startAtDate.getTime();
        }

        const elapsed = Date.now() - startAtSeconds!;
        const elapsedSec = Math.round(elapsed / 1000);

        const playerTime = Math.round(player.current.getCurrentTime());

        // Within a 10 second window?
        const isOver = player.current.getCurrentTime() === player.current.getDuration();
        if ((playerTime > (elapsedSec + 5) || playerTime < (elapsedSec - 5)) && !isOver) {
            player.current.seekTo(elapsedSec, "seconds");
        }

    }, [player, songStartedAt]);

    return (
        <div className="aspect-h-9 aspect-w-16">
            {
                !isPlaying ? <NothingPlayer /> :
                    platform === "YouTube" ?
                        <YTPlayer
                            playerRef={player}
                            id={platformId!}
                            onEnded={onEnded}
                            onDuration={onDuration}
                            volume={volume}
                            onReady={playerCatchup}
                            onPlay={playerCatchup}
                        />
                        :
                        <SCPlayer
                            playerRef={player}
                            id={platformId!}
                            onEnded={onEnded}
                            volume={volume}
                            onReady={playerCatchup}
                            onPlay={playerCatchup}
                            onDuration={(data: any) => {
                                onDuration(data);
                                playerCatchup()
                            }}
                        />
            }
        </div>
    )

};