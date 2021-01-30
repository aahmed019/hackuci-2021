import React from 'react';
// import './Order.css'
import {Col, Container,Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'



export default function Order (props) {



    const Next = e =>{
        e.preventDefault();
        const cart1 = props.cart.length;
        if(cart1<=0)
        { alert("Please add something to the cart")}
        else if(address ==="" || city==="" || state==="" || postalCode==="") {
            alert("Please enter the address!")
        }
        else{
        props.NextStep();
        }
    }

    const{ values, AddToCart,groceries,handleChange,cart,RemoveFromCart}=props;
    const {address,city,state,postalCode} = values;
   
     const Delivery= (
            <Form.Row>
            <Form.Row className="Rows ">
            <Form.Group as={Col} xs={6}> 
                  <Form.Label>Address:</Form.Label>
                  <Form.Control type="text" name="address" onChange={handleChange} ></Form.Control>
                  </Form.Group>
            </Form.Row>
            <Form.Row className="Rows ">
                  <Form.Group as={Col} xs={3}>
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" name="city" onChange={handleChange} ></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} xs={3}>
                      <Form.Label>State</Form.Label>
                      <Form.Control type="text" name="state" onChange={handleChange} ></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} xs={3}>
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control type="text" name="postalCode" onChange={handleChange} ></Form.Control>
                  </Form.Group>
            </Form.Row>
            </Form.Row>)
  

   return (
            <div className="background-boi">
                <div className="OrderContainer">
                  <div className="Order">
                  <Form className="FormControl" >
                      <Form.Row className="Rows">
                          <h3>Place Order</h3>
                      </Form.Row>
                      <Form.Row className="Rows" >
                      <Form.Group as={Col} className="Cols" xs={3}>
                            <Form.Label>Groceries:</Form.Label>
                            <Form.Control as="select"custom  name="GID" onChange={handleChange} value={values.GID} >
                            <option></option>
                            {groceries && groceries.map((groceries, i) => {
                                 return(
                            <option key={i} value={groceries[0].id} >{groceries[0].name}</option> 
                                     )})}
                            </Form.Control>
                       </Form.Group>

                       <Form.Group as={Col}  xs={3}>
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control type="number"  min="1" max="100"  id="mealQuantity" name="GNum" onChange={handleChange}  />
                       </Form.Group>

                        <Form.Group as={Col} xs="auto" className="ButtonCols">
                        <Button variant="primary" onClick={()=>AddToCart(values['GID'],values['GNum'])} > Add  to Cart</Button>
                        </Form.Group>

                      </Form.Row>

                        {Delivery}

                        <Form.Row className="Rows">
                            <Form.Group as={Col}   
                                style={{  
                                display:'flex', 
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'center'}}>
                            <Form.Control 
                                as="textarea"
                                placeholder="Notes"
                                style={{height:'100px' ,maxWidth:'500px'}}
                                name="notes"
                                onChange={handleChange}
                                value={values.notes}
                    
                                 />  
                            </Form.Group>
                        </Form.Row>
                      <Form.Row className="Rows" >                        
                          <Button variant="primary" onClick={Next} >Check Out</Button>
                      </Form.Row>
                  </Form>
                  </div>
                  <div className="Cart">
                  <Container className="Orderlist">
                <Row className="Rows">
                <h1>Cart</h1>
                </Row>
                <Row className="Rows">
                    <Col xs={4}>Item</Col>
                    <Col xs={2}>Quantity</Col>
                    <Col xs={2}>Price</Col>
                    <Col xs={2}> </Col>
                </Row>
                {  
                    cart.map((item)=>{
                        let name=""
                        let price=0;

                         name = groceries.find(grocery=> item.id===grocery[0].id)[0].name
                         price = groceries.find((grocery)=> item.id===grocery[0].id  )[0].price
                        
                        
                       return(
                        <Row key={item.id} className="Rows">
                                <Col xs={4} >{name}</Col>
                                <Col xs={2}>{item.quantity}</Col>
                                <Col xs={2}>$ {item.quantity * price}</Col> 
                                <Col xs={2}>
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
                    <Col xs={4}></Col>
                    <Col xs={2}>Total:</Col>
                    <Col xs={2}>$ {values.total}</Col>
                    <Col xs={2}> </Col>
                </Row>

            </Container>
                  </div>
                  </div>
            </div>
           
   )
   }