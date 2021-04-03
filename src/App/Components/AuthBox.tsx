import { useEffect, useState } from "react";

interface AuthBoxProps { }
export const AuthBox: React.FC<AuthBoxProps> = ({
    children
}) => {
    const [shown, setShown] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setShown(true);
        }, 50);
    }, []);
    return (
        <div className={`block max-w-xl w-full mx-auto md:flex md:space-x-2 bg-gray-800 border border-gray-700 rounded-md overflow-hidden transition-all duration-150 ${shown ? "mt-0 opacity-100" : "-mt-10 opacity-0"}`}>
            <div className="w-1/3 p-5 bg-gray-700 bg-opacity-25 md:flex md:flex-col md:justify-center md:items-center">
                <h1 className="text-2xl text-white font-medium">PartyHut</h1>
            </div>
            <div className="w-2/3 px-3 py-10">
                {children}
            </div>
        </div>
    );
}