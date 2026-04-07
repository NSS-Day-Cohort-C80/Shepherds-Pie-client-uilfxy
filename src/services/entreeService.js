export const getEntreesByOrderId = (orderId) => {
    return fetch(`http://localhost:8088/entrees?orderId=${orderId}`).then((res) => res.json())
}