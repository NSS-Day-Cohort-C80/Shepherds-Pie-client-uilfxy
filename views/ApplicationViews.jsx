import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../src/components/nav/NavBar"
import { Welcome } from "../src/components/welcome/Welcome"
import { Orders } from "../src/components/orders/Orders"
import { Review } from "../src/components/review/Review"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localShepherdUser = localStorage.getItem("shepherd_user")
        const shepherdUserObj = JSON.parse(localShepherdUser)

        setCurrentUser(shepherdUserObj)
    }, [])

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar currentUser={currentUser} />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<Welcome currentUser={currentUser} />} />
                <Route path="order" element={<Orders currentUser={currentUser} />} />
                <Route path="review" element={<Review currentUser={currentUser} />} />
            </Route>
        </Routes>
    )
}