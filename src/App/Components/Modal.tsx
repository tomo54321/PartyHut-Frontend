import { useEffect, useState } from "react";
import { ModalHeader } from "./ModalHeader";

interface ModalProps {
    title: string;
    onClose: Function;
}
export const Modal: React.FC<ModalProps> = ({
    children,
    title,
    onClose
}) => {

    const [show, setShow] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 50);
    }, []);

    return (
        <>
            <div className="fixed z-30 top-0 left-0 h-full w-full bg-black bg-opacity-75" />
            <div className={`fixed z-40 m-auto top-10 left-0 right-0 w-3/4 max-w-md bg-gray-800 rounded-md transition duration-300 transform ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
                <ModalHeader title={title} onClose={onClose} />
                <div className="p-4">
                    {children}
                </div>
            </div>
        </>
    )
}