import React from "react";

interface PageHeaderProps {
    title: string;
    RightItem?: React.FC
}
export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    RightItem
}) => (
    <div className="flex justify-between items-center mb-5 md:mb-10">
        <h1 className="text-4xl lg:text-5xl font-bold">{title}</h1>
        {
            RightItem ? <RightItem /> : null
        }
    </div>
)