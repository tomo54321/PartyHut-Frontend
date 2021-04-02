import { useEffect, useState } from "react";
import { SelectFieldOptionProps } from "../SelectField";
import { SelectFieldOption } from "./Option";

export const SelectFieldList: React.FC<{ options: SelectFieldOptionProps[], onClick: Function; value: string | number }> = ({
    value,
    onClick,
    options
}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => setOpen(true), 50);
    }, []);

    return (
        <ul
            className={`bg-gray-800 border border-gray-700 shadow ${open ? "mt-2 opacity-100" : "-mt-1 opacity-0"} rounded-lg absolute z-10 w-full transition-all duration-150`}
        >
            {
                options.map(opt => (
                    <SelectFieldOption
                        key={opt.value}
                        value={opt.value}
                        title={opt.title}
                        selected={opt.value === value}
                        onClick={onClick}
                    />
                ))
            }
        </ul>
    )
};
