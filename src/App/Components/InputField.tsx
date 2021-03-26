import React from "react";

interface InputFieldProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    onTextChange?: Function
}
export const InputField: React.FC<InputFieldProps> = ({
    className,
    onTextChange,
    ...props
}) => (
    <input
        {...props}
        onChange={e => {
            if(typeof onTextChange === "function"){
                onTextChange(e.target.value as string);
            }
            if(typeof props.onChange === "function"){
                props.onChange(e);
            }
        }}
        className={[className, "block w-full p-3 bg-gray-900 focus:bg-gray-800 border border-transparent focus:border-gray-900 focus:outline-none transition duration-150 disabled:opacity-50"].join(" ")}
    />
);