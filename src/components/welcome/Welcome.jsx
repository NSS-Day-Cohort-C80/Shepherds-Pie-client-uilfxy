import { useNavigate } from "react-router-dom"
import "./Welcome.css"
import { createOrder } from "../../services/orderService"

export const Welcome = ({currentUser}) => {
    const navigate = useNavigate()
    const handleCreateOrder = async () => {
        const newOrder = await createOrder({
            createdBy: currentUser.id,
            tableNumber: 0,
            deliveredBy: 0,
            timeStamp: new Date(),
            tip: 0

        })
        localStorage.setItem("shepherd_user", JSON.stringify({
            id: currentUser.id,
            activeOrderId: newOrder.id
        }))
        navigate("/order")
    }
    return (
        <div className="welcome-container">
            <h1>Welcome to
            </h1>
            <img src="/PizzaLogo.png" alt="Shepherds-Pie-Logo"/>
            <button 
            onClick={handleCreateOrder} 
            className="welcome-btn">
            Start Order
            </button>
        </div>
    )
}