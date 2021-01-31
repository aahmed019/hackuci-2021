import React from 'react';
import {Row} from "react-bootstrap";
import classes from './Confrimation.module.css'

 const confirmation =(props) =>{
        setTimeout(()=>{props.history.push('/Home')}, 5000);
        return(
            <div>
                    <div className = {classes.container}>
                        <div>
                        <Row >
                            <Row className = {classes.firstset}>
                                <div className ="signup-title">Thank you for Registering!</div><br></br>
                            </Row>
                        </Row>     
                        </div>
                    </div>
            </div>
           
        )
    
}
export default confirmation;