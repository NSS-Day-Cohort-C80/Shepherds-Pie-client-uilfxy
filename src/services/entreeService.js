export const getEntreesByOrderId = (orderId) => {
    return fetch(`http://localhost:8088/entrees?orderId=${orderId}`).then((res) => res.json())
}

export const createEntree = (entree) => {
    return fetch ("http://localhost:8088/entrees", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(entree)
    }
).then ((res)=>res.json())
}