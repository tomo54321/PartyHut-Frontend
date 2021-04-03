import { Error } from "../types/Error";
import { ErrorMessage } from "./ErrorMessage";

interface FormProps {
    onSubmit: Function;
    errors: Error[]
}
export const Form: React.FC<FormProps> = ({
    onSubmit,
    errors,
    children
}) => (
    <form
        action=""
        method="POST"
        className="space-y-5"
        onSubmit={e => {
            onSubmit();
            e.preventDefault();
        }}
    >
        {
            errors.length > 0 ? <ErrorMessage errors={errors}/> : null
        }
        {children}
    </form>
);