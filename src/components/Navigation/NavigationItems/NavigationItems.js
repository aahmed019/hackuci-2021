import React from 'react';
import classes from 'NavigationItems.module.css;';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props)=>{
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/Login">Login</NavigationItem>
            <NavigationItem link="/Home">Home</NavigationItem>
            <NavigationItem link="/Orders">Orders</NavigationItem>
            <NavigationItem link="/Cart">Cart</NavigationItem>
        </ul>
    )
}