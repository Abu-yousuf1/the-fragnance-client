import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Products from './Pages/Products/Products';
import Login from './Pages/Authenticaiton/Login/Login';
import Registration from './Pages/Authenticaiton/Registration/Registration';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './Pages/Authenticaiton/PrivateRoute/PrivateRoute';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/home'>
              <Home />
            </Route>
            <Route path='/products'>
              <Products />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Registration />
            </Route>
            <PrivateRoute path='/dashboard'>
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path='/order/:id'>
              <PlaceOrder />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
