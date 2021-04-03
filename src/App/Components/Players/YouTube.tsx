import React, { useRef } from "react";
import YouTubePlayer from "react-player/youtube";
import ReactPlayer from "react-player";

interface YouTubePlayerProps {
    id: string;
    playerRef?: React.MutableRefObject<ReactPlayer | null>;
    onReady: any;
    onPlay: any;
    onEnded: any;
    onDuration: any;
    volume: number;
}
export const YTPlayer: React.FC<YouTubePlayerProps> = ({
    id,
    onReady,
    onPlay,
    onEnded,
    onDuration,
    volume,
    playerRef
}) => {
    const player = useRef(null as ReactPlayer | null);
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
                onProgress={onDuration}
                controls={false}
                volume={volume}
                playing={true}
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