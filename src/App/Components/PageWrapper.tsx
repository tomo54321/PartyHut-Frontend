import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PartyHut } from "../api/api";
import { AppLoading } from "../pages/AppLoading";
import { setPlaylists } from "../redux/actions/PlaylistActions";
import { setUserState } from "../redux/actions/UserActions";
import { ErrorResponse } from "../types/Error";
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

    const fetchPlaylists = useCallback(async () => {
        try {
            const playlists = await PartyHut.playlist.all(axios.CancelToken.source().token);
            dispatch(setPlaylists({
                updated_at: Date.now(),
                playlists
            }))
        } catch (e) {
            const error = e as ErrorResponse;
            console.log("Couldn't fetch playlists | Response:", error.errors[0].msg);
        }
    }, [dispatch]);

    useEffect(() => {
        PartyHut.auth.checkStatus()
            .then(data => {
                if (data !== null) {
                    dispatch(setUserState({
                        logged_in: true,
                        user: data
                    }));
                    fetchPlaylists();
                }
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            })
    }, [dispatch, fetchPlaylists]);

    if (isLoading) {
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