import './index.css';

export default function Navbar(){
    return <nav className="nav">
        <a href="/" className="site-title">FundifyMe</a>
        <ul>
            <CustomLink class="hover-underline-animation" href="/About">About</CustomLink>
            <CustomLink class="hover-underline-animation" href="/Admin">Admin</CustomLink>
            <CustomLink class="hover-underline-animation" href="/Dashboard">Dashboard</CustomLink>
        </ul>
    </nav>
}

function CustomLink({ href, children, ...props}) {
    const path = window.location.pathname
    return (
        <li className={path === href ? "active" : ""}>
            <a href={href} {...props}>
                {children}
            </a>
        </li>
    )
}