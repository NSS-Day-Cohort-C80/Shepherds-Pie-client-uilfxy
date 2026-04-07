export const getEmployeeByEmail= (email) => {
    return fetch(`http://localhost:8088/employees?email=${email}`).then((res) => res.json())
}

export const getUserById = (currentUserId) => {
    return fetch (`http://localhost:8088/employees?id=${currentUserId}`).then((res) => res.json())
}