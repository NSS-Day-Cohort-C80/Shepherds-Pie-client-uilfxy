export const getAllSauces = () => {
    return fetch(`http://localhost:8088/sauces`).then((res) => res.json())
}