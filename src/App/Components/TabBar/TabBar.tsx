interface TabBarProps {}
export const TabBar: React.FC<TabBarProps> = ({
    children
}) => (
    <div className="flex flex-wrap justify-between md:flex-nowrap md:justify-start md:space-x-10">
        {children}
    </div>
);