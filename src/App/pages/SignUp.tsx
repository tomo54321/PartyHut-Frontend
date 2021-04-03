import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthBox } from "../components/AuthBox";
import { PrimaryButton } from "../components/Button";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { TextInputGroup } from "../components/TextInputGroup";

import axios from "axios";
import { PartyHut } from "../api/api";
import { PartyHutAPI } from "../types/api/ErrorResponse";

interface SignUpPageProps { }
export const SignUpPage: React.FC<SignUpPageProps> = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [tosAgreed, setTosAgreed] = useState(false);
    const [errors, setErrors] = useState([] as PartyHutAPI.Error[]);

    const cancelToken = useRef(axios.CancelToken.source());
    const history = useHistory();

    const onFormSubmit = useCallback(async () => {
        setLoading(true);
        cancelToken.current = axios.CancelToken.source();
        
        try {
            await PartyHut.auth.signup(username, email, password, cancelToken.current.token);
            
            // Set variable to be able to display success message.
            (window as any).sign_up_success = true;
            history.push("/login");

        } catch (e: unknown) {
            const error = e as PartyHutAPI.ErrorResponse;
            setErrors(error.errors);
            setLoading(false);
        }

    }, [history, username, email, password]);

    // Cancel the request when this unmounts.
    useEffect(() => {
        return () => {
            cancelToken.current.cancel();
        }
    }, []);

    return (
        <Layout className="h-full flex flex-col justify-center">
            <AuthBox>
                <Form errors={errors} onSubmit={onFormSubmit}>
                    <TextInputGroup
                        type="text"
                        title="Username"
                        value={username}
                        disabled={loading}
                        onTextChange={(text: string) => setUsername(text)}
                        required
                    />
                    <TextInputGroup
                        type="email"
                        title="Email Address"
                        value={email}
                        disabled={loading}
                        onTextChange={(text: string) => setEmail(text)}
                        required
                    />
                    <TextInputGroup
                        type="password"
                        title="Password"
                        value={password}
                        disabled={loading}
                        onTextChange={(text: string) => setPassword(text)}
                        required
                    />
                    <div className="mt-5">
                        <label>
                            <input 
                                type="checkbox" 
                                onChange={() => setTosAgreed(agree => !agree)}
                                checked={tosAgreed}
                            />{' '}
                            You agree to PartyHut's terms and conditions and privacy policy.
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <PrimaryButton type="submit" title="Create account" loading={loading} disabled={loading || !tosAgreed}/>
                        <Link
                            to="/login"
                            className="text-sm opacity-50 hover:opacity-100 transition-opacity duration-150"
                        >
                            Already have an account?
                        </Link>
                    </div>
                </Form>
            </AuthBox>
        </Layout>
    );
};