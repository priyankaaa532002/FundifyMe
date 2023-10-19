import './index.css';
import {Link , useMatch , useResolvedPath} from "react-router-dom"

export default function Navbar(){
    return <nav className="nav">
        <Link to="/" className="site-title">FundifyMe</Link>
        <ul>
            <CustomLink class="hover-underline-animation" to="/Dashboard">Dashboard</CustomLink>
            <CustomLink class="hover-underline-animation" to="/Admin">Admin</CustomLink>
            <CustomLink class="hover-underline-animation" to="/Funding">Mantle</CustomLink>
            <CustomLink class="hover-underline-animation" to="/About">Scroll</CustomLink>
        </ul>
    </nav>
}

function CustomLink({ to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end:true})

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}