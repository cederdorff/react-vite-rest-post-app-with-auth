import { NavLink, useLocation } from "react-router-dom";

export default function Nav() {
    //assigning location variable
    const location = useLocation();
    console.log(location);

    return (
        <nav>
            <NavLink to="/" className={location.pathname.includes("/posts/") ? "active" : ""}>
                Posts
            </NavLink>
            <NavLink to="/create">Create</NavLink>
            <NavLink to="/favs">Favorites</NavLink>
            <NavLink to="/profile">Profile</NavLink>
        </nav>
    );
}
