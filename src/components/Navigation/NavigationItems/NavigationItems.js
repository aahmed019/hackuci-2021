import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props)=>{
    return(
        <div className={classes.NavigationItems}>
            <ul >
            
                <NavigationItem  link="/Login">Login</NavigationItem>
                <NavigationItem link="/User">Home</NavigationItem>
                <NavigationItem link="/Order">Orders</NavigationItem>
                <NavigationItem link="/Cart">Cart</NavigationItem>
            </ul>
        </div>
    )
}

export default navigationItems;