
import React,{useEffect, useState} from 'react';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Confirmation from './components/Confirmation/Confirmation';
import {BrowserRouter,Switch, Route, Redirect} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer';
import Delivery from './components/Delivery/Delivery';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import './App.css';
import Users from './components/User/User'
import OrderPage from './components/OrderPage/OrderPage';
import DeliveryPage from './components/Delivery/Delivery';

import { useAuth } from './contexts/AuthContext'

const  App = (props)=> {

console.log(useAuth());
 const [showSideDrawer, setSideDrawer] = useState(false);

 const  sideDrawerClosedHandler = () =>{
  setSideDrawer(false)
}
 const sideDrawerToggleHandler= () =>{
    let prev= showSideDrawer;
    setSideDrawer(!prev);
  }


  return (
    <div className="App">
       <AuthProvider> 
         <BrowserRouter>
         <div>
         <Toolbar drawerToggleClicked={sideDrawerToggleHandler}   />
         <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
         </div>
          <div style={{marginTop: '90px'}}>
          <Switch>
            <Route path="/Home"component={Users}/>
            <Route path="/User" component={Users}/>
            <Route path="/Volunteer"  component={DeliveryPage}/> 
            <Route path="/Order" component={OrderPage}/>
            <Route path="/Confirmation" component={Confirmation}/>
            <Route path='/Login' component={Login}/>
            <Route path='/SignUp' component={SignUp}/>
            <Redirect from="/" to="/Login" />
            <Route path='/' render={()=> <h1>404 Page Not available</h1>} />
         </Switch>
          </div>
         </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
