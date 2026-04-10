import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
export const NavBar = () => {
    const navigate = useNavigate()

    return (
    <ul className="navbar">
        <li className="navbar-item">
        <Link className="navbar-link" to="/">Home</Link>
        </li>
        <li className="navbar-item">
            <Link className="navbar-link" to="/order">Order Form</Link>
        </li>
        <li className="navbar-item">
            <Link className="navbar-link" to= "/review">Review Order</Link>
        </li>
        <li className="navbar-item">
            <Link className="navbar-link" to ="/login" 
            onClick={()=>{ 
                localStorage.removeItem("shepherd_user")
                navigate("/login", {replace:true})
            }
            }>
                Logout
            </Link>
        </li>
    </ul>
    )
}