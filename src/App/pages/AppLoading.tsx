import { AuthBox } from "../components/AuthBox";
import { Spinner } from "../components/Spinner";

interface AppLoadingProps {}
export const AppLoading: React.FC<AppLoadingProps> = () => (
    <div className="w-screen h-screen flex flex-col justify-center align-center"> 
        <AuthBox>
            <div className="h-36 w-full relative">
                <Spinner className="block absolute m-auto ml-auto top-0 left-0 right-0 bottom-0 h-4 w-4" />
            </div>
        </AuthBox>
    </div>
);