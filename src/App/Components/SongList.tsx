interface SongListProps {}
export const SongList: React.FC<SongListProps> = ({
    children
}) => (
    <div className="mt-5 space-y-5">{children}</div>
)