import React,{useEffect,useState} from 'react'
import { useAuth } from '../../contexts/AuthContext';
import {Row,Col} from 'react-bootstrap'
import Fire from '../../firebaseConfig'
import Radar from 'radar-sdk-js';
import firebase from 'firebase'

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

export default function DeliveryPage(props){

    const classes = useStyles();
    
    Radar.initialize('prj_live_pk_cbe4543a49822e43c633ef14259d23bf76fa1eb7')
    const db =Fire.db;
    const{currentUser}=useAuth()
    const[orders,setOrder] = useState([])
    const[staffEmail,setStaffEmail]=useState("")
    const[staffType,setType]= useState("")
    const[distance,setDistance]= useState(0)
    const[groceries,setGroceries]=useState([])
    const[original, setOriginal] = useState({})
    const[destination, setDestination] = useState({})
    const[volAddress, setVolAddress] = useState('')
    const[ordAddress, setOrdAddress] = useState('')
   // const [cart,setCart]= useState([])

    function first(address){
     Radar.autocomplete({
        query: address,
        limit: 1
      }, function(err, result) {
        if (!err) {
            setOriginal({...result.addresses})
        }
      });
      second()
   }

    async function second(){
     Radar.autocomplete({
        query: volAddress,
        limit: 1
      }, function(err, result) {
        if (!err) {
            setDestination({...result.addresses})
        }
      })   
    }

  
    function getDist(){
    
     Radar.getDistance({
        origin: {
          latitude: original[0].latitude,
          longitude: original[0].longitude
        },
        destination: {
            latitude: destination[0].latitude,
            longitude: destination[0].longitude
        },
        modes: [
          'foot',
        ],
        units: 'imperial'
      }, function(err, result) {
        if (!err) {
            setDistance(result.routes.foot.distance.text)
        }
        else{
            console.log(err)
        }
      });
   }

    const Bid=(OID)=>{
        let taken="a";
       // alert(taken)
        if(staffType==="Volunteer")
        {
        
        db.getCollection('Orders').doc(OID).get().then((doc)=>{
            if(doc.exists)
            {
                taken = doc.data().deliverer;
               // alert(taken)
            }
        }).then(()=>{
            // this is to make sure when both deliverers bid for the same order, the later 
            // guy didnt over write the order thats already taken by the first guy.
            // I pulled it from db again because state takes longer to refresh and one has to bid for it which would
            // overwrite the prior data if the order is already taken
            if(!taken)
            {
                db.getCollection('Orders').doc(OID).update({
                deliverer: staffEmail
                }).then(() =>{
                    db.getCollection('Volunteers').doc(staffEmail).update({
                        hours: firebase.firestore.FieldValue.increment(parseFloat(distance) * 2)
                        })
                })
               // updateCart(OID)
            }
            else{
                alert("The order has already been taken")
            }
        }).catch(error=>console.log("Error: ",error))
        getData();
        }
        else{
            alert("Only driver can bid on the order.")
        }
    }

    useEffect(()=>{
        getData()
    },[])

    const getData=()=>{
             db.getCollection("Volunteers").doc(currentUser.email).get().then(doc => {
            
            if(doc.exists){
                const data = doc.data();
                setStaffEmail(data.email)
                setType(data.Position)
                setVolAddress(data.address)
            }
            else
            {
                alert("No information available")
            }
        }).then(() => {
            console.log('HHHHHHHHHHHHHHHHHHHH')
            console.log(volAddress)
        }).then(()=>{
            let order = [];
             db.getCollection("Orders").where('type','==','delivery').get().then(snapshot => {
               
                snapshot.forEach(doc => {
                    const data = doc.data();
                    order.push([data, doc.id]);
                })
                //alert(JSON.stringify(order))
                order = order.filter(item=> item[0].deliverer === "")
                console.log(JSON.stringify(order))
                setOrder(order)


        })}).then(()=>{
            db.getCollection("Groceries").get().then(snapshot => {
                let d = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    d.push([data, doc.id]);
                })
                setGroceries(d)
        })}).catch(error=> console.log("Error: ",error))

        
    }

    const showorda = orders
    if(showorda.length){
    //console.log(JSON.stringify(showorda))
    return(
        <Container className = {classes.container}>
            <Typography variant="h5" component="h1"><strong>Delivery</strong></Typography><br></br>
            {showorda && showorda.map((data,i) => {
                return(
                    <div style = {{paddingBottom:'5vh'}}>
                        <Card className={classes.root} variant="outlined" style={{backgroundColor:"#f8f8ff"}}>
                            <CardContent style={{textAlign: 'left'}}>
                                <Typography variant="h5" component="h2"><strong>Order ID:</strong>{data[1]}</Typography>
                                <Typography><strong>Name:</strong>{data[0].userName}</Typography>      
                                <Typography><strong>Address:</strong>{data[0].address}</Typography>
                                {data[0].items.map(item=>{
                                    let price;
                                    let obj=[];

                                    obj=groceries.filter(m=>m[0].id === item.id)[0]
                                    if(obj)
                                        price=obj[0].price

                                    return(
                                        <div>
                                            <Typography><strong>Items:</strong>{item.id}</Typography>
                                            <Typography><strong>Quantity:</strong>{item.quantity}</Typography>
                                            <Typography><strong>Price:</strong>{price}</Typography>
                                        </div>
                                    )
                                })}
                                <Typography><strong>Total:</strong>${data[0].total}</Typography>
                                <Typography><strong>Distance:</strong>{distance}</Typography>      
                                <Typography><strong>Total Hours:</strong>{parseFloat(distance) * 2}</Typography>
                            </CardContent>
                            <CardActions style={{justifyContent: 'flex-end'}}>
                                <Button color="primary" size="small" onClick={() => first(data[0].address)}>Get Coords</Button>
                                <Button color="primary" size="small" onClick={() => getDist()}>Get Distance</Button>
                                <Button color="primary" size="small" onClick={()=>Bid(data[1])} >Bid</Button>
                            </CardActions>
                        </Card>
                    </div>
                )
            })}
        </Container>
    )}else{
        return(
            <Container className = {classes.container}>
                <Typography variant="h5" component="h1"><strong>Delivery</strong></Typography>
                <Typography variant="h5" component="h2"><strong>No Orders Available</strong></Typography>
            </Container>
        )
    }
}