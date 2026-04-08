import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllSizes } from "../../services/sizeService"
import { getAllCheeses } from "../../services/cheeseService"
import { getAllSauces } from "../../services/sauceService"
import { getAllToppings } from "../../services/toppingsService"
import { createOrder } from "../../services/orderService"
import { createEntree } from "../../services/entreeService"
import { createEntreeTopping } from "../../services/entreeToppingsService"

export const Review = ({ currentUser, orderData, setOrderData }) => {
    const [sizes, setSizes] = useState([])
    const [cheeses, setCheeses] = useState([])
    const [sauces, setSauces] = useState([])
    const [toppings, setToppings] = useState([])
    const [tip, setTip] = useState(1)

    const navigate = useNavigate()

    const fetchAllSizesCheesesSaucesAndToppings = async () => {
        setSizes(await getAllSizes())
        setCheeses(await getAllCheeses())
        setSauces(await getAllSauces())
        setToppings(await getAllToppings())
    }

    useEffect(() => {
        fetchAllSizesCheesesSaucesAndToppings()
    }, [])

    //don't render anything until all fetch data has loaded (useful so i don't have to use ? and ?? everywhere)
    if (!sizes.length || !cheeses.length || !sauces.length || !toppings.length) {
        return <p>Loading...</p>
    }

    //finds a single item in an array by its id. Makes it easy to do .find so i don't have to rewrite it constantly throughout this module (helper function)
    const findById = (array, id) => array.find((item) => item.id === id)

    //calculates the total cost of one pizza (base size cost + all topping costs). entree and the toppingId/toppingIds arguments get entrees from the orderData.entrees.map array method used in the return jsx below
    const getBaseCostPrice = (entree) => {
        //const size = sizes.find((size) => size.id === entree.sizeId)
        const size = findById(sizes, entree.sizeId)
        return size.baseCost
    }

    const getToppingCost = (toppingId) => {
        const topping = findById(toppings, toppingId)
        return topping.cost
    }

    const getTotalToppingCost = (toppingIds) => {
        return toppingIds.reduce((sumOfToppings, toppingId) => {
            return sumOfToppings + getToppingCost(toppingId)
        }, 0)
    }

    const getEntreeCost = (entree) => {
        const basePrice = getBaseCostPrice(entree)
        const toppingsPrice = getTotalToppingCost(entree.toppingIds)
        return basePrice + toppingsPrice
    }

    //instead of writing this out in the return jsx, we can write a function here to make the pizza description string and call it in the return jsx. it goes through each item array and finds the matching id between the item and the entree itemId and pulls out the name of the matching item
    const formatEntreeDescription = (entree) => {
        const sizeName = findById(sizes, entree.sizeId).name
        const sauceName = findById(sauces, entree.sauceId).name
        const cheeseName = findById(cheeses, entree.cheeseId).name

        //first we check if the entree has toppings, if it does we go through the entree.toppingIds array in orderData local storage and find the name of the topping that matches the toppingId attached to the entree, if the entree has no toppings we return no toppings. 
        const hasToppings = entree.toppingIds.length > 0
        const toppingNames = hasToppings
            ? entree.toppingIds.map((toppingId) => findById(toppings, toppingId).name).join(", ")
            : "no toppings"

        return `${sizeName} pizza with ${sauceName} sauce, ${cheeseName} cheese, and ${toppingNames}.`
    }

    //add up the cost of every pizza on the order
    const subtotal = orderData.entrees.reduce((sumOfEntrees, entree) => {
        return sumOfEntrees + getEntreeCost(entree)
    }, 0)

    const subtotalPrice = subtotal.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })

    const deliveryCharge = orderData.deliveredBy ? 5.00 : 0

    //add the tip to get the final total (add the tip if there was something entered, otherwise use 0)
    const total = subtotal + parseFloat(tip || 0) + deliveryCharge

    const totalPrice = total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })

    const handlePlaceOrder = async () => {
        if (!orderData.entrees.length) {
            window.alert("Please add at least one pizza before placing an order.")
            return
        }

        const newOrder = await createOrder({
            tableNumber: orderData.tableNumber,
            createdBy: currentUser.id,
            deliveredBy: orderData.deliveredBy,
            timeStamp: new Date(),
            tipAmount: parseFloat(tip || 0),
        })

        //if we have multiple entrees we need to create a new entree obj in the database so a for loop is used, and we do the same for entreeToppings.
        for (const entree of orderData.entrees) {
            const newEntree = await createEntree({
                orderId: newOrder.id,
                sizeId: entree.sizeId,
                cheeseId: entree.cheeseId,
                sauceId: entree.sauceId,
            })

            for (const toppingId of entree.toppingIds) {
                await createEntreeTopping({
                    entreeId: newEntree.id,
                    toppingId: toppingId,
                })
            }
        }

        //once order is submitted and everything is posted we need to clear local order state and navigate home so nothing carries over to the next order that is made
        setOrderData({ entrees: [] })
        navigate("/")
    }

    //the index thats used in the orderData.entrees.map array method refers to the position of the entree in the array (array index number). also, orderData.entrees.map loops through each entree in the orderData obj and passes them one at a time into the helper functions defined above
    return (
        <main className="review-order-container">
            <h1 className="review-order-title">Review Order</h1>

            <section className="pizza-list">
                {!orderData.entrees.length ? (
                    <p className="empty-msg">No pizzas added yet.</p>
                ) : (
                    orderData.entrees.map((entree, index) => (
                        <div key={index} className="pizza-item">
                            <button
                                className="edit-btn"
                                onClick={() => navigate(`/order/${index}`)}
                            >
                                Edit
                            </button>
                            <div className="pizza-details">
                                <p>{formatEntreeDescription(entree)}</p>
                                <p className="pizza-cost">
                                    ${getEntreeCost(entree).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </section>

            {orderData.entrees.length > 0 && (
                <div className="order-totals">
                    <p>Subtotal: {subtotalPrice}</p>
                    {orderData.deliveredBy && <p>Delivery charge : $5.00</p>}
                    {tip && <p>Tip: ${parseFloat(tip).toFixed(2)}</p>}
                    <p>Total: {totalPrice}</p>
                </div>
            )}

            <div className="review-order-actions">
                <button
                    className="add-entree-btn"
                    onClick={() => navigate("/order")}
                >
                    Add New Entree
                </button>

                <div>
                    <div className="tip-input-group">
                        <label>Add Tip</label>
                        <span>$</span>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={tip}
                            onChange={(evt) => setTip(evt.target.value)}
                            className="tip-input"
                            placeholder="1.00"
                        />
                    </div>

                    <button className="place-order-btn" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>
            </div>
        </main>
    )
}