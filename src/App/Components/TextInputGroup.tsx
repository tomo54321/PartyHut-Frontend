import { TextInput } from "./TextInput";

interface TextInputGroupProps {
    type?: "text" | "email" | "password"
    value: string;
    onTextChange: Function;
    title: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
}
export const TextInputGroup: React.FC<TextInputGroupProps> = ({
    type,
    value,
    onTextChange,
    placeholder,
    title,
    required,
    disabled
}) => (
    <div>
        <span className="block mb-2 text-medium text-sm">{title}</span>
        <TextInput
            type={type || "text"}
            placeholder={placeholder || title}
            className="bg-gray-900"
            onChange={e => onTextChange((e.target as HTMLInputElement).value)}
            value={value}
            required={required}
            disabled={disabled}
        />
    </div>
)