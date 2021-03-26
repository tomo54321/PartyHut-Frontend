export const PageHeading: React.FC<{title: string}> = ({
    title
}) => (
    <h1 className="text-4xl md:text-5xl font-bold mb-10">{title}</h1>
);