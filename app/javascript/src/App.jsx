import React from 'react'
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './contexts/UserContext';


const App = () => {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register}/>
        <UserProvider>
          <Route path="/dashboard" component={Dashboard}/>
        </UserProvider>
      </Switch>
    </Router>
  )
}

export default App