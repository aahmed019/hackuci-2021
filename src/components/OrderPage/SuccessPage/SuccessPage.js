import React, { useEffect} from 'react';
import Button from 'react-bootstrap/Button'
import { useAuth } from '../../../contexts/AuthContext';
import Fire from '../../../firebaseConfig';
import firebase from 'firebase/app';


export default function SuccessPage (props){
            const {currentUser}= useAuth();
            const {checkoutvalues} = props;

            const {
                cart,
                balance,
                address,
                city, 
                state, 
                postalCode, 
                total,
                notes,
                time,
                UserName
                } = checkoutvalues;

            const db = Fire.db;

            const next= e=>{
                e.preventDefault();
                props.startOver();
            }
            

            useEffect(() =>{                
                //console.log(JSON.stringify(currentUser))
                    changeBalance(currentUser.email)
                    .then(()=> updateOrderHistory(currentUser.email))
                    .then(()=>addNewOrder("delivery"))
                    .then(()=>{ 
                          console.log('Order placed ! ')
                            })
                    .catch(error=>console.log("Error: ",error))   
            },[])
            
            async function changeBalance(userEmail){
                await db.getCollection('Users').doc(userEmail).update({
                    Balance:balance
                }).then(function() {// went through
                    console.log("Approved!");
                })
                .catch(function(error) { //broke down somewhere
                    console.error("Error: ", error);
                });    
            }


            async function updateOrderHistory(userEmail){
                

                    await db.getCollection('Users').doc(userEmail).update({
                        orderHistory: firebase.firestore.FieldValue.arrayUnion(
                        {   
                            type:"delivery",
                            cart:cart,
                            timestamp:new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString(),
                            address:address + city + state+ postalCode,
                            pickupTime:"",
                            total:total,
                            notes:notes
                            }
                        )
                    }).then(function() {// went through
                        console.log("Approved!");
                    })
                    .catch(function(error) { //broke down somewhere
                        console.error("Error: ", error);
                    });
                }
                 
            
            
            async function changeBalance(userEmail){
                await db.getCollection('Users').doc(userEmail).update({
                    Balance:balance
                }).then(function() {// went through
                    console.log("Approved!");
                })
                .catch(function(error) { //broke down somewhere
                    console.error("Error: ", error);
                });    
            }
            function addNewOrder(type){
                //console.log("UserName:", UserName)
                db.getCollection('Orders').doc().set({
                        address: address+" ,"+city+" ,"+state+" ,"+postalCode,
                        date: new Date().toLocaleDateString(),
                        type:type,
                        deliveredDate:"",
                        deliverer:"",
                        pickupTime:time,
                        items: cart,
                        total:total,
                        user: currentUser.email,
                        userName: UserName,
                        notes: notes
                    })
                    .then(function() {// went through
                        console.log("Approved!");
                        
                    })
                    .catch(function(error) { //broke down somewhere
                        console.error("Error: ", error);
                    });
                }
               
                return(
                    <div className="CheckOut">
                    <h1>Thank you very much !</h1>
                    <div>
                    <Button variant="primary"  name="step" value={0} onClick={next}>Order Again</Button>
                    </div>
                </div>
                )
            }