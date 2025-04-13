import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from './contexts/UserContext';
import Navbar from './components/navbar';
import { CreatePost } from './components/post';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? null : user ? <Component {...props} /> : <Redirect to="/login" />
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
  const { user, loading } = useUser();

  if (loading) {
    return( <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
              <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Router>
      {user && <Navbar />}
      {/* <Navbar/> */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
      
      <div className='pt-28'>
        <Switch>
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/post/create" component={CreatePost}/>
          <Redirect exact from="/" to="/dashboard" />
        </Switch>
      </div>
    </Router>
    </div>
  );
};

export default App;
