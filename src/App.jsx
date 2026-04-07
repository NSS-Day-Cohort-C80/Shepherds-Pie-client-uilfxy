import { Route, Routes } from "react-router-dom";
import { ApplicationViews } from "../views/ApplicationViews";
import { Authorized } from "../views/Authorized";
import { Login } from "./components/auth/Login";
import "./App.css";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />

      <Route 
        path="*" 
        element={
          //Checks if the user has logged in first
          <Authorized>
            {/* ApplicationViews is the CHILD component of Authorized */}
            <ApplicationViews/>
          </Authorized>
        } 
      />
    </Routes>
  )
}
