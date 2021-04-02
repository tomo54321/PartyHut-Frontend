import { useLocation } from "react-router";
import { PlayerWrapper } from "./Players/PlayerWrapper";

interface PlayerProps { }
export const Player: React.FC<PlayerProps> = () => {
    const location = useLocation();

    return (
        <div 
            className={`absolute ${ location.pathname.startsWith("/room") ? "block" : "hidden"} w-full h-full top-0 pt-16 left-0`}
            style={{
                zIndex: -1
            }}
        >
            <div className="max-w-xl mx-auto">
                <PlayerWrapper
                    isPlaying={true}
                    platform="YouTube"
                    platformId="lLmfvlquYm4"
                    songStartedAt={Date.now()}
                    onEnded={() => { }}
                    volume={1}
                />
            </div>
        </div>
    )
}