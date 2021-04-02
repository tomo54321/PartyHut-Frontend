import React, { useCallback, useEffect, useRef, useState } from "react";
import { Code } from "react-feather";
import { SelectFieldList } from "./SelectField/List";

export interface SelectFieldOptionProps {
    value: string | number;
    title: string;
    disabled?: boolean;
}
interface SelectFieldProps {
    disabled?: boolean;
    className?: string;
    value: string | number;
    onChange: Function;
    options: SelectFieldOptionProps[]
}
export const SelectField: React.FC<SelectFieldProps> = ({
    disabled,
    value,
    className,
    onChange,
    options
}) => {
    const [open, setOpen] = useState(false);
    
    const selectRef = useRef<HTMLDivElement | null>();

    const onClickElsewhere = useCallback(e => {
        if(!selectRef.current || selectRef.current.contains(e.target)){
            return;
        }
        setOpen(false);
    }, [setOpen, selectRef]);

    useEffect(() => {
        window.addEventListener("click", onClickElsewhere);
        return () => {
            window.removeEventListener("click", onClickElsewhere);
        }
    }, [onClickElsewhere]);

    return (
        <div ref={ref => selectRef.current = ref} className={"relative" + (className ? " " + className : "")}>
            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen(open => !open)}
                className="flex items-center text-left w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none"
            >
                <span className="block flex-grow font-medium">{options.find(opt => opt.value === value)?.title || "Invalid Value"}</span>
                <Code size={18} className="transform rotate-90 opacity-75" />
            </button>
            {
                open && !disabled ? <SelectFieldList options={options} onClick={(value: any) => {
                    setOpen(false);
                    onChange(value);
                }} value={value} /> : null
            }
        </div>
    )
};