import { useState } from "react";

interface RoomBackgroundImageProps {
    src: string;
}
export const RoomBackgroundImage: React.FC<RoomBackgroundImageProps> = ({
    src
}) => {

    const [loaded, setLoaded] = useState(false);

    return (
        <img
            src={src}
            style={{
                zIndex: -10
            }}
            className={`absolute top-0 left-0 object-cover object-center h-full w-full hidden sm:block transition-opacity duration-150 ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={e => {
                setLoaded(true)
            }}
            alt=""
        />
    );

};