import React, {  useState, useEffect } from 'react';
// import './CheckOutPage.css'
import Button from 'react-bootstrap/Button';
import {Row,Col,Container,Form} from 'react-bootstrap'
import Fire from '../../../firebaseConfig.js'
export default function CheckOutPage  (props){

 const db =Fire.db;

const[OptionPage,setOptionPage]= useState( (<div></div>));

useEffect(()=>{
  props.CalculateTotal();


     setOptionPage(
                                         )
  },[])



const next= e=>{
    e.preventDefault();
    props.UpdateBalance();
    const cart1 = props.checkoutvalues.cart.length;
    if(cart1 ===0)
    { alert("The shopping cart is empty ! Please go back to order.")}
    else if (props.checkoutvalues.balance == 0 || props.checkoutvalues.balance < props.checkoutvalues.total)
    {
        alert("Insufficient fund")
    }
    else{
    props.NextStep();
    }
    



}
const goBack= e=>{  
    e.preventDefault();
    props.PrevStep();
}

    const{checkoutvalues ,groceries,RemoveFromCart} = props;
    const{cart,total }= checkoutvalues;
    return(
        <div className="background-boi">
            <Container className="Orderlist">
                <Row className="Rows">
                <h1>Check Out Page</h1>
                </Row>
                <Row className="Rows">
                    <Col>Item</Col>
                    <Col>Quantity</Col>
                    <Col>Price</Col>
                    <Col></Col>
                </Row>
                {
                    cart.map((item)=>{
                        let name=""
                        let price=0;

                         name = groceries.find(food=> item.id===food[0].id)[0].name
                         price = groceries.find((food)=> item.id===food[0].id  )[0].price
                        
                        //alert(price); 
                        return (
                                <Row key={item.id} className="Rows">
                                <Col>{name}</Col>
                                <Col>{item.quantity}</Col>
                                <Col>$ {item.quantity * price}</Col> 
                                <Col>
                                <Button 
                                variant="primary" 
                                value={item.id} 
                                onClick={(e)=>
                                    RemoveFromCart(e.target.value)
                                    }>
                                    Remove
                                </Button>
  
                                </Col>
                                </Row>
                                )
                     })
                }
                <Row className="Rows">
                    <Col></Col>
                    <Col>Total:</Col>
                    <Col>$ {total}</Col>
                    <Col></Col>
                </Row>
                <Row className="Rows">
                                            <Row className="Rows">
                                            <h4>Delivery</h4>
                                            </Row>
                                            <Row className="Rows">
                                                <Col xs="auto">
                                                <Form.Label>Address: </Form.Label>  
                                                <Form.Label>
                                                    &ensp; {props.checkoutvalues.address}
                                                </Form.Label>
                                                </Col>
                                                <Col xs="auto">
                                                <Form.Label>City:</Form.Label>
                                                <Form.Label>&ensp;{props.checkoutvalues.city}</Form.Label>
                                                </Col>
                                                <Col xs="auto">
                                                <Form.Label>State: </Form.Label>
                                                <Form.Label>&ensp;{props.checkoutvalues.state}</Form.Label>
                                                </Col>
                                                <Col xs="auto">
                                                <Form.Label>Postal Code: </Form.Label>
                                                <Form.Label>&ensp;{props.checkoutvalues.postalCode}</Form.Label>
                                                </Col>

                                            </Row>                                               
                                          </Row>
                <Row className="Rows">
                    <Col xs={5}> 
                    <Form.Label>Notes:</Form.Label>
                    <Form.Label>&ensp;{props.checkoutvalues.notes}</Form.Label>
                    </Col>
                </Row>
                <Row className="Rows">
                    <Col xs={5}> <Button variant="primary"  onClick={goBack}>Go Back</Button></Col>
                    <Col xs={5}><Button variant="primary"  onClick={next}>Next</Button></Col>
                </Row>
            </Container>
       

    </div>
    )
}
