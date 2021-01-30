import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationItem.module.css';

const navigationItem =(props)=>{
    return (
    <li>
        <NavLink activeClassName  to={props.link}>{props.children}</NavLink>        
    </li>
    );
        
}