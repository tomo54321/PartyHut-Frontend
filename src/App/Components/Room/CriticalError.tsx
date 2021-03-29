import { AlertTriangle } from "react-feather";
import { APIErrorResponse } from "../../Modules/API/d.types";
import { PrimaryButton } from "../Buttons";

export const CriticalRoomError: React.FC<{ errors: APIErrorResponse }> = ({
    errors
}) => (
    <div className="relative h-full w-full">
        <div className="text-center mx-auto absolute h-5 w-full max-w-sm top-52 left-0 right-0">
            <AlertTriangle className="block mx-auto text-red-500" size={46} />
            <span className="block my-3 text-red-500">{errors.errors[0].msg}</span>
            <PrimaryButton type="link" href="/" title="Go Home" />
        </div>
    </div>
)