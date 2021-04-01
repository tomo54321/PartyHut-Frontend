import { useState } from "react";
import { Logo } from "./Logo";
import { MobileToggleButton } from "./NavBar/MobileToggle";
import { Nav } from "./NavBar/Nav";

interface NavBarProps {};
export const NavBar: React.FC<NavBarProps> = () => {

    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <div className={"flex-shrink-0 bg-gray-800 border-b border-gray-700 md:border-b-0 border-r py-4 px-3 min-h-16 md:h-full w-full md:w-44 lg:w-48 overflow-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-700"}>
            <div className={"flex md:block justify-between"}>
                <Logo />

                <MobileToggleButton 
                    isOpen={isNavOpen}
                    toggleOpen={() => setIsNavOpen(open => !open)}
                />
            </div>

            <Nav isOpen={isNavOpen} />

        </div>
    );
};