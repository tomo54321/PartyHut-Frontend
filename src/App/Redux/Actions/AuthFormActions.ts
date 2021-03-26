export const SHOW_AUTH_FORM = "authform:showForm";
export const showAuthForm = () => {
    return {
        type: SHOW_AUTH_FORM
    }
}

export const CLOSE_AUTH_FORM = "authform:closeForm";
export const closeAuthForm = () => {
    return {
        type: CLOSE_AUTH_FORM
    }
}