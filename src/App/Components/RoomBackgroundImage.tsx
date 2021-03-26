import React, { useState } from 'react';

interface RoomBackgroundImageProps {
    url: string;
}
export const RoomBackgroundImage: React.FC<RoomBackgroundImageProps> = ({
    url
}) => {
    const [loaded, setLoaded] = useState(false);
    const imageClasses = (loaded) ? "opacity-1 transition duration-150" : "opacity-0 transition duration-150";
    return (
        <img 
        src={url}
        className={["absolute", "top-0", "left-0", "h-full", "w-full", "object-cover", imageClasses].join(" ")}
        onLoad={e => {
            setLoaded(true)
        }}
        alt=""
        />
    )
};