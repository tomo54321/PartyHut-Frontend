import React from "react"
import { Spinner } from "./Spinner"

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    type?: "button" | "submit";
    title?: string;
    loading?: boolean;
    className?: string;
}
export const PrimaryButton: React.FC<ButtonProps> = ({
    title,
    type,
    loading,
    className,
    children,
    ...props
}) => (
    <button 
    type={type || "button"}
    className={`${className ? className + " " : ""}bg-indigo-500 py-2 px-5 rounded-md font-medium text-sm shadow-sm transition duration-150 hover:bg-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none`}
    {...props}>
        {title ? title : children} 
        {loading ? <Spinner /> : null}
    </button>
)

export const SecondaryButton: React.FC<ButtonProps> = ({
    title,
    type,
    loading,
    className,
    children,
    ...props
}) => (
    <button
    type={type || "button"}
    className={`${className ? className + " " : ""}bg-gray-900 py-2 px-5 rounded-md font-medium text-sm shadow-sm transition duration-150 hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none`}
    {...props}>
        {title ? title : children} 
        {loading ? <Spinner /> : null}
    </button>
)

export const DangerButton: React.FC<ButtonProps> = ({
    title,
    type,
    loading,
    className,
    children,
    ...props
}) => (
    <button
    type={type || "button"}
    className={`${className ? className + " " : ""}bg-red-500 py-2 px-5 rounded-md font-medium text-sm shadow-sm transition duration-150 hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none`}
    {...props}>
        {title ? title : children} 
        {loading ? <Spinner /> : null}
    </button>
)