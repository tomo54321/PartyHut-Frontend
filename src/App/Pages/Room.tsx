import { RoomBackgroundImage } from "../Components/RoomBackgroundImage"
import bgImage from '../Assets/Backgrounds/default.jpg';
import { YTPlayer } from "../Components/Players/YouTube";
import { RoomHeading } from "../Components/RoomHeading";
import { ChatBox } from "../Components/ChatBox";
import { useSelector } from "react-redux";
import { ApplicationState } from "../Redux/Store";
import { useState } from "react";

export const Room = () => {

    const [room] = useState({ name: "Epic Room", host: { username: "tomo54321" }});
    const currentAuth = useSelector((state: ApplicationState) => state.user);

    return (
        <div className="flex overflow-hidden h-screen w-full">
            <div className="relative overflow-hidden h-full w-full">
                <RoomBackgroundImage url={bgImage}/>

                <div className="absolute h-full w-full">
                    <RoomHeading 
                        loggedIn={currentAuth.logged_in}
                        name={room.name}
                        username={room.host.username}
                    />

                    <div className="mx-auto mt-5 w-4/5 lg:w-full lg:max-w-xl">
                        <YTPlayer 
                            id="I1NuCWfYeYc"
                        />
                    </div>
                </div>

            </div>
        
            <ChatBox 
                loggedIn={currentAuth.logged_in}
                username={currentAuth.username || "User"}
            />
        </div>
    )

};