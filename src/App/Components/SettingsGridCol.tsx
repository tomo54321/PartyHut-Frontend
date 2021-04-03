interface SettingsGridColProps {
    className?: string;
    title: string;
}
export const SettingsGridCol: React.FC<SettingsGridColProps> = ({
    className,
    children,
    title
}) => (
    <div className={"space-y-2" + (className ? " " + className : "")}>
        <span className="block font-medium">{title}</span>
        {children}
    </div>
);