import { Error } from "../types/Error";

interface ErrorMessageProps {
    errors: Error[];
    showAll?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
    errors,
    showAll
}) => {

    return (
        <div className="my-3">
            <p className="text-red-500">{ showAll ? "The following errors occured:" : <> <b>Error: </b> {errors[0].msg} </> }</p>
            {
                showAll ? 
                <ul className="pl-3">
                    {errors.map((err, index) => (
                        <li className="list-item text-red-500" key={"error" + index}>{err.msg}</li>
                    ))}
                </ul>
                : null
            }
        </div>
    )
};
ErrorMessage.defaultProps = {
    showAll: false
}