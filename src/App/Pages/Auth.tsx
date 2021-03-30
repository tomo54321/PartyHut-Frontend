import { useState } from "react";
import { StandardLayout } from "../Components/Layout";
import { Login } from "./Popups/Auth/Login";
import { SignUp } from "./Popups/Auth/SignUp";

export const AUTH_POPUP_PAGES = {
    LOGIN: 1,
    SIGN_UP: 2,
    FORGOT_PASSWORD: 3
};

export const Auth: React.FC<{}> = () => {

    const [currentPage, setCurrentPage] = useState(AUTH_POPUP_PAGES.LOGIN);

    return(
        <StandardLayout>
            <div className="flex items-center">
                <div className="hidden md:block md:w-1/2 lg:w-2/6 pr-2">
                    <h1 className="text-3xl text-indigo-400 font-semibold mb-2">Why make an account?</h1>
                    <ul className="pl-4">
                        <li className="list-disc">Create as many playlists as you like</li>
                        <li className="list-disc">Join rooms, chat and listen to music</li>
                        <li className="list-disc">Create your own rooms</li>
                        <li className="list-disc">Discover new music</li>
                    </ul>
                    <span className="block text-indigo-200 mt-2">All that for free... forever!</span>
                </div>
                <div className="w-full md:w-1/2 lg:w-4/6 pl-2">
                    {currentPage === AUTH_POPUP_PAGES.LOGIN ? <Login changePage={setCurrentPage}/> : null}
                    {currentPage === AUTH_POPUP_PAGES.SIGN_UP ? <SignUp changePage={setCurrentPage}/> : null}
                </div>
            </div>

            <div className="text-center text-gray-600 text-xs mt-10">&copy; {(new Date()).getFullYear()} PartyHut. All Rights Reserved.</div>
        </StandardLayout>
    )
};
