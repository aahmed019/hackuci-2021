import React from 'react';
// import './Order.css'
import {Col, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    container: {
        margin: 'auto',
        maxWidth: '90vw',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '50vw'
        }
    },
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    card: {
        minWidth: 275,
        paddingBottom: '5vh'
    }
  }));

export default function Order (props) {

    const classes = useStyles();

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

   return (
       <Container className = {classes.container}>
           <Typography variant="h5" component="h1"><strong>Order</strong></Typography>
           <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    name="GID"
                    id="groceries"
                    select
                    required
                    variant="outlined"
                    label="Select Grocery"
                    value={values.GID}
                    onChange={handleChange}
                    >
                    {groceries && groceries.map((groceries, i) => (
                        <MenuItem key={i} value={groceries[0].id}>{groceries[0].name}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    variant="outlined"
                    required
                    name="GNum"
                    value={values.GNum}
                    label="Quantity"
                    type="number"
                    onChange={handleChange}
                    id="quantity">
                </TextField>
                <Button style={{backgroundColor:"#6573c3", color:"white"}} onClick={()=>{console.log(values.GID); AddToCart(values['GID'],values['GNum'])}}>Add to Cart</Button>
           </form>
           <form className={classes.form} noValidate>
               <TextField
               variant="outlined"
               required
               name="address"
               label="Address"
               id="address"
               onChange={handleChange}></TextField>
               <TextField
               variant="outlined"
               required
               name="city"
               label="City"
               id="city"
               onChange={handleChange}></TextField>
               <TextField
               variant="outlined"
               required
               name="state"
               label="State"
               id="state"
               onChange={handleChange}></TextField>
               <TextField
               variant="outlined"
               required
               name="postalCode"
               label="Postal Code"
               id="postalCode"
               onChange={handleChange}></TextField>
               <TextField
               variant="outlined"
               required
               name="notes"
               label="Notes"
               id="notes"
               ></TextField><br></br><br></br>
               <Button style={{backgroundColor:"#6573c3", color:"white"}} onClick={Next}>Check Out</Button>
           </form>
           <Typography variant="h5" component="h2"><strong>Cart</strong></Typography>
           <Typography><strong>Total:</strong>${values.total}</Typography>


           {cart.map((item)=>{
                let name=""
                let price=0;
                name = groceries.find(grocery=> item.id===grocery[0].id)[0].name
                price = groceries.find((grocery)=> item.id===grocery[0].id  )[0].price                        
                console.log(item.id)
                return(
                    <Card className={classes.card} variant="outlined" style={{backgroundColor:"#f8f8ff"}}>
                        <CardContent style={{textAlign: 'left'}}>                    
                            <Typography><strong>Item:</strong>{name}</Typography>      
                            <Typography><strong>Quantity:</strong>{item.quantity}</Typography>
                            <Typography><strong>Price:</strong>${item.quantity * price}</Typography>
                        </CardContent>
                        <CardActions style={{justifyContent: 'flex-end'}}>
                            <Button value={item.id} color="primary" size="small" onClick={(e)=>RemoveFromCart(item.id, item.quantity)}>Remove</Button>
                        </CardActions>
                    </Card>  
                )
            })}
       </Container>
   )
   }