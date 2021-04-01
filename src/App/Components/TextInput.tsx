import { ChangeEventHandler } from "react";

interface TextInputProps {
    type?: "text" | "email" | "password";
    value?: string;
    onChange?: ChangeEventHandler;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}
export const TextInput: React.FC<TextInputProps> = ({
    type,
    value,
    onChange,
    placeholder,
    required,
    disabled,
    className
}) => (
    <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        value={value}
        onChange={onChange}
        className={`p-2 bg-gray-800 border border-gray-700 rounded-lg font-medium text-white block w-full ${className ? " " + className : ""} focus:border-gray-600 focus:outline-none`}
    />
);
TextInput.defaultProps = {
    type: "text"
}