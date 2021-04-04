import { useState } from "react";
import { Loader, Search } from "react-feather";
import { TextInput } from "./TextInput";

interface SearchInputProps {
    onSearch: Function,
    placeholder?: string;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
}
export const SearchInput: React.FC<SearchInputProps> = ({
    onSearch,
    placeholder,
    disabled,
    loading,
    className
}) => {

    const [query, setQuery] = useState("");

    return (
        <form 
        onSubmit={e => {
            onSearch(query);
            e.preventDefault();
        }}
        className={`flex w-full${className ? " " + className : ""}`}>
            <TextInput 
                value={query}
                placeholder={placeholder}
                disabled={loading || disabled}
                className="bg-transparent rounded-r-none"
                onChange={e => setQuery((e.target as HTMLInputElement).value)}
            />
            <button 
                type="submit"
                className="block px-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 border-l-0 rounded-r-md text-gray-300 hover:text-white transition duration-75 focus:outline-none"
            >
                {
                    loading ? 
                        <Loader size={20} className="animate-spin"/>
                    :
                    <Search size={20}/>
                }
            </button>
        </form>
    );
};