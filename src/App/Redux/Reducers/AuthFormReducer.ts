import { CLOSE_AUTH_FORM, SHOW_AUTH_FORM } from "../Actions/AuthFormActions";

export interface AuthFormState {
    shown: boolean
}

export const AuthFormReducer = (_: AuthFormState, {type}: {type: string}): AuthFormState => {
    switch (type) {
        case CLOSE_AUTH_FORM:
            return {
                shown: false
            };
        case SHOW_AUTH_FORM:
            return {
                shown: true
            };
        default:
            return {
                shown: false
            };
    }
}