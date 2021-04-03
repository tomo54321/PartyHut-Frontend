import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthBox } from "../components/AuthBox";
import { PrimaryButton } from "../components/Button";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { TextInputGroup } from "../components/TextInputGroup";
import { Error } from "../types/Error";

interface LoginPageProps { }
export const LoginPage: React.FC<LoginPageProps> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signupSuccess] = useState((window as any).sign_up_success || false);

    const cancelToken = useRef(axios.CancelToken.source());
    const [errors, setErrors] = useState([] as Error[]);

    useEffect(() => {
        if((window as any).sign_up_success){
            (window as any).sign_up_success = undefined;
        }
        return () => {
            cancelToken.current.cancel();
        };
    }, []);

    return (
        <Layout className="h-full flex flex-col justify-center">
            <AuthBox>
                <Form errors={errors} onSubmit={() => { }}>
                    {signupSuccess ? <p className="text-green-700">Welcome to PartyHut, your account has been created and you may now sign in.</p> : null}
                    <TextInputGroup
                        type="email"
                        title="Email Address"
                        value={email}
                        onTextChange={(text: string) => setEmail(text)}
                        required
                    />
                    <TextInputGroup
                        type="password"
                        title="Password"
                        value={password}
                        onTextChange={(text: string) => setPassword(text)}
                        required
                    />
                    <div className="flex items-center space-x-2">
                        <PrimaryButton title="Login" />
                        <Link
                            to="/forgot-password"
                            className="text-sm opacity-50 hover:opacity-100 transition-opacity duration-150"
                        >
                            Forgotten your password?
                            </Link>
                    </div>
                </Form>
            </AuthBox>
        </Layout>
    );
};