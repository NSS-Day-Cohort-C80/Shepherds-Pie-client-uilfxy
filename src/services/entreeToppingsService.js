export const getEntreeToppingsByEntreeId = (entreeId) => {
    return fetch(`http://localhost:8088/entreeToppings?entreeId=${entreeId}`).then((res) => res.json())
}