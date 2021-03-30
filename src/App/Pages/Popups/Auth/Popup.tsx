import { useCallback, useState } from "react";
import { X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../Components/Modal";
import { closeAuthForm } from "../../../Redux/Actions/AuthFormActions";
import { ApplicationState } from "../../../Redux/Store";
import { AUTH_POPUP_PAGES } from "../../Auth";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

export const AuthPopup = () => {

    const showForm = useSelector((state: ApplicationState) => state.authForm.shown);
    const isLoggedIn = useSelector((state: ApplicationState) => state.user.logged_in);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(AUTH_POPUP_PAGES.LOGIN);


    const onCloseForm = useCallback(() => {
        dispatch(closeAuthForm())
    }, [dispatch]);

    if(!showForm || isLoggedIn){
        return null;
    }

    return(
        <Modal>
            <div className="text-right">
                <button type="button" className="focus:outline-none" onClick={e => { 
                    onCloseForm();
                    e.preventDefault();
                }}>
                    <X />
                </button>
            </div>
            {currentPage === AUTH_POPUP_PAGES.LOGIN ? <Login changePage={setCurrentPage}/> : null}
            {currentPage === AUTH_POPUP_PAGES.SIGN_UP ? <SignUp changePage={setCurrentPage}/> : null}
        </Modal>

    )
};
