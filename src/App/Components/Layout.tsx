import React from "react";
import { PrimaryButton } from "./Button";
import { PageHeader } from "./PageHeader";

interface LayoutProps {
    title?: string;
}
export const Layout: React.FC<LayoutProps> = ({
    title,
    children
}) => (
    <div className="p-5 lg:py-7">
        {
            title ?
                <PageHeader 
                    title={title} 
                    RightItem={() => <PrimaryButton title="Create Hut" />}
                />
            : null
        }
        {children}
    </div>
);