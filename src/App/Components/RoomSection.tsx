export const RoomSection: React.FC<{ title: string, children: any, noGrid?: boolean }> = ({
    title,
    noGrid,
    children
}) => (
    <div className="mb-10">
        <h3 className="block mb-5 text-lg font-semibold uppercase opacity-25">{title}</h3>

        {
            noGrid ? children :
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {children}
            </div>
        }
    </div>
);

RoomSection.defaultProps = {
    noGrid: false
}