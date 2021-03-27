import { useCallback, useState } from "react";
import { StandardLayout } from "../Components/Layout";
import { PageHeading } from "../Components/PageHeading";
import { SearchBar } from "../Components/SearchBar";
import { SelectDropdown } from "../Components/SelectDropdown";

export const Music = () => {
    const [query, setQuery] = useState("");
    const [platform, setPlatform] = useState("YouTube" as "YouTube" | "SoundCloud");
    const onSearchSubmit = useCallback(() => {
        console.log(query);
    }, [query]);

    return (
        <StandardLayout>

            <PageHeading title="Search Music" />

            <div className="flex space-x-2">
                <div className="w-1/4 sm:w-1/2 md:w-3/4 lg:w-full lg:flex-grow">
                    <SearchBar
                        value={query}
                        placeholder={"Search for songs on " + platform}
                        onQueryChange={(text: string) => setQuery(text)}
                        onSubmit={onSearchSubmit}
                    />
                </div>
                <div className="w-1/4 sm:w-1/2 md:w-1/4 lg:w-full lg:max-w-sm">

                    <SelectDropdown 
                        value={platform}
                        options={[
                            {
                                title: "YouTube",
                                value: "YouTube"
                            },
                            {
                                title: "SoundCloud",
                                value: "SoundCloud"
                            }
                        ]}
                        onChange={(value: "YouTube" | "SoundCloud") => {
                            setQuery("");
                            setPlatform(value)
                        }}
                    />
                </div>
            </div>



        </StandardLayout>
    )

};