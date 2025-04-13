import "../stylesheets/application.css"
import React from "react"
import ReactDOM from "react-dom"
import App from "../src/App"
import { UserProvider } from "../src/contexts/UserContext"

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root")
  root &&
    ReactDOM.render(
      <UserProvider>
        <App />
      </UserProvider>,
      root
    )
})
