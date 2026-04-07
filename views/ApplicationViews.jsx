import { useEffect, useState } from "react"
import { NavBar } from "../src/components/nav/NavBar"
import { Review } from "../src/components/review/Review"
import { Outlet, Route, Routes } from "react-router-dom"

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
                <Route index element={<Welcome />} />
                <Route path="order" element={<Orders currentUser={currentUser} />} />
                <Route path="review" element={<Review currentUser={currentUser} />} />
            </Route>
        </Routes>
    )
}