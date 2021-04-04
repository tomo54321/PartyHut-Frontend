import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PartyHut } from "../api/api";
import { AppLoading } from "../pages/AppLoading";
import { setUserState } from "../redux/actions/UserActions";
import { BottomPlayer } from "./BottomPlayer";
import { ChatBox } from "./ChatBox";
import { NavBar } from "./NavBar";
import { Player } from "./Player";

interface PageWrapperProps { }
export const PageWrapper: React.FC<PageWrapperProps> = ({
    children
}) => {

    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        PartyHut.auth.checkStatus()
            .then(data => {
                if(data !== null){
                    dispatch(setUserState({
                        logged_in: true,
                        user: data
                    }));
                }
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            })
    }, [dispatch]);

    if(isLoading){
        return <AppLoading />;
    }

    return (
        <div className="w-screen h-screen flex flex-col md:flex-row overflow-hidden">
            <NavBar />

            {/* The main content */}
            <div className="flex flex-col flex-grow">
                <div className="relative flex-grow h-16 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-700">
                    <Player />
                    {children}
                </div>
                <BottomPlayer />
            </div>

            <ChatBox />
        </div>
    )
};