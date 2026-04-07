import { Link, useNavigate } from "react-router-dom"

export const EmployeeNavBar = () => {
    const navigate = useNavigate()

    return 
    <ul>
        <li className="">
        <Link className="" to="/welcome">Home</Link>
        </li>
        <li className="">
            <Link to="/orderForm">Order Form</Link>
        </li>
        <li className="">
            <Link to= "/reviewOrder">Review Order</Link>
        </li>
        <li className="">
            <Link to ="/login"
            replace 
            className=""
            onClick={()=> localStorage.removeItem("shepherd_user")}>
                Logout
            </Link>
        </li>
    </ul>
}