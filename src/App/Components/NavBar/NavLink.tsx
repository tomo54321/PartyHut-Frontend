import { Icon } from 'react-feather';
import { 
    NavLink as NavBarLink,
    NavLinkProps as NavBarLinkProps
} from 'react-router-dom';
interface NavLinkProps extends NavBarLinkProps {
    title: string;
    Icon: Icon
}
export const NavLink: React.FC<NavLinkProps> = ({
    title,
    Icon,
    className,
    activeClassName,
    ...props
}) => (
    <NavBarLink 
    className={`block md:flex md:space-x-2 md:items-center p-2 rounded-md font-medium hover:bg-gray-700 transition duration-75 ${className}`}
    activeClassName={`bg-gray-700`}
    {...props}>
        <Icon size={20} className="hidden md:block opacity-50"/>
        <span>{title}</span>
    </NavBarLink>
);

NavLink.defaultProps = {
    exact: true
}