import { useCallback, useState } from "react";
import { X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../Components/Modal";
import { CLOSE_AUTH_FORM } from "../../../Redux/Actions/AuthFormActions";
import { ApplicationState } from "../../../Redux/Store";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

export const AUTH_POPUP_PAGES = {
    LOGIN: 1,
    SIGN_UP: 2,
    FORGOT_PASSWORD: 3
};

export const AuthPopup = () => {

    const showForm = useSelector((state: ApplicationState) => state.authForm.shown);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(AUTH_POPUP_PAGES.LOGIN);


    const onCloseForm = useCallback(() => {
        dispatch({
            type: CLOSE_AUTH_FORM
        })
    }, [dispatch]);

    if(!showForm){
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
