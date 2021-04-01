import { MouseEventHandler } from "react";

interface TabBarButtonProps {
    selected?: boolean;
    className?: string
    onClick?: MouseEventHandler;
}
export const TabBarButton: React.FC<TabBarButtonProps> = ({
    selected,
    children,
    className,
    onClick
}) => (
    <button
        onClick={onClick}
        className={`font-medium border-b-2 ${selected ? "border-indigo-500" : "border-gray-900 opacity-50"} hover:border-indigo-900 hover:opacity-100 transition duration-75 whitespace-nowrap focus:outline-none${className ? " " + className : ""}`}
    >
        {children}
    </button>
);