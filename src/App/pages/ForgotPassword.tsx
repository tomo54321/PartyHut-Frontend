import { useState } from "react";
import { AuthBox } from "../components/AuthBox";
import { PrimaryButton } from "../components/Button";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { TextInputGroup } from "../components/TextInputGroup";
import { Error } from "../types/Error";

interface ForgotPasswordPageProps { }
export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = () => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([] as Error[]);

    return (
        <Layout className="h-full flex flex-col justify-center">
            <AuthBox>
                <Form errors={errors} onSubmit={() => { }}>
                    <TextInputGroup
                        type="email"
                        title="Email Address"
                        value={email}
                        onTextChange={(text: string) => setEmail(text)}
                        required
                    />
                    <PrimaryButton title="Reset Password" />
                </Form>
            </AuthBox>
        </Layout>
    );
};