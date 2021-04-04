import { Disc, PlusCircle } from "react-feather";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../redux/Store";
import { NavLink } from "./NavLink";

interface MyHutsProps { };
export const MyHuts: React.FC<MyHutsProps> = () => {

    const isLoggedIn = useSelector((state: ApplicationState) => state.user.logged_in);
    const userHuts = useSelector((state: ApplicationState) => { return state.user.logged_in ? state.user.user!.huts : []});
    
    if (!isLoggedIn) { return null; }
    

    const huts = userHuts.map((_: any, index: number) => (
        <li key={"hut-" + index}>
            <NavLink
                to={"/room/abcd"}
                title="The Hut"
                Icon={Disc}
            />
        </li>
    ));

    return (
        <ul className="space-y-2 max-h-24 overflow-auto md:max-h-60 scrollbar scrollbar-thumb-gray-700 scrollbar-thin scrollbar-track-gray-900">
            <li className="sticky top-0 bg-gray-800 uppercase font-medium text-sm text-gray-400">My Huts</li>
            { userHuts.length < 1 ?
                <li>
                    <NavLink
                        to={"/"}
                        title="Create Hut"
                        Icon={PlusCircle}
                    />
                </li>
                : huts}
        </ul>
    );

};