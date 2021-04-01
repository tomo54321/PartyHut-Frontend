import { Volume, Volume1, Volume2, VolumeX } from "react-feather"
import { RangeSlider } from "../RangeSlider";

interface BottomPlayerVolumeProps {
    value: number;
    onChange: Function;
}
export const BottomPlayerVolume: React.FC<BottomPlayerVolumeProps> = ({
    value,
    onChange
}) => {
    return (
        <div className="flex items-center space-x-2 lg:space-x-3">
            <button className="focus:outline-none" onClick={() => onChange(0)}>
                {
                    value > .65 ?
                    <Volume2 /> :
                    value > .35 ?
                    <Volume1 /> :
                    value > .0 ?
                    <Volume /> :
                    <VolumeX />
                }
            </button>

            <div className="w-20 lg:w-28">
                <RangeSlider 
                    value={value}
                    onChange={(vol: number) => {
                        onChange(vol);
                    }}
                />
            </div>
        </div>
    )
};