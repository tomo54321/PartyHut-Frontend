import React, { useState } from "react";
import { PrimaryButton } from "../components/Button";
import { Card } from "../components/Card";
import { CardGrid } from "../components/CardGrid";
import { Layout } from "../components/Layout";
import { CreateHutModal } from "../components/Modals/CreateHut";
import { SearchInput } from "../components/SearchInput";
import { TabBar } from "../components/TabBar/TabBar";
import { TabBarButton } from "../components/TabBar/TabBarButton";

interface HutsPageProps { }
export const HutsPage: React.FC<HutsPageProps> = () => {

    const [showCreateHutModal, setShowCreateHutModal] = useState(false);

    return (
        <Layout 
            title="Discover Huts"
            RightItem={() => <PrimaryButton onClick={() => setShowCreateHutModal(true)} title="Create Hut" />}
        >
            <TabBar>
                <TabBarButton selected>Discover</TabBarButton>
                <TabBarButton>Trending</TabBarButton>
                <TabBarButton>New Huts</TabBarButton>
                <TabBarButton>Genres</TabBarButton>
                <SearchInput
                    className="order-first mb-5 md:order-1 md:mb-0"
                    onSearch={() => { }}
                    placeholder="Search Users, Huts and Songs" />
            </TabBar>

            <CardGrid>
                <Card 
                    image={"http://placehold.it/1080x720"}
                    title={"The Hut"}
                    link={`/room/abcd`}
                    subtitle="Listening to Koven - Numb [Monstercat Release]"
                />
            </CardGrid>
            
            {
                showCreateHutModal ? 
                <CreateHutModal onClose={() => setShowCreateHutModal(false)} />
                : null
            }
        </Layout>
    );
}