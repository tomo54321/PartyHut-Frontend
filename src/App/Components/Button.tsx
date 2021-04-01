import React from "react"

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    type?: "button" | "submit";
    title?: string;
    className?: string;
}
export const PrimaryButton: React.FC<ButtonProps> = ({
    title,
    type,
    className,
    children,
    ...props
}) => (
    <button 
    type={type || "button"}
    className={`${className ? className + " " : ""}bg-indigo-500 py-2 px-5 rounded-md font-medium text-sm shadow-sm transition duration-150 hover:bg-indigo-600 disabled:opacity-95 focus:outline-none`}
    {...props}>
        {title ? title : children}
    </button>
)
export const SecondaryButton: React.FC<ButtonProps> = ({
    title,
    type,
    className,
    children,
    ...props
}) => (
    <button
    type={type || "button"}
    className={`${className ? className + " " : ""}bg-gray-900 py-2 px-5 rounded-md font-medium text-sm shadow-sm transition duration-150 hover:bg-gray-700 disabled:opacity-95 focus:outline-none`}
    {...props}>
        {title ? title : children}
    </button>
)