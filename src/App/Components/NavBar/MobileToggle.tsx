import { Menu, X } from 'react-feather';
interface MobileToggleButtonProps {
    isOpen: boolean;
    toggleOpen: Function
};
export const MobileToggleButton: React.FC<MobileToggleButtonProps> = ({
    isOpen,
    toggleOpen
}) => (
    <button
        className="md:hidden focus:outline-none"
        onClick={() => toggleOpen()}
    >
        {
            isOpen ? <X /> : <Menu />
        }
    </button>
);