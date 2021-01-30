import React from 'react';
import {Row} from "react-bootstrap";
import classes from './Confrimation.module.css'

 const confirmation =() =>{

        return(
            <div>
                    <div className = {classes.container}>
                        <div>
                        <Row >
                            <Row className = {classes.firstset}>
                                <div className ="signup-title">Thank you for Registering!</div><br></br>
                            </Row>
                            <Row  className = {classes.secondset}>
                                <div className = "user">Please click profile to check the status on your account! Our manager is reviewing your account!<br/></div>   
                            </Row>
                        </Row>     
                        </div>
                    </div>
            </div>
           
        )
    
}
export default confirmation;