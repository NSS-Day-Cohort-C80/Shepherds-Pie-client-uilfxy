export const getEntreeToppingsByEntreeId = (entreeId) => {
    return fetch(`http://localhost:8088/entreeToppings?entreeId=${entreeId}`).then((res) => res.json())
}

export const createEntreeTopping = (entreeTopping) => {
    return fetch ("http://localhost:8088/entreeToppings", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(entreeTopping)
    }
).then ((res)=>res.json())
}