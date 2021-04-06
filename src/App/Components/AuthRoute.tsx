import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import { ApplicationState } from "../redux/Store";

interface AuthRouteProps extends RouteProps{}
export const AuthRoute: React.FC<AuthRouteProps> = ({
    component,
    render,
    ...props
}) => {

    const loggedIn = useSelector((state: ApplicationState) => state.user.logged_in);

    if(!loggedIn) {
        return <Route {...props} render={() => <Redirect to="/login" /> } />
    }

    return <Route {...props} render={render} component={component} />

};