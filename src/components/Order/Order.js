import React, {useEffect, useState} from 'react';
import Fire from '../../firebaseConfig';
import {Col, Row} from "react-bootstrap";

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
        paddingTop: '15vh',
        maxWidth: '90vw',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '50vw'
        }
    }
  }));

export default function OrderPage(){

    const classes = useStyles();

    const[FoodItems, setFoodItems] = useState([])
    let database = Fire.db;
    const getData = async() =>{
        const foodItems = []
        database.getCollection('Food').get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                foodItems.push(doc.data())
            });
            database.getCollection('Drinks').get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    foodItems.push(doc.data())
                });
            
            setFoodItems(foodItems)
        }).catch(function(error){
            console.log(error)
        })
            
        }).catch(function(error){
            console.log(error)
        })
    }
    useEffect(() =>{
        getData()
    },[])  

    return(
        <Container className = {classes.container}>
            {FoodItems.map(function(item, i){
                {console.log(item)}
                return(
                    <div style = {{paddingBottom:'5vh'}}>                    
                        <Card className={classes.root} variant="outlined" style={{backgroundColor:"#f8f8ff"}}>
                            <CardMedia
                                className={classes.media}
                                image={item.url}
                            />        
                            <CardContent style={{textAlign: 'left'}}>
                                <Typography variant="h5" component="h2"><strong>{item.name}</strong></Typography>      
                                <Typography><strong>Price:</strong> ${item.price}</Typography>
                                <Typography><strong>Quantity:</strong>{item.count}</Typography>
                            </CardContent>
                            <CardActions style={{justifyContent: 'flex-end'}}>
                                <Button color="primary" size="small">Add to Cart</Button>
                            </CardActions>
                        </Card>
                    </div>
                )
            })}
        </Container>
    // <div className='chef-background-boi'>
    //             <h2>All items:</h2>
    //     <Row>
    //             {FoodItems.map(function(item, i){
    //              return  <Card style={{ width: '18rem', marginLeft: "2%", marginTop:"2%"}}>
    //                 <Card.Img style={{height:"50%"}}variant="top" src={item.url} />
    //                 <Card.Body>
    //                     <Card.Title>{item.name}</Card.Title>
    //                     <Card.Title>Price: ${item.price}</Card.Title>
    //                     <Card.Title>Quantity: {item.count}</Card.Title>
                        
                        
    //                     <Card.Text>
    //                     {item.description}
    //                     </Card.Text>
    //                 </Card.Body>
    //                 <button>Add to cart</button>
    //                 </Card>
    //             })} 
    //             </Row> 
    //         </div>
    )
}