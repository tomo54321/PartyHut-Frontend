import { X } from "react-feather";

interface ModalHeaderProps {
    title: string;
    onClose: Function;
}
export const ModalHeader: React.FC<ModalHeaderProps> = ({
    title,
    onClose
}) => (
    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-t-md">
        <span className="block font-medium">{title}</span>
        <button className="focus:outline-none" onClick={() => onClose()}><X /></button>
    </div>
);