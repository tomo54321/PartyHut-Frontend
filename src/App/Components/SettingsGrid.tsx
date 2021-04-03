interface SettingsGridProps {}
export const SettingsGrid: React.FC<SettingsGridProps> = ({
    children
}) => (
    <div className="space-y-5 md:space-y-0 md:grid md:grid-cols-2 gap-10">{children}</div>
);