import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary/Auxillary'

const sideDrawer=(props)=>{
    let attachedClasses =[classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses =[classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <nav>
            <NavigationItems />
            </nav> 
        </div>
        </Aux>
    );
};


export default sideDrawer;