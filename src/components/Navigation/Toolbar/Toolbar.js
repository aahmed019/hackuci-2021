import React from 'react';
import classes from './Toolbar.module.css';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';
const toolbar =(props)=>{
    return(
        <header className={classes.Toolbar}>

            <DrawerToggle clicked={props.drawerToggleClicked} />
           
            <nav  className={classes.Desktop} >
                <NavigationItems />
            </nav>
        </header>

           
    );
}

export default toolbar;