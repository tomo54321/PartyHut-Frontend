interface ButtonProps {
    title?: string
}
export const PrimaryButton: React.FC<ButtonProps> = ({
    title,
    children
}) => (
    <button className="bg-indigo-500 py-2 px-5 rounded-md font-medium text-sm shadow-sm transition duration-75 hover:bg-indigo-600 disabled:opacity-95 focus:outline-none">
        {title ? title : children}
    </button>
)