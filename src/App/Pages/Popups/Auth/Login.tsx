import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton, SecondaryButton } from "../../../Components/Buttons";
import { FormGroup } from "../../../Components/FormGroup";
import { LoadingIcon } from "../../../Components/LoadingIcon";
import { onLogin } from "../../../Modules/API/Authentcation";
import { APIErrorResponse, APIUserResponse } from "../../../Modules/API/d.types";
import { userLoggedIn } from "../../../Redux/Actions/UserActions";
import { AUTH_POPUP_PAGES } from './Popup';

export const Login: React.FC<{changePage: Function}> = ({
    changePage
}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const [errors, setErrors] = useState(null as APIErrorResponse | null);

    const cancelToken = useRef(axios.CancelToken.source());
    const dispatch = useDispatch();

    const onLoginSubmit = useCallback(async () => {
        setIsLoading(true);
        try{
            const user = await onLogin(email, password, cancelToken.current);
            dispatch(userLoggedIn(user as APIUserResponse));

        } catch (e) {
            setErrors(e as APIErrorResponse);
            cancelToken.current = axios.CancelToken.source();
            setIsLoading(false);
        }
    }, [email, password, dispatch]);

    useEffect(() => {
        return () => {
            cancelToken.current.cancel();
        }
    }, [])

    return (
        <>
        <h1 className="text-2xl text-center font-bold">Log In</h1>
        <form 
            action=""
            method="POST"
            onSubmit={e => {
                onLoginSubmit();
                e.preventDefault();
            }}>

            {
                errors === null ? null :
                <p className="text-red-500 my-3">{(errors as APIErrorResponse).errors[0].msg}</p>
            }

            <FormGroup 
                type="email"
                name="email"
                title="Email Address"
                required
                value={email}
                disabled={isLoading}
                onTextChange={(text: string) => setEmail(text)}
            />
            <FormGroup 
                type="password"
                name="password"
                title="Password"
                required
                value={password}
                disabled={isLoading}
                onTextChange={(text: string) => setPassword(text)}
            />
            <div className="mt-5 space-y-2">
                <PrimaryButton 
                    disabled={isLoading} 
                    type="submit"
                >
                    Log In {isLoading ? <LoadingIcon /> : null}
                </PrimaryButton>
                <SecondaryButton 
                    disabled={isLoading}
                    type="button" 
                    title="Create an account" 
                    sm 
                    onClick={e => {
                        changePage(AUTH_POPUP_PAGES.SIGN_UP);
                    }}
                />
            </div>
        </form>
        </>
    )

};