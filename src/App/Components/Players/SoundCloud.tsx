import React, { useRef } from "react";
import SoundCloudPlayer from "react-player/soundcloud";
import ReactPlayer from "react-player/soundcloud";

interface SoundCloudPlayerProps {
    id: string;
}
export const SCPlayer: React.FC<SoundCloudPlayerProps> = ({
    id
}) => {
    const player = useRef(null as null | SoundCloudPlayer);
    return (
        <div className="aspect-h-9 aspect-w-16">
            <ReactPlayer
                ref={player}
                controls={false}
                playing={true}
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