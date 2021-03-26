import { Link } from "react-router-dom";

interface ButtonProps {
    type: "button" | "submit" | "link";
    href?: string;
    sm?: boolean;
    title?: string;
    children?: any;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const defaultButtonProps: Partial<ButtonProps> = {
    type: "button",
    href: "/",
    title: "Button",
    sm: false,
    disabled: false,
};

const defaultButtonClasses = "block w-full rounded-md transition duration-150 focus:outline-none disabled:opacity-50";

export const PrimaryButton: React.FC<ButtonProps> = ({
    type,
    href,
    title,
    children,
    sm,
    disabled,
    onClick
}) => {

    const classes = `${defaultButtonClasses} bg-indigo-700 hover:bg-indigo-500 ${sm ? "p-2" : "p-3"}`;

    if(type === "link"){
        return <Link to={href!} className={classes}>{title}</Link>
    } else {
        return (
            <button 
            type={type}
            disabled={disabled}
            onClick={onClick} 
            className={classes}>{children || title}</button>
        )
    }

};
PrimaryButton.defaultProps = defaultButtonProps;


export const SecondaryButton: React.FC<ButtonProps> = ({
    type,
    href,
    sm,
    disabled,
    title,
    children,
    onClick
}) => {

    const classes = `${defaultButtonClasses} bg-gray-800 hover:bg-gray-600 ${sm ? "p-2 text-sm" : "p-3"}`;

    if(type === "link"){
        return <Link to={href!} className={classes}>{title}</Link>
    } else {
        return (
            <button 
            type={type}
            disabled={disabled}
            onClick={onClick} 
            className={classes}>{children || title}</button>
        )
    }

};
SecondaryButton.defaultProps = defaultButtonProps;
