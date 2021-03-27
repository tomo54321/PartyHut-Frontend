import { useCallback, useState } from "react";
import { PrimaryButton } from "../Components/Buttons";
import { StandardLayout } from "../Components/Layout";
import { PageHeading } from "../Components/PageHeading";
import { RoomCard } from "../Components/RoomCard";
import { SearchBar } from "../Components/SearchBar";
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
                        <SearchBar 
                            value={query}
                            placeholder="Search rooms by name or user"
                            onQueryChange={(text: string) => setQuery(text)}
                            onSubmit={onSearchSubmit}
                        />
                    </div>
                    <div className="w-1/4 sm:w-1/2 md:w-1/4 lg:w-full lg:max-w-sm">
                        <PrimaryButton type="button" title="Create Room" />
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