import Slider from 'rc-slider';

interface RangeSliderProps {
    value: number;
    onChange?: Function;
}
export const RangeSlider: React.FC<RangeSliderProps> = ({
    value,
    onChange
}) => (
    <Slider 
        value={value * 100}
        className="w-full h-1 relative rounded-full bg-gray-900"
    
        trackStyle={{
            background: "#6366f1",
            borderRadius: 10,
            height: "100%"
        }}

        handleStyle={{
            position: "absolute",
            top: 0,
            bottom: 0,
            margin: "auto", 
            background: "#fff",
            height: 10,
            width: 10,
            borderRadius: "50%",
            outline: "none",
            opacity: onChange === undefined ? 0 : 100
        }}
        
        onChange={val =>{
            if(onChange !== undefined){
                onChange(val / 100)
            }
        }}
    />
);