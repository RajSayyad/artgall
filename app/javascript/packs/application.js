import "../stylesheets/application.scss"
import React from "react"
import ReactDOM from "react-dom"
import App from "../components/App"

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root")
  root && ReactDOM.render(<App />, root)
})
