import { useCallback, useEffect, useRef, useState } from "react";
import { MoreVertical } from "react-feather";

interface MenuItem {
    title: string;
    onClick: Function;
}

interface ContextMenuProps {
    items: MenuItem[];
}
export const ContextMenu: React.FC<ContextMenuProps> = ({
    items
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const menuEl = useRef(null as HTMLDivElement | null);
    const documentClicked = useCallback(e => {
        if(menuEl.current === null || menuEl.current!.contains(e.target)){
            return;
        }
        setIsOpen(false);
    }, []);

    useEffect(() => {
        window.addEventListener("click", documentClicked);
        return () => {
            window.removeEventListener("click", documentClicked);
        };
    }, [documentClicked]);

    return (
        <div className="relative" ref={ref => menuEl.current = ref}>
            <button 
            className="focus:outline-none"
            onClick={() => setIsOpen(open => !open)}>
                <MoreVertical />
            </button>
            {
                isOpen ? <Menu menuItems={items} /> : null
            }
        </div>
    )
};

const Menu: React.FC<{ menuItems: MenuItem[] }> = ({
    menuItems
}) => {

    const buttons = menuItems.map((item, index) => (
        <li key={"menu-item-" + index + Math.round(Math.random() * 9999)}>
            <button
            type="button" 
            className="block w-full text-left p-3 text-sm transition duration-150 hover:bg-gray-700 focus:outline-none"
            onClick={()=> item.onClick()}>{item.title}</button>
        </li>
    ));

    return (
        <div className="absolute right-0 shadow-sm bg-gray-900 w-44 ">
            <ul>
                {buttons}
            </ul>
        </div>
    )
}