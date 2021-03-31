import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { fetchAllPlaylists } from "../Modules/API/Playlists";
import { API } from "../Modules/Axios";
import { userLoggedIn } from "../Redux/Actions/UserActions";
import { LoadingIcon } from "./LoadingIcon";

export const AppContainer: React.FC<{ children: any}> = ({ children }) => {
    
    const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

    // Load in the app settings from the server (mainly if the user is logged in!)
	useEffect(() => {
		API.get("/app")
		.then(async ({ data }) => {
			if(data.user){

                try{
                    const playlists = await fetchAllPlaylists(axios.CancelToken.source());
                    dispatch(userLoggedIn(data.user, playlists));
                } catch (e) {
                    dispatch(userLoggedIn(data.user));
                }

			}
            setLoading(false);
		})
		.catch(e => {
            setLoading(false);
		})
	}, [dispatch]);	

    if(loading) {
        return (
            <div className="relative h-screen w-screen">
                <div className="text-center mx-auto absolute h-5 w-full top-52 left-0 right-0">
                    <LoadingIcon />
                    <span className="block mt-4 opacity-50">Get ready to jam...</span>
                </div>
            </div>
        )
    }

    return children;

}