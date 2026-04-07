







export const getOrderById = (id) => {
    return fetch(`http://localhost:8088/orders/${id}`).then((res) => res.json())
}


export const updateOrder = (order) => {
    return fetch(`http://localhost:8088/orders/${order.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
    }).then((res) => res.json())
}