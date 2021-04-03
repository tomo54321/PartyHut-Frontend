import React from "react";
import { PageHeader } from "./PageHeader";

interface LayoutProps {
    title?: string;
    className?: string;
    RightItem?: React.FC
}
export const Layout: React.FC<LayoutProps> = ({
    title,
    className,
    RightItem,
    children
}) => (
    <div className={"p-5 lg:py-7" + (className ? " " + className : "")}>
        {
            title ?
                <PageHeader 
                    title={title} 
                    RightItem={RightItem}
                />
            : null
        }
        {children}
    </div>
);