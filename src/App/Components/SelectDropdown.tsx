import React, { useCallback, useEffect, useRef, useState } from "react";
import { Code } from "react-feather";
import { SecondaryButton } from "./Buttons";

interface Option {
    title: string;
    value: string;
}
interface DropdownProps {
    onChange: Function;
    value: string;
    disabled?: boolean;
    options: Option[];
}
export const SelectDropdown: React.FC<DropdownProps> = ({
    onChange,
    value,
    disabled,
    options
}) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null as HTMLDivElement | null);
    const documentClicked = useCallback(e => {
        if(dropdownRef.current === null || dropdownRef.current!.contains(e.target)){
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

    const opts = options.map((option, index) => (
        <li key={`select-option-${index}`}>
            <button 
                className={"block w-full text-left p-3 transition duration-150 " + (option.value === value ? "bg-indigo-500 hover:bg-indigo-700" : "hover:bg-gray-700")}
                onClick={() =>{
                    setIsOpen(false);
                    onChange(option.value);
                }}
            >{option.title}</button>
        </li>
    ))

    return (
        <div 
        ref={ref => dropdownRef.current = ref}
        className="relative">
            <SecondaryButton type="button" disabled={disabled} onClick={() => setIsOpen(true)}>
                <div className="flex items-center justify-between">
                    <span className="font-semibold">{options.find(opt => opt.value === value)?.title || "Invalid Value"}</span>
                    <Code size={16} className="transform rotate-90"/>
                </div>
            </SecondaryButton>
            {
                isOpen && !disabled ?
                <ul className="absolute rounded-md overflow-hidden w-full mt-2 bg-gray-900">
                    {opts}
                </ul>
                : null
            }
        </div>
    )

};

SelectDropdown.defaultProps = {
    disabled: false
}