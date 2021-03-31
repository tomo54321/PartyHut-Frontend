import { SecondaryButton } from "../Buttons";
import { InputField } from "../InputField";
import { Modal } from "../Modal";

export const ShareURL: React.FC<{ name: string; onClose: Function; }> = ({
    name,
    onClose
}) => (
    <Modal>
        <h2 className="font-semibold text-xl mb-5">Share {name}</h2>
        <p className="text-sm">Share the URL below to your friends to instantly join {name}</p>
        <InputField 
            readOnly
            value={window.location.href}
            className="my-5"
            onFocus={(e) => {
                (e.target as any).select()
            }}
        />
        <SecondaryButton type="button" onClick={() => onClose()} title="Close" />
    </Modal>
);