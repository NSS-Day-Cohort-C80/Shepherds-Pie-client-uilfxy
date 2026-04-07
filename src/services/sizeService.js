export const getAllSizes = () => {
    return fetch(`http://localhost:8088/sizes`).then((res) => res.json())
}