import { Link } from "react-router-dom";
interface CardProps {
    image: string;
    title: string;
    subtitle?: string;
    link: string;
    className?: string;
}
export const Card: React.FC<CardProps> = ({
    image,
    title,
    subtitle,
    link,
    className
}) => (
    <Link 
    className={`block relative${className ? " " + className : ""}`}
    to={link}>
        <img 
            src={image} 
            alt={title} 
            className="rounded-t-md w-full"
        />
        <div className="bg-gray-800 p-3 rounded-b-md">
            <span className="block font-medium text-lg truncate">{title}</span>
            <span className="block font-medium text-xs truncate opacity-50">{subtitle}</span>
        </div>
    </Link>
);