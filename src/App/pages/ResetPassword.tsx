import { useState } from "react";
import { AuthBox } from "../components/AuthBox";
import { PrimaryButton } from "../components/Button";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { TextInputGroup } from "../components/TextInputGroup";
import { Error } from "../types/Error";

interface ResetPasswordPageProps { }
export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = () => {
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([] as Error[]);

    return (
        <Layout className="h-full flex flex-col justify-center">
            <AuthBox>
                <Form errors={errors} onSubmit={() => { }}>
                    <TextInputGroup
                        type="password"
                        title="Create Password"
                        value={password}
                        onTextChange={(text: string) => setPassword(text)}
                        required
                    />
                    <TextInputGroup
                        type="password"
                        title="Confirm Password"
                        value={confirm_password}
                        onTextChange={(text: string) => setConfirmPassword(text)}
                        required
                    />
                    <PrimaryButton title="Reset Password" />
                </Form>
            </AuthBox>
        </Layout>
    );
};