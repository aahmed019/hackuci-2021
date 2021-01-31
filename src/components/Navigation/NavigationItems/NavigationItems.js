import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { useAuth } from '../../../contexts/AuthContext';

const NavigationItems = (props)=>{
    
    const{currentUser}=useAuth();
    let show ;
    if(currentUser === null){
       show=( <ul>
           <NavigationItem  link="/Login">Login</NavigationItem>
           <NavigationItem  link="/SignUp">Sign Up</NavigationItem>
           </ul>);
    }
    else{
        show=(   
        <ul>         
            <NavigationItem link="/Home">Home</NavigationItem>
            <NavigationItem link="/Order">Orders</NavigationItem>
            <NavigationItem link="/Volunteer">Delivery</NavigationItem>
        </ul>    
        );
    }
    return(
        <div className={classes.NavigationItems}>
            {show}
        </div>
    )
}

export default NavigationItems;