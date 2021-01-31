import React, { useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../../contexts/AuthContext';
import Fire from '../../../firebaseConfig';
import firebase from 'firebase/app';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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

export default function SuccessPage (props){

    const classes = useStyles();

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
                    <Container className = {classes.container}>
                        <Typography variant="h5" component="h1"><strong>Thank you very much!</strong></Typography><br></br>
                        <Button color="primary" size="small" onClick={next}>Order Again</Button>
                    </Container>
                )
            }