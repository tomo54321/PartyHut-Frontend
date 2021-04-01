interface PageWrapperProps {}
export const PageWrapper: React.FC<PageWrapperProps> = ({
    children
}) => (
    <div className="w-screen h-screen flex flex-col md:flex-row overflow-hidden">
        {children}
    </div>
);