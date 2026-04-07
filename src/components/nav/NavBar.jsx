import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
    <ul>
        <li className="">
        <Link className="" to="/welcome">Home</Link>
        </li>
        <li className="">
            <Link to="/order">Order Form</Link>
        </li>
        <li className="">
            <Link to= "/review">Review Order</Link>
        </li>
        <li className="">
            <Link to ="/login" 
            className=""
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