import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { PartyHut } from "../api/api";
import { PrimaryButton } from "../components/Button";
import { Card } from "../components/Card";
import { CardGrid } from "../components/CardGrid";
import { Layout } from "../components/Layout";
import { CreateHutModal } from "../components/Modals/CreateHut";
import { SearchInput } from "../components/SearchInput";
import { Spinner } from "../components/Spinner";
import { TabBar } from "../components/TabBar/TabBar";
import { TabBarButton } from "../components/TabBar/TabBarButton";
import { RoomResponse } from "../types/api/RoomResponse";
import { ErrorResponse } from "../types/Error";

interface HutsPageProps { }
export const HutsPage: React.FC<HutsPageProps> = () => {

    const [showCreateHutModal, setShowCreateHutModal] = useState(false);

    const [category, setCategory] = useState("discover" as "discover" | "trending" | "new" | "genres" | "search");
    const query = useRef("");

    const [isLoading, setIsLoading] = useState(true);
    const [rooms, setRooms] = useState([] as RoomResponse[]);
    const cancelToken = useRef(axios.CancelToken.source());

    useEffect(() => {
        setIsLoading(true);
        cancelToken.current = axios.CancelToken.source();
        PartyHut.rooms.get(category, cancelToken.current.token, query.current)
            .then(data => {
                setRooms(data);
                setIsLoading(false);
            })
            .catch(e => {
                const error = e as ErrorResponse;
                alert(error.errors[0].msg);
                setIsLoading(false);
            })

    }, [category]);

    useEffect(() => {
        return () => {
            cancelToken.current.cancel();
        }
    }, []);

    return (
        <Layout
            title="Discover Huts"
            RightItem={() => <PrimaryButton onClick={() => setShowCreateHutModal(true)} title="Create Hut" />}
        >
            <TabBar>
                <TabBarButton onClick={() => setCategory("discover")} selected={category === "discover"}>Discover</TabBarButton>
                <TabBarButton onClick={() => setCategory("trending")} selected={category === "trending"}>Trending</TabBarButton>
                <TabBarButton onClick={() => setCategory("new")} selected={category === "new"}>New Huts</TabBarButton>
                <TabBarButton onClick={() => setCategory("genres")} selected={category === "genres"}>Genres</TabBarButton>
                <SearchInput
                    className="order-first mb-5 md:order-1 md:mb-0"
                    onSearch={(q: string) => {
                        query.current = q;
                        setCategory("search");
                    }}
                    loading={isLoading}
                    disabled={isLoading}
                    placeholder="Search Users, Huts and Songs" />
            </TabBar>

            <CardGrid>
                {
                    isLoading ? <Spinner /> :
                    rooms.length > 0 ?
                        rooms.map((room, index) => (
                            <Card
                                key={`room-${index}-${room.id}`}
                                image={"http://placehold.it/1080x720"}
                                title={room.name}
                                link={`/room/${room.id}`}
                                subtitle={"Welcome!"}
                            />
                        ))
                        : 
                        <p className="col-span-full text-center font-medium my-2">No Huts Found</p>
                }
            </CardGrid>

            {
                showCreateHutModal ?
                    <CreateHutModal onClose={() => setShowCreateHutModal(false)} />
                    : null
            }
        </Layout>
    );
}