import React from "react"
import { useRoutes } from "./components/routes/routes"

const App = () => {
  const routes = useRoutes(false)
  return (
    <div className="app">
      <div className="container">
        {routes}
      </div>
    </div>
  )
}

export default App