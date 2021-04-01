interface BottomPlayerArtworkProps {
    path: string;
    alt?: string;
};
export const BottomPlayerArtwork: React.FC<BottomPlayerArtworkProps> = ({
    path,
    alt
}) => (
    <img 
        src={path} 
        alt={alt} 
        className={"h-12"}
    />
)