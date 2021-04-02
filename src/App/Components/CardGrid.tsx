interface CardGridProps {}
export const CardGrid: React.FC<CardGridProps> = ({
    children
}) => (
    <div className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">{children}</div>
);