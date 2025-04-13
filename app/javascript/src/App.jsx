import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from './contexts/UserContext';
import Navbar from './components/navbar';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        user !=null? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const PublicRoute = ({ component: Component, ...rest }) => {
  const { user } = useUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
};

const App = () => {
  const { user } = useUser();

  return (
    <Router>
      {user && <Navbar />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
      
      <div>
        <Switch>
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Redirect exact from="/" to="/dashboard" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
