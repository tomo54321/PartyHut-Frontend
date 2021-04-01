import React, { MouseEventHandler } from "react";
import { Icon } from "react-feather";

interface ReactionControlButtonProps {
    Icon: Icon,
    title: string;
    activeClass?: string;
    isActive?: boolean;
    onClick?: MouseEventHandler
};

export const ReactionControlButton: React.FC<ReactionControlButtonProps> = ({
    Icon,
    title,
    activeClass,
    isActive,
    onClick
}) => (
    <button
        onClick={onClick}
        title={title}
        className={(isActive ? activeClass : "text-white") + " focus:outline-none"}
    >
        <Icon />
    </button>
);