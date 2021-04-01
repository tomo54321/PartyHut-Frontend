import React from "react";
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
                placeholder="Or search..."/>
        </TabBar>
    </Layout>
);