import { useCallback, useEffect, useRef, useState } from "react";
import { PrimaryButton } from "../Components/Buttons";
import { StandardLayout } from "../Components/Layout";
import { PageHeading } from "../Components/PageHeading";
import { RoomCard } from "../Components/RoomCard";
import { SearchBar } from "../Components/SearchBar";
import { RoomSection } from "../Components/RoomSection";
import { useHistory } from "react-router";
import { APIBasicRoomResponse, APIErrorResponse, APIRoomLayoutResponse } from "../Modules/API/d.types";
import { CreateRoomModal } from "../Components/Room/CreateModal";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../Redux/Store";
import { showAuthForm } from "../Redux/Actions/AuthFormActions";
import { getRooms } from "../Modules/API/Rooms";
import axios from "axios";
import { LoadingIcon } from "../Components/LoadingIcon";
import defaultArtwork from '../Assets/default-cover.jpg';

export const Home = () => {

    const [rooms, setRooms] = useState<APIRoomLayoutResponse[]>([]);

    const [loading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

    const isLoggedIn = useSelector((state: ApplicationState) => state.user.logged_in);
    const dispatch = useDispatch();
    const history = useHistory();

    const cancelToken = useRef(axios.CancelToken.source());

    const onRoomCreated = useCallback((room: APIBasicRoomResponse) => {
        history.push(`/room/${room.id}`);
    }, [history]);

    const onSearchSubmit = useCallback(() => {
        console.log(query);
    }, [query]);

    useEffect(() => {
        getRooms(cancelToken.current)
        .then(layout => {
            setRooms(layout);
            setIsLoading(false);
        })
        .catch((e: APIErrorResponse) => {
            console.log(e.errors[0].msg)
        })
    }, []);
    
    const roomSections = rooms.map(section => (
        <RoomSection key={"section-" + section.title} title={section.title}>
            {
                section.rooms.map((room) => (
                    <RoomCard
                        key={"section-" + section.title + "-room-" + room.id}
                        id={room.id}
                        title={room.name}
                        username={room.host.username}
                        image={room.thumbnail === "" ? defaultArtwork : room.thumbnail}
                    />
                ))
            }
        </RoomSection>
    ));

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

            {
                loading ? <LoadingIcon /> : roomSections
            }

            {
                showCreateRoomModal ? <CreateRoomModal onCreated={onRoomCreated} onCancel={() => setShowCreateRoomModal(false)} /> : null
            }

        </StandardLayout>
    )

};