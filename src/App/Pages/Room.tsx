import { RoomBackgroundImage } from "../Components/RoomBackgroundImage"
import bgImage from '../Assets/Backgrounds/default.jpg';
import { YTPlayer } from "../Components/Players/YouTube";
import { RoomHeading } from "../Components/RoomHeading";
import { ChatBox } from "../Components/ChatBox";

export const Room = () => {

    return (
        <div className="flex overflow-hidden h-screen w-full">
            <div className="relative overflow-hidden h-full w-full">
                <RoomBackgroundImage url={bgImage}/>

                <div className="absolute h-full w-full">
                    <RoomHeading 
                        name="Epic Room"
                        username="tomo54321"
                    />

                    <div className="mx-auto mt-5 w-4/5 lg:w-full lg:max-w-xl">
                        <YTPlayer 
                            id="I1NuCWfYeYc"
                        />
                    </div>
                </div>

            </div>
        
            <ChatBox />
        </div>
    )

};