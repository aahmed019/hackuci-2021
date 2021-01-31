import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props)=>{
    return(
        <div className={classes.NavigationItems}>
            <ul >
            
                <NavigationItem  link="/Login">Login</NavigationItem>
<<<<<<< HEAD
                <NavigationItem link="/Home">Home</NavigationItem>
                <NavigationItem link="/Order">Orders</NavigationItem>
                <NavigationItem link="/Delivery">Delivery</NavigationItem>
=======
                <NavigationItem link="/User">Home</NavigationItem>
                <NavigationItem link="/Order">Orders</NavigationItem>
>>>>>>> 635c23713b89834342a4e7faa4793bc1fa9fc67a
                <NavigationItem link="/Cart">Cart</NavigationItem>
            </ul>
        </div>
    )
}

export default navigationItems;