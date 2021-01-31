import React, {  useState, useEffect } from 'react';
// import './CheckOutPage.css'
import {Row,Col,Form} from 'react-bootstrap'
import Fire from '../../../firebaseConfig.js'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9,
      marginTop:'30'
    },
    container: {
        margin: 'auto',
        maxWidth: '90vw',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '50vw'
        }
    }
  }));

export default function CheckOutPage  (props){

    const classes = useStyles();

    const db =Fire.db;

    const[OptionPage,setOptionPage]= useState( (<div></div>));

    useEffect(()=>{
    props.CalculateTotal();


        setOptionPage()
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
        <Container className = {classes.container}>
            <Typography variant="h5" component="h1"><strong>Check Out</strong></Typography><br></br>
            {cart.map((item)=>{
                let name=""
                let price=0;

                name = groceries.find(food=> item.id===food[0].id)[0].name
                price = groceries.find((food)=> item.id===food[0].id  )[0].price

                return(
                    <div style = {{paddingBottom:'5vh'}}>
                        <Card className={classes.root} variant="outlined" style={{backgroundColor:"#f8f8ff"}}>
                            <CardContent style={{textAlign: 'left'}}>
                                <Typography variant="h5" component="h2"><strong>Order ID:</strong> {item.id}</Typography>
                                <Typography><strong>Item:</strong> {name}</Typography>      
                                <Typography><strong>Quantity:</strong> {item.quantity}</Typography>
                                <Typography><strong>Price:</strong>$ {item.quantity * price}</Typography>                                
                            </CardContent>
                            <CardActions style={{justifyContent: 'flex-end'}}>
                                <Button color="primary" size="small" onClick={(e)=>RemoveFromCart(item.id, item.quantity)}>Remove</Button>
                            </CardActions>
                        </Card>
                    </div>
                )
            })}
            <Typography><strong>Total:</strong>$ {total}</Typography>
            <Button color="primary" size="small" onClick={goBack}>Back</Button>
            <Button color="primary" size="small" onClick={next}>Confirm</Button>
        </Container>
    //     <div className="background-boi">
    //         <Container className="Orderlist">
    //             <Row className="Rows">
    //             <h1>Check Out Page</h1>
    //             </Row>
    //             <Row className="Rows">
    //                 <Col>Item</Col>
    //                 <Col>Quantity</Col>
    //                 <Col>Price</Col>
    //                 <Col></Col>
    //             </Row>
    //             {
    //                 cart.map((item)=>{
    //                     let name=""
    //                     let price=0;

    //                      name = groceries.find(food=> item.id===food[0].id)[0].name
    //                      price = groceries.find((food)=> item.id===food[0].id  )[0].price
                        
    //                     //alert(price); 
    //                     return (
    //                             <Row key={item.id} className="Rows">
    //                             <Col>{name}</Col>
    //                             <Col>{item.quantity}</Col>
    //                             <Col>$ {item.quantity * price}</Col> 
    //                             <Col>
    //                             <Button 
    //                             variant="primary" 
    //                             value={item.id} 
    //                             onClick={(e)=>
    //                                 RemoveFromCart(e.target.value)
    //                                 }>
    //                                 Remove
    //                             </Button>
  
    //                             </Col>
    //                             </Row>
    //                             )
    //                  })
    //             }
    //             <Row className="Rows">
    //                 <Col></Col>
    //                 <Col>Total:</Col>
    //                 <Col>$ {total}</Col>
    //                 <Col></Col>
    //             </Row>
    //             <Row className="Rows">
    //                                         <Row className="Rows">
    //                                         <h4>Delivery</h4>
    //                                         </Row>
    //                                         <Row className="Rows">
    //                                             <Col xs="auto">
    //                                             <Form.Label>Address: </Form.Label>  
    //                                             <Form.Label>
    //                                                 &ensp; {props.checkoutvalues.address}
    //                                             </Form.Label>
    //                                             </Col>
    //                                             <Col xs="auto">
    //                                             <Form.Label>City:</Form.Label>
    //                                             <Form.Label>&ensp;{props.checkoutvalues.city}</Form.Label>
    //                                             </Col>
    //                                             <Col xs="auto">
    //                                             <Form.Label>State: </Form.Label>
    //                                             <Form.Label>&ensp;{props.checkoutvalues.state}</Form.Label>
    //                                             </Col>
    //                                             <Col xs="auto">
    //                                             <Form.Label>Postal Code: </Form.Label>
    //                                             <Form.Label>&ensp;{props.checkoutvalues.postalCode}</Form.Label>
    //                                             </Col>

    //                                         </Row>                                               
    //                                       </Row>
    //             <Row className="Rows">
    //                 <Col xs={5}> 
    //                 <Form.Label>Notes:</Form.Label>
    //                 <Form.Label>&ensp;{props.checkoutvalues.notes}</Form.Label>
    //                 </Col>
    //             </Row>
    //             <Row className="Rows">
    //                 <Col xs={5}> <Button variant="primary"  onClick={goBack}>Go Back</Button></Col>
    //                 <Col xs={5}><Button variant="primary"  onClick={next}>Next</Button></Col>
    //             </Row>
    //         </Container>
       

    // </div>
    )
}
