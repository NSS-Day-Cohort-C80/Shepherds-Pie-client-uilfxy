import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllSizes } from "../../services/sizeService"
import { getAllCheeses } from "../../services/cheeseService"
import { getAllSauces } from "../../services/sauceService"
import { getAllToppings } from "../../services/toppingsService"
import { getEntreesByOrderId } from "../../services/entreeService"
import { getEntreeToppingsByEntreeId } from "../../services/entreeToppingsService"
import { getOrderById, updateOrder } from "../../services/orderService"

export const Review = ({ currentUser }) => {
    const [entrees, setEntrees] = useState([])
    const [sizes, setSizes] = useState([])
    const [cheeses, setCheeses] = useState([])
    const [sauces, setSauces] = useState([])
    const [toppings, setToppings] = useState([])
    const [currentOrder, setCurrentOrder] = useState({})
    const [tip, setTip] = useState(0)
    const [showTipInput, setShowTipInput] = useState(false)

    const navigate = useNavigate()

    const activeOrderId = currentUser?.activeOrderId

    const fetchAllSizesCheesesSaucesAndToppings = async () => {
            setSizes(await getAllSizes())
            setCheeses(await getAllCheeses())
            setSauces(await getAllSauces())
            setToppings(await getAllToppings())
    }

    useEffect(() => {
        fetchAllSizesCheesesSaucesAndToppings()
    }, [])

    // Fetch entrees + their toppings whenever the active order changes
    useEffect(() => {
        if (!activeOrderId) return

        const fetchEntrees = async () => {
            const fetchedEntrees = await getEntreesByOrderId(activeOrderId)
            const order = await getOrderById(activeOrderId)
            
            const entreesWithToppings = []
            for (const entree of fetchedEntrees) {
                const entreeToppings = await getEntreeToppingsByEntreeId(entree.id)
                entreesWithToppings.push({ ...entree, entreeToppings })
            }

            setEntrees(entreesWithToppings)
            setCurrentOrder(order)
        }

        fetchEntrees()
    }, [activeOrderId])

    // Helper functions 

    const findById = (array, id) => array.find((item) => item.id === id)
    
    const getEntreeCost = (entree) => {
        const base = findById(sizes, entree.sizeId)?.baseCost ?? 0
        const toppingsCost = entree.entreeToppings?.reduce((sum, entreeTopping) => {
            return sum + (findById(toppings, entreeTopping.toppingId)?.cost ?? 0)
        }, 0) ?? 0
        return base + toppingsCost
    }

    const formatEntreeDescription = (entree) => {
        const size = findById(sizes, entree.sizeId)?.name ?? "None"
        const sauce = findById(sauces, entree.sauceId)?.name ?? "None"
        const cheese = findById(cheeses, entree.cheeseId)?.name ?? "None"
        const toppingNames = entree.entreeToppings?.length
            ? entree.entreeToppings.map((entreeTopping) => findById(toppings, entreeTopping.toppingId)?.name).join(", ")
            : "no toppings"

        return `Order #${activeOrderId}: ${size} pizza with ${sauce} sauce, ${cheese} cheese, and ${toppingNames}.`
    }

    const subtotal = entrees.reduce((sum, entree) => sum + getEntreeCost(entree), 0)
    const total = subtotal + parseFloat(tip || 0)


    const handlePlaceOrder = async () => {
        if (entrees.length === 0) {
            window.alert("Please add at least one pizza before placing an order.")
            return
        }

        await updateOrder({
            ...currentOrder,
            tip: parseFloat(tip || 0)}
        )

        localStorage.setItem("shepherd_user", JSON.stringify({
            id: currentUser.id,
            activeOrderId: null
        }))
       
        navigate("/")
    }


    return (
        <main className="review-order-container">
            <h1 className="review-order-title">Review Order</h1>

            <section className="pizza-list">
                {entrees.length === 0 ? (
                    <p className="empty-msg">No pizzas added yet.</p>
                ) : (
                    entrees.map((entree) => (
                        <div key={entree.id} className="pizza-item">
                            <button
                                className="edit-btn"
                                onClick={() => navigate(`/order/${entree.id}`)}
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

            {entrees.length > 0 && (
                <div className="order-totals">
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    {parseFloat(tip) > 0 && <p>Tip: ${parseFloat(tip).toFixed(2)}</p>}
                    <p className="order-total">Total: ${total.toFixed(2)}</p>
                </div>
            )}

            <div className="review-order-actions">
                <button className="add-entree-btn" onClick={() => navigate("/order")}>
                    Add New Entree
                </button>

                <div className="right-actions">
                    {showTipInput ? (
                        <div className="tip-input-group">
                            <span>$</span>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={tip}
                                onChange={(evt) => setTip(evt.target.value)}
                                className="tip-input"
                                placeholder="0.00"
                                autoFocus
                            />
                        </div>
                    ) : (
                        <button className="tip-btn" onClick={() => setShowTipInput(true)}>
                            Add Tip
                        </button>
                    )}

                    <button className="place-order-btn" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>
            </div>
        </main>
    )
}