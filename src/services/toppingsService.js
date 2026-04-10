export const getAllToppings = () => {
    return fetch(`http://localhost:8088/toppings`).then((res) => res.json())
}