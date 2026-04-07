import { useState } from "react"
import { getEmployeeByEmail } from "../../services/userService"
import { useNavigate } from "react-router-dom"
import "./Login.css"
export const Login = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        getEmployeeByEmail(email).then((foundUsers) => {
        if (foundUsers.length === 1) {
            const user = foundUsers[0]
            localStorage.setItem(
                "shepherd_user",
                JSON.stringify({
                    id: user.id,
                })
            )

            navigate("/")
        } else {
            window.alert("Invalid login")
        }
        })
    }

    return (
        <main className="container-login">
        <section>
            <h1>Welcome to Shepherd's Pie Pizza</h1>
            <form className="form-login" onSubmit={handleLogin}>
            <h2>Please Login</h2>
            <fieldset>
                <div className="form-group">
                <label className="form-login-label">Login</label>
                <input
                    type="email"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                    className="form-control"
                    placeholder="Email address"
                    required
                    autoFocus
                />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <button className="login-btn btn-info" type="submit">
                    Sign in
                </button>
                </div>
            </fieldset>
            </form>
        </section>
        </main>
    )
}