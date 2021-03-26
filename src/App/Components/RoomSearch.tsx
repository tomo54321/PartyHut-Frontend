import { Search } from "react-feather";

interface RoomSearchProps {
    onQueryChange: Function;
    value: string;
    onSubmit: Function;
}
export const RoomSearch: React.FC<RoomSearchProps> = ({
    onQueryChange,
    value,
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
                placeholder="Search rooms by name or user"
            />
            <button className="px-3">
                <Search />
            </button>
        </div>
    </form>
);