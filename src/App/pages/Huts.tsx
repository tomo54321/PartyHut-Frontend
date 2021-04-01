import React from "react";
import { HutCard } from "../components/HutCard";
import { Layout } from "../components/Layout";
import { SearchInput } from "../components/SearchInput";
import { TabBar } from "../components/TabBar/TabBar";
import { TabBarButton } from "../components/TabBar/TabBarButton";

interface HutsPageProps {}
export const HutsPage: React.FC<HutsPageProps> = () => (
    <Layout title="Discover Huts">
        <TabBar>
            <TabBarButton selected>Discover</TabBarButton>
            <TabBarButton>Trending</TabBarButton>
            <TabBarButton>New Huts</TabBarButton>
            <TabBarButton>Genres</TabBarButton>
            <SearchInput 
                className="order-first mb-5 md:order-1 md:mb-0"
                onSearch={() => {}} 
                placeholder="Search Users, Huts and Songs"/>
        </TabBar>

        <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
            <HutCard 
                hut={{
                    id: "abcd",
                    name: "The Hut",
                    thumbnail: "http://placehold.it/1080x720",
                    host: {
                        username: "tomo54321"
                    },
                    song: {
                        name: "Koven - Numb [Monstercat Release]"
                    }
                }}
            />
        </div>
    </Layout>
);