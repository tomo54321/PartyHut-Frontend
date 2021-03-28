import React, { useRef } from "react";
import YouTubePlayer from "react-player/youtube";
import ReactPlayer from "react-player/youtube";

interface YouTubePlayerProps {
    id: string;
}
export const YTPlayer: React.FC<YouTubePlayerProps> = ({
    id
}) => {
    const player = useRef(null as null | YouTubePlayer);
    return (
        <div className="aspect-h-9 aspect-w-16">
            <ReactPlayer
                ref={player}
                controls={false}
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