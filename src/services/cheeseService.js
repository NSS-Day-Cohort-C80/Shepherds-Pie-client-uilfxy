export const getAllCheeses = () => {
    return fetch(`http://localhost:8088/cheeses`).then((res) => res.json())
}