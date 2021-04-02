import React, { useState } from "react";
import { PrimaryButton } from "../components/Button";
import { Card } from "../components/Card";
import { CardGrid } from "../components/CardGrid";
import { Layout } from "../components/Layout";
import { CreatePlaylistModal } from "../components/Modals/CreatePlaylist";
interface AllPlaylistsPageProps { }
export const AllPlaylistsPage: React.FC<AllPlaylistsPageProps> = () => {

    const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false);

    return (
        <Layout
            title="My Playlists"
            RightItem={() => <PrimaryButton onClick={() => setShowCreatePlaylistModal(true)} title="New Playlist" />}
        >

            <CardGrid>
                <Card
                    image={"http://placehold.it/150x150"}
                    title={"Monstercat"}
                    link={`/playlist/abcd`}
                    subtitle="10 songs"
                />
            </CardGrid>

            {showCreatePlaylistModal ? <CreatePlaylistModal onClose={() => setShowCreatePlaylistModal(false)} /> : null}
        </Layout>
    );
};