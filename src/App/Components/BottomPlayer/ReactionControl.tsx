import { Heart, Meh, PlusCircle } from "react-feather";
import { ReactionControlButton } from "./ReactionControlButton";

interface ReactionControlProps {
    reaction: null | "love" | "meh"
}
export const BottomPlayerReactionControl: React.FC<ReactionControlProps> = ({
    reaction
}) => (
    <div className="flex space-x-2 lg:space-x-5">
        <ReactionControlButton 
            Icon={Heart}
            activeClass="text-pink-500"
            isActive={reaction === "love"}
            title="Love"
        />
        <ReactionControlButton 
            Icon={PlusCircle}
            title="Grab Song"
        />
        <ReactionControlButton 
            Icon={Meh}
            activeClass="text-red-500"
            isActive={reaction === "meh"}
            title="Don't Like"
        />
    </div>
)