import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { PartyHut } from "../../api/api";
import { setUserState } from "../../redux/actions/UserActions";
import { ApplicationState } from "../../redux/Store";
import { Error, ErrorResponse } from "../../types/Error";
import { PrimaryButton, SecondaryButton } from "../Button";
import { Form } from "../Form";
import { Modal } from "../Modal";
import { TextInputGroup } from "../TextInputGroup";

interface CreateHutModalProps {
    onClose: Function;
}
export const CreateHutModal: React.FC<CreateHutModalProps> = ({
    onClose
}) => {

    const [hutName, setHutName] = useState("");
    const [errors, setErrors] = useState([] as Error[]);
    const [loading, setLoading] = useState(false);

    const cancelToken = useRef(axios.CancelToken.source());

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state: ApplicationState) => state.user.user!);

    const onCreate = useCallback(async () => {
        setLoading(true);
        cancelToken.current = axios.CancelToken.source();
        try{
            const room = await PartyHut.rooms.create(hutName, cancelToken.current.token);
            // Add the new room to the sidebar
            const newuser = {...user};
            newuser.huts.push(room);
            dispatch(setUserState({ logged_in: true, user: newuser }));
            // Goto the new room!
            history.push(`/room/${room.id}`);

        } catch (e) {
            const error = e as ErrorResponse;
            setErrors(error.errors);
            setLoading(false);
        }
    }, [dispatch, history, user, hutName]);

    useEffect(() => {
        return () => {
            cancelToken.current.cancel();
        }
    }, []);

    return (
        <Modal
            title="Create a Hut"
            onClose={onClose}
        >
            <Form onSubmit={onCreate} errors={errors}>
                <TextInputGroup
                    title="Hut Name"
                    placeholder="The Party Hut"
                    onTextChange={(text: string) => setHutName(text)}
                    value={hutName}
                    required
                />
                <div className="flex space-x-2">
                    <SecondaryButton className="block w-full" title="Cancel" disabled={loading} onClick={() => onClose()} />
                    <PrimaryButton type="submit" className="block w-full" disabled={loading} loading={loading} title="Create Hut" />
                </div>
            </Form>
        </Modal>
    )
};