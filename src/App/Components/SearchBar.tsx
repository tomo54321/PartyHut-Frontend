import { Search } from "react-feather";

interface SearchBarProps {
    onQueryChange: Function;
    value: string;
    placeholder?: string;
    onSubmit: Function;
}
export const SearchBar: React.FC<SearchBarProps> = ({
    onQueryChange,
    value,
    placeholder,
    onSubmit
}) => (

    <form
        action=""
        method="GET"
        onSubmit={e => {
            onSubmit();
            e.preventDefault();
        }}>
        <div className="flex bg-gray-900 rounded-md overflow-hidden">
            <input
                type="text"
                name="q"
                value={value}
                onChange={e => onQueryChange(e.target.value)}
                className="block w-full bg-transparent p-3 focus:outline-none"
                placeholder={placeholder}
            />
            <button className="px-3">
                <Search />
            </button>
        </div>
    </form>
);