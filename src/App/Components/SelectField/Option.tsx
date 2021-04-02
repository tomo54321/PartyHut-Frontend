interface SelectFieldOptionProps {
    title: string;
    value: string | number;
    disabled?: boolean;
    selected?: boolean;
    onClick: Function;
}
export const SelectFieldOption: React.FC<SelectFieldOptionProps> = ({
    onClick,
    value,
    title,
    disabled,
    selected
}) => (
    <li>
        <button 
            className={`block w-full text-left p-2 font-medium ${selected ? "bg-indigo-500" : disabled ? "opacity-75" : "hover:bg-indigo-500"} transition duration-150 rounded-md focus:outline-none`}
            disabled={disabled}
            onClick={() => {
                if(!selected){
                    onClick(value)
                }
            }}
        >
            {title}
        </button>
    </li>
)