import React, { useRef } from "react";
import YouTubePlayer from "react-player/youtube";
import ReactPlayer from "react-player/youtube";

interface YouTubePlayerProps {
    id: string;
    playerRef?: React.MutableRefObject<YouTubePlayer | null>;
    onReady: any;
    onPlay: any;
    onBufferEnded: any;
    onEnded: any;
    volume: number;
}
export const YTPlayer: React.FC<YouTubePlayerProps> = ({
    id,
    onReady,
    onPlay,
    onBufferEnded,
    onEnded,
    volume,
    playerRef
}) => {
    const player = useRef(null as YouTubePlayer | null);
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
                onEnded={onEnded}
                controls={false}
                volume={volume}
                playing={true}
                onBufferEnd={onBufferEnded}
                width="100%"
                height="100%"
                onPause={() => {
                    (player.current as YouTubePlayer).getInternalPlayer().playVideo();
                }}
                url={`https://youtube.com/watch?v=${id}`}
            />
        </div>
    )

}
