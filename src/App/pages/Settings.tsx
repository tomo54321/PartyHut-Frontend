import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { PartyHut } from "../api/api";
import { DangerButton, PrimaryButton } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import { Layout } from "../components/Layout";
import { ChangePasswordModal } from "../components/Modals/ChangePassword";
import { SettingsGrid } from "../components/SettingsGrid";
import { SettingsGridCol } from "../components/SettingsGridCol";
import { TextInput } from "../components/TextInput";
import { Error, ErrorResponse } from "../types/Error";
interface SettingsPageProps { }
export const SettingsPage: React.FC<SettingsPageProps> = () => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const [errors, setErrors] = useState([] as Error[]);
    const [success, setSuccess] = useState(false);

    const [showChangePaswordModal, setShowChangePasswordModal] = useState(false);

    const cancelToken = useRef(axios.CancelToken.source());

    const saveBasicSettings = useCallback(async () => {
        setErrors([]);
        setSuccess(false);
        setLoading(true);
        cancelToken.current = axios.CancelToken.source();
        try {
            await PartyHut.account.update(username, email, cancelToken.current.token)
            setSuccess(true);
            setLoading(false);
        } catch (e) {
            const error = e as ErrorResponse;
            setErrors(error.errors);
            setLoading(false);
        }
    }, [email, username]);

    useEffect(() => {
        PartyHut.account.get(cancelToken.current.token)
        .then(data => {
            setLoading(false);
            setUsername(data.username);
            setEmail(data.email);
        })
        .catch(e => {
            const error = e as ErrorResponse;
            setErrors(error.errors);
        });

        return () => {
            cancelToken.current.cancel();
        }
    }, []);

    return (
        <Layout title="Account Settings">
            {
                errors.length > 0 ? <ErrorMessage errors={errors}/> : 
                success ? <p className="text-green-500 mb-3">Your changes have been saved successfully.</p>
                : null
            }
            <SettingsGrid>
                <SettingsGridCol title="Avatar">
                    <div className="flex space-x-2 items-center">
                        <img src="http://placehold.it/75x75" className="rounded-full" alt="tomo54321" />
                        <div>
                            <PrimaryButton title="Upload" disabled={loading}/>
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
                            disabled={loading}
                    />
                </SettingsGridCol>
                <SettingsGridCol title="Email Address">
                    <TextInput
                        type="email"
                        value={email}
                        onChange={e => setEmail((e.target as HTMLInputElement).value)}
                        required
                        placeholder="Email Address"
                        disabled={loading}                        
                    />
                </SettingsGridCol>
                <SettingsGridCol title="Password">
                    <PrimaryButton title="Change Password" disabled={loading} onClick={() => setShowChangePasswordModal(true)}/>
                </SettingsGridCol>
                <SettingsGridCol title="Two Factor Authentication">
                    <p className="text-sm opacity-75">Two Factor Authentication is not enabled on your account, we recommend this setting as it provides an extra security layer.</p>
                    <PrimaryButton title="Enable Two Factor Authentication" disabled={loading} />
                </SettingsGridCol>
                <SettingsGridCol title="Save your settings" className="col-span-2">
                    <div className="flex space-x-2">
                        <PrimaryButton title="Save Changes" onClick={saveBasicSettings} disabled={loading} loading={loading} className="w-full" />
                        <DangerButton title="Delete My Account" disabled={loading} className="w-full" />
                    </div>
                </SettingsGridCol>
            </SettingsGrid>

            {showChangePaswordModal ? <ChangePasswordModal onClose={() => setShowChangePasswordModal(false)} /> : null}
        </Layout>
    );
};