import React, { useState } from "react";
import { DangerButton, PrimaryButton } from "../components/Button";
import { Layout } from "../components/Layout";
import { ChangePasswordModal } from "../components/Modals/ChangePassword";
import { SettingsGrid } from "../components/SettingsGrid";
import { SettingsGridCol } from "../components/SettingsGridCol";
import { TextInput } from "../components/TextInput";
interface SettingsPageProps { }
export const SettingsPage: React.FC<SettingsPageProps> = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const [showChangePaswordModal, setShowChangePasswordModal] = useState(false);

    return (
        <Layout title="Account Settings">
            <SettingsGrid>
                <SettingsGridCol title="Avatar">
                    <div className="flex space-x-2 items-center">
                        <img src="http://placehold.it/75x75" className="rounded-full" alt="tomo54321" />
                        <div>
                            <PrimaryButton title="Upload" />
                            <p className="text-xs mt-2 opacity-75">Images must be no larger than 1mb and either PNG or JPG</p>
                        </div>
                    </div>
                </SettingsGridCol>
                <SettingsGridCol title="Username">
                    <TextInput
                        required
                        value={username}
                        onChange={e => setUsername((e.target as HTMLInputElement).value)}
                        placeholder="Username"
                    />
                </SettingsGridCol>
                <SettingsGridCol title="Email Address">
                    <TextInput
                        type="email"
                        value={email}
                        onChange={e => setEmail((e.target as HTMLInputElement).value)}
                        required
                        placeholder="Email Address"
                    />
                </SettingsGridCol>
                <SettingsGridCol title="Password">
                    <PrimaryButton title="Change Password" onClick={() => setShowChangePasswordModal(true)}/>
                </SettingsGridCol>
                <SettingsGridCol title="Two Factor Authentication">
                    <p className="text-sm opacity-75">Two Factor Authentication is not enabled on your account, we recommend this setting as it provides an extra security layer.</p>
                    <PrimaryButton title="Enable Two Factor Authentication" />
                </SettingsGridCol>
                <SettingsGridCol title="Save your settings" className="col-span-2">
                    <div className="flex space-x-2">
                        <PrimaryButton title="Save Changes" className="w-full" />
                        <DangerButton title="Delete My Account" className="w-full" />
                    </div>
                </SettingsGridCol>
            </SettingsGrid>

            {showChangePaswordModal ? <ChangePasswordModal onClose={() => setShowChangePasswordModal(false)} /> : null}
        </Layout>
    );
};