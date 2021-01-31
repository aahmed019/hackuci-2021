import React,{useEffect,useState} from 'react'
import { useAuth } from '../../contexts/AuthContext';
import {Row,Col,Button, Container} from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Fire from '../../firebaseConfig'
import Radar from 'radar-sdk-js';

export default function DeliveryPage(props){
    
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
    if(showorda.length)
    {
    //console.log(JSON.stringify(showorda))
    return(
    <div>
    <div>
    <br/>
    <br/>
    <br/>
    <br/>
   
    <h1>Delivery Page</h1>
    
        
     {
      
      showorda && showorda.map((data,i) => {
        return( <Row className="DRows" key={i} >
                <Col xs="auto" >
                <Card
                    bg='Dark'
                    key={i}
                    style={{ width: '100%' }}
                     className="mb-2"
                 >
                    <Card.Header style={{display: 'flex',flexDirection: 'row',alignItems:'center',justifyContent:'space-between' }}>
                        <span>Order : {data[1]} 
                        </span>
                        <span>
                        <Button variant="primary"   onClick={()=>Bid(data[1])} >Bid</Button>

                        <h1>{distance}</h1>
                        <h1>{parseFloat(distance) * 2} hours in total!</h1>
                        <button onClick={() => first(data[0].address)}>Get Coords</button>
                        <button onClick={() => getDist()}>Get Distance</button>

                        </span>
                    </Card.Header>
                    
                    <Card.Body>
                        <p>Name:  {data[0].userName}</p>
                        <p>Address: {data[0].address}</p>
                        <Row className="DRows">
                            <Col xs={4}>Items</Col>
                            <Col xs={4}>Quantity</Col>
                            <Col xs={4}>Price/unit</Col>
                        </Row>
                        
                         {
                        data[0].items.map(item=>{
                            let price;
                            let obj=[];
                           
                                obj=groceries.filter(m=>m[0].id === item.id)[0]
                                if(obj)
                                price=obj[0].price


                            return(<Row key={item.id} className="DRows"> 
                                    <Col xs={4}>
                                        {item.id}
                                    </Col>  
                                    <Col xs={4}>
                                        {item.quantity}
                                    </Col>
                                    <Col xs={4}>
                                        {price} 
                                    </Col>
                                   </Row>)})
                        } 
                        
                        <Row className="DRows">
                            <Col xs={4}></Col>
                            <Col xs={4}><strong>Total:</strong></Col> 
                            <Col xs={4}>$ {data[0].total}</Col>
                        </Row>
                    </Card.Body>
                </Card>
                </Col>
                    
                        
                </Row>
              )})}
    


    
   
    </div>
    </div>)
    }
    else{
        return(<div>
            <div>
           <br/>
           <br/>
           <br/>
           <br/>
            <h1>Delivery Page</h1>
            <h4>
                No orders available
            </h4>
            </div>
            </div>
            )
    }
}