import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { PrimaryButton, SecondaryButton } from "../../../Components/Buttons";
import { FormGroup } from "../../../Components/FormGroup";
import { LoadingIcon } from "../../../Components/LoadingIcon";
import { onSignUp } from "../../../Modules/API/Authentcation";
import { APIErrorResponse } from "../../../Modules/API/d.types";
import { AUTH_POPUP_PAGES } from "../../Auth";

export const SignUp: React.FC<{changePage: Function}> = ({
    changePage
}) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [tosAgree, setTosAgree] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState(null as APIErrorResponse | null);

    const cancelToken = useRef(axios.CancelToken.source());

    const onSignUpSubmit = useCallback(async () => {
        setIsLoading(true);
        setErrors(null);

        try{
            await onSignUp(username, email, password, confirm_password, cancelToken.current);
            changePage(AUTH_POPUP_PAGES.LOGIN);
        } catch (e){
            setErrors(e as APIErrorResponse);
            cancelToken.current = axios.CancelToken.source();
            setIsLoading(false);
        }
    }, [email, password, confirm_password, username, changePage]);

    useEffect(() => {
        return () => {
            cancelToken.current.cancel();
        }
    }, []);

    return (
        <>
        <h1 className="text-2xl text-center font-bold">Sign Up</h1>
        <form 
            action=""
            method="POST"
            onSubmit={e => {
                onSignUpSubmit();
                e.preventDefault();
            }}>

            {
                errors === null ? null :
                <p className="text-red-500 my-3">{(errors as APIErrorResponse).errors[0].msg}</p>
            }
                
            <FormGroup 
                name="username"
                title="Create Username"
                required
                value={username}
                disabled={isLoading}
                onTextChange={(text: string) => setUsername(text)}
            />

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
            
            <FormGroup 
                type="password"
                name="password_confirmation"
                title="Confirm Password"
                required
                value={confirm_password}
                disabled={isLoading}
                onTextChange={(text: string) => setConfirmPassword(text)}
            />

            <label>
                <input type="checkbox" checked={tosAgree} disabled={isLoading} onChange={e => setTosAgree(a => !a)}/>
                {' '}
                I have read and agree to the terms and conditions and our privacy policy. I am also at least 13 years of age.
            </label>

            <div className="mt-5 space-y-2">
                <PrimaryButton 
                    disabled={!tosAgree || isLoading} 
                    type="submit"
                >
                    Sign Up {isLoading ? <LoadingIcon /> : null}
                </PrimaryButton>

                <SecondaryButton 
                    disabled={isLoading}
                    type="button" 
                    title="Already have an account" 
                    sm 
                    onClick={e => {
                        changePage(AUTH_POPUP_PAGES.LOGIN);
                    }}
                />
            </div>
        </form>
        </>
    )

};