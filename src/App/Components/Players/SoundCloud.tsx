import React, { useRef } from "react";
import SoundCloudPlayer from "react-player/soundcloud";
import ReactPlayer from "react-player/soundcloud";

interface SoundCloudPlayerProps {
    id: string;
    playerRef?: React.MutableRefObject<SoundCloudPlayer | null>;
    onReady: any;
    onPlay: any;
    onDuration: any;
    onEnded: any;
    volume: number;
}
export const SCPlayer: React.FC<SoundCloudPlayerProps> = ({
    id,
    onReady,
    onPlay,
    onDuration,
    onEnded,
    volume,
    playerRef
}) => {
    const player = useRef(null as SoundCloudPlayer | null);
    return (
        <div className="aspect-h-9 aspect-w-16">
            <ReactPlayer
                ref={ref => {
                    player.current = ref;
                    if(playerRef){
                        playerRef.current = ref;
                    }
                }}
                onReady={onReady}
                onPlay={onPlay}
                onProgress={onDuration}
                onEnded={onEnded}
                controls={false}
                playing={true}
                volume={volume}
                width="100%"
                height="100%"
                onPause={() => {
                    (player.current as SoundCloudPlayer).getInternalPlayer().play();
                }}
                url={`https://api.soundcloud.com/tracks/${id}`}
            />
        </div>
    )

}
