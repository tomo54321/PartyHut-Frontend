import { useCallback, useEffect, useRef, useState } from "react";
import { Volume, Volume1, Volume2, VolumeX } from "react-feather";

export const VolumeSlider: React.FC<{ value: number; onChange: Function }> = ({
    value,
    onChange
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const sliderEl = useRef(null as HTMLDivElement | null);
    const documentClicked = useCallback(e => {
        if (sliderEl.current === null || sliderEl.current!.contains(e.target)) {
            return;
        }
        setIsOpen(false);
    }, []);

    useEffect(() => {
        window.addEventListener("click", documentClicked);
        return () => {
            window.removeEventListener("click", documentClicked);
        };
    }, [documentClicked]);

    return (
        <div
            className="relative"
            style={{
                height: 24,
                width: 24
            }}
            ref={ref => sliderEl.current = ref}
        >
            <button
                className="focus:outline-none"
                onClick={() => setIsOpen(show => !show)}>
                {
                    value > 66 ? <Volume2 /> :
                        value > 33 ? <Volume1 /> :
                            value > 0 ? <Volume /> :
                                <VolumeX />
                }
            </button>
            {
                isOpen ?
                    <div className="absolute top-10 right-0 z-10 bg-gray-700 shadow-sm p-5 rounded-md">
                        <input
                            type="range"
                            value={value}
                            onChange={e => {
                                if (!isNaN(parseInt(e.target.value))) {
                                    onChange(parseInt(e.target.value))
                                }
                            }}
                        />
                    </div>
                    : null
            }
        </div>
    )
};