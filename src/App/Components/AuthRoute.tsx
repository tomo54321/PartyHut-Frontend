import { useSelector } from "react-redux";
import { Route, RouteProps } from "react-router";
import { Auth } from "../Pages/Auth";
import { ApplicationState } from "../Redux/Store";

interface AuthRouteProps extends RouteProps {}
export const AuthRoute: React.FC<AuthRouteProps> = ({
    component,
    render,
    ...props
}) => {

    const isLoggedIn = useSelector((state: ApplicationState) => state.user.logged_in);

    if(!isLoggedIn){
        return <Route {...props} component={Auth} />
    }

    return (
        <Route {...props} render={render} component={component}/>
    );

};