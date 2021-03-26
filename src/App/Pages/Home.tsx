import { useCallback, useState } from "react";
import { StandardLayout } from "../Components/Layout";
import { PageHeading } from "../Components/PageHeading";
import { RoomCard } from "../Components/RoomCard";
import { RoomSearch } from "../Components/RoomSearch";
import { RoomSection } from "../Components/RoomSection";

export const Home = () => {
    const [query, setQuery] = useState("");
    const onSearchSubmit = useCallback(() => {
        console.log(query);
    }, [query]);
    
    return (
        <StandardLayout>

            <PageHeading title="Rooms" />


            <RoomSection title="Find Rooms" noGrid>
                <div className="flex space-x-2">
                    <div className="w-1/4 sm:w-1/2 md:w-3/4 lg:w-full lg:flex-grow">
                        <RoomSearch 
                            value={query}
                            onQueryChange={(text: string) => setQuery(text)}
                            onSubmit={onSearchSubmit}
                        />
                    </div>
                    <div className="w-1/4 sm:w-1/2 md:w-1/4 lg:w-full lg:max-w-sm">
                        <button className="block w-full bg-indigo-900 p-3 rounded-md transition duration-150 hover:bg-indigo-500 focus:outline-none">
                            Create Room
                        </button>
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

        </StandardLayout>
    )

};