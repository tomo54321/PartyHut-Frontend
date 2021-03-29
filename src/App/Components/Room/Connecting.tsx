import { LoadingIcon } from "../LoadingIcon";

export const ConnectingToRoom: React.FC<{}> = () => (
    <div className="relative h-full w-full">
        <div className="text-center mx-auto absolute h-5 w-full top-52 left-0 right-0">
            <LoadingIcon />
            <span className="block mt-4 opacity-50">Getting ready to dance</span>
        </div>
    </div>
)