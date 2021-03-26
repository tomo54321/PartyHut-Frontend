import { InputField } from "./InputField";

interface FormGroupProps {
    type?: string;
    name: string;
    title: string;
    value: string;
    onTextChange: Function;
    error?: boolean;
    disabled?: boolean;
    required?: boolean;
};
export const FormGroup: React.FC<FormGroupProps> = ({
    type,
    name,
    title,
    value,
    onTextChange,
    error,
    disabled,
    required
}) => (
    <div className="mb-2">
        <label htmlFor={name} className="block mb-2">{title}</label>
        <InputField
            id={name}
            type={type}
            name={name}
            placeholder={title}
            disabled={disabled}
            onTextChange={onTextChange}
            value={value}
            required={required}
            className={error ? "border-red-500" : ""}
        />
    </div>
);

FormGroup.defaultProps = {
    type: "text",
    required: false,
    error: false,
    disabled: false
}