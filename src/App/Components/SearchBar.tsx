import { Search } from "react-feather";
import { LoadingIcon } from "./LoadingIcon";

interface SearchBarProps {
    onQueryChange: Function;
    value: string;
    disabled?: boolean;
    placeholder?: string;
    isBusy?: boolean;
    onSubmit: Function;
}
export const SearchBar: React.FC<SearchBarProps> = ({
    onQueryChange,
    value,
    disabled,
    isBusy,
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
                disabled={disabled}
                onChange={e => onQueryChange(e.target.value)}
                className="block w-full bg-transparent p-3 focus:outline-none"
                placeholder={placeholder}
            />
            <button disabled={disabled} className="px-3">
                {
                    isBusy ? <LoadingIcon /> :
                    <Search />
                }
            </button>
        </div>
    </form>
);
SearchBar.defaultProps = {
    disabled: false,
    isBusy: false
}