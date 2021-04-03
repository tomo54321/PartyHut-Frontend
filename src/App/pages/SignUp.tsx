import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthBox } from "../components/AuthBox";
import { PrimaryButton } from "../components/Button";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { TextInputGroup } from "../components/TextInputGroup";
import { Error } from "../types/Error";

interface SignUpPageProps { }
export const SignUpPage: React.FC<SignUpPageProps> = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [tosAgreed, setTosAgreed] = useState(false);
    const [errors, setErrors] = useState([] as Error[]);

    return (
        <Layout className="h-full flex flex-col justify-center">
            <AuthBox>
                <Form errors={errors} onSubmit={() => { }}>
                    <TextInputGroup
                        type="text"
                        title="Username"
                        value={username}
                        onTextChange={(text: string) => setUsername(text)}
                        required
                    />
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
                        <PrimaryButton title="Create account" />
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