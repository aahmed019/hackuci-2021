
import React,{useState} from 'react';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Confirmation from './components/Confirmation/Confirmation';
import {BrowserRouter,Switch, Route, Redirect} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import './App.css';
import Users from './components/User/User'
import Order from './components/Order/Order';

const  App = (props)=> {

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
         <Toolbar drawerToggleClicked={sideDrawerToggleHandler}  />
         <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
          <Switch>
            <Route path='/Login' component={Login}/>
            <Route path='/SignUp' component={SignUp}/>
            <Route path="/Home"  component = {Users}/>
            <Route path="/User" component={Users}/>
            <Route path="Volunteer"/>
            <Route path="/Order" component={Order}/>
            <Route path="/Confirmation" component={Confirmation}/>
            <Redirect from="/" to="/Login"/>
          </Switch>
      
         </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
