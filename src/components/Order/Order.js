import React, {useEffect, useState} from 'react';
import Fire from '../../firebaseConfig';
import {Card, Row} from "react-bootstrap";

export default function OrderPage(){
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

    return(<div>
                <h2>All items:</h2>
        <Row>
                {FoodItems.map(function(item, i){
                 return  <Card style={{ width: '18rem', marginLeft: "2%", marginTop:"2%"}}>
                    <Card.Img style={{height:"50%"}}variant="top" src={item.url} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Title>Price: ${item.price}</Card.Title>
                        <Card.Title>Quantity: {item.count}</Card.Title>
                        
                        
                        <Card.Text>
                        {item.description}
                        </Card.Text>
                    </Card.Body>
                    <button onClick >Add to cart</button>
                    </Card>
                })} 
                </Row> 
            </div>)
}