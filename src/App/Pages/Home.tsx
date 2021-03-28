import { useCallback, useState } from "react";
import { PrimaryButton } from "../Components/Buttons";
import { StandardLayout } from "../Components/Layout";
import { PageHeading } from "../Components/PageHeading";
import { RoomCard } from "../Components/RoomCard";
import { SearchBar } from "../Components/SearchBar";
import { RoomSection } from "../Components/RoomSection";
import { useHistory } from "react-router";
import { APIBasicRoomResponse } from "../Modules/API/d.types";
import { CreateRoomModal } from "../Components/Room/CreateModal";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../Redux/Store";
import { showAuthForm } from "../Redux/Actions/AuthFormActions";

export const Home = () => {
    const [query, setQuery] = useState("");
    const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

    const isLoggedIn = useSelector((state: ApplicationState) => state.user.logged_in);
    const dispatch = useDispatch();
    const history = useHistory();

    const onRoomCreated = useCallback((room: APIBasicRoomResponse) => {
        history.push(`/room/${room.id}`);
    }, [history]);

    const onSearchSubmit = useCallback(() => {
        console.log(query);
    }, [query]);
    
    return (
        <StandardLayout>

            <PageHeading title="Rooms" />

            <RoomSection title="Find Rooms" noGrid>
                <div className="flex space-x-2">
                    <div className="w-1/4 sm:w-1/2 md:w-3/4 lg:w-full lg:flex-grow">
                        <SearchBar 
                            value={query}
                            placeholder="Search rooms by name or user"
                            onQueryChange={(text: string) => setQuery(text)}
                            onSubmit={onSearchSubmit}
                        />
                    </div>
                    <div className="w-1/4 sm:w-1/2 md:w-1/4 lg:w-full lg:max-w-sm">
                        <PrimaryButton 
                            type="button" 
                            title="Create Room" 
                            onClick={() => {
                                if(isLoggedIn){
                                    setShowCreateRoomModal(true);
                                } else {
                                    dispatch(showAuthForm());
                                }
                            }}
                        />
                    </div>
                </div>
            </RoomSection>



            <RoomSection title="Trending">
                <RoomCard 
                    id="abcd"
                    title="My Epic Room"
                    username="tomo54321"
                    image="https://placehold.it/250x150"
                />
                <RoomCard 
                    id="abcd"
                    title="My Epic Room"
                    username="tomo54321"
                    image="https://placehold.it/250x150"
                />
                <RoomCard 
                    id="abcd"
                    title="My Epic Room"
                    username="tomo54321"
                    image="https://placehold.it/250x150"
                />
            </RoomSection>

            <RoomSection title="New Rooms">
                <RoomCard 
                    id="abcd"
                    title="My Epic Room"
                    username="tomo54321"
                    image="https://placehold.it/250x150"
                />
                <RoomCard 
                    id="abcd"
                    title="My Epic Room"
                    username="tomo54321"
                    image="https://placehold.it/250x150"
                />
                <RoomCard 
                    id="abcd"
                    title="My Epic Room"
                    username="tomo54321"
                    image="https://placehold.it/250x150"
                />
            </RoomSection>


            {
                showCreateRoomModal ? <CreateRoomModal onCreated={onRoomCreated} onCancel={() => setShowCreateRoomModal(false)} /> : null
            }

        </StandardLayout>
    )

};