import React, {  useState, useEffect } from 'react';
// import './OrderPage.css'
import Order from './Order/Order.js'
import CheckOut from './CheckOutPage/CheckOutPage'
import Success from './SuccessPage/SuccessPage'
import Fire from '../../firebaseConfig.js'
import { useAuth } from '../../contexts/AuthContext'




export default function OrderPage(){
 
  
    const [step,setStep]= useState(1)
    const [cart,setCart]= useState([])
    const [GID,setGID]= useState("")
    const [GNum,setGNum]= useState(1)
    const [notes,setNotes]= useState("")
    const [address,setAddress]= useState("")
    const [balance,setBalance]= useState(0)
    const [total,setTotal]= useState(0)
    const [city,setCity]= useState("")
    const [state,setState]=useState("")
    const [postalCode,setPostalCode]= useState("")
    const [time,setTime]= useState("")      
    const[groceries,setGroceries]=useState([])
    const [UserName,setUserName]= useState("")
    const [TotalSpent,setTotalSpent] = useState(0)
    const [totalOrders,setTotalOrders]= useState(0)
    const db =Fire.db;

    const{currentUser}=useAuth();

    const getData = async() =>{ 
        if(currentUser === null)
        {return null;} // check if currentUser is logged in or not 
        else{
        db.getCollection("Users").doc(currentUser.email).get().then(doc => {

            if(doc.exists){
                const data = doc.data();
                setTotalOrders(data.orderHistory.length);
                setUserName(data.name);
                setBalance(data.Balance);
                
            }
            else if (!doc.exists)
            {
                return null;
            }
        }).then(()=>{
            db.getCollection("Volunteers").doc(currentUser.email).get().then(doc => {

                if(doc.exists){
                    const data = doc.data();
                    setTotalOrders(data.orderHistory.length);
                    setUserName(data.name);
                    setBalance(data.Balance);
                    
                }
                else if (!doc.exists)
                {
                    return null;
                }
            })
        }).then(()=>{
            
            db.getCollection("Groceries").get().then(snapshot => {
                let drink = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    drink.push([data, doc.id]);
                })
                // console.log(drink);
                setGroceries( drink);
        })}).catch(error => console.log(error))
    }

   
}

    useEffect(()=>{

        getData();

    },[])
    function AddToCart(fid,fquantity) {
        let newCart = cart;
        console.log("fid: "+fid+"\n"+"fquantity: "+fquantity);
        if(fid ==="")
        { alert("Please choose something from the list ! ")}
        else{
        fquantity = parseInt( fquantity);
       
         if( newCart.find(item=> item.id === fid) === undefined)
         {
            newCart.push({id:fid, quantity: fquantity})
         }
         else
         {
            newCart.find(item => {if(item.id === fid){
                item.quantity = item.quantity + fquantity
            }})
         }
         CalculateTotal();
         getData();
        }
       
        setCart( newCart);
        console.log(JSON.stringify(cart));
        
    }
    function  CalculateTotal(){
    
        let totalcost=0;
        let price = 0;
   
         cart.map(item=>{

             price = groceries.find((grocery)=> item.id===grocery[0].id  )[0].price
            
          
            totalcost = totalcost + (price* item.quantity)
            })

         setTotal(totalcost)
        
        
    }
    function UpdateBalance(){
        if(balance < total)
        {
            alert("Insufficient fund.")
        }
        else if(balance === 0)
        {
            alert("Your balance is 0")
        }
        else{
            let bal= balance;
            let cost = total;
            bal = bal- cost;
            setBalance( bal)
            alert("Your order has been placed !")
        }
    }
   function NextStep(){
       
        setStep( step+1);
    }
    function PrevStep(){
       
        setStep( step-1);
    }
    function startOver()
    {
        setCart([]);
        setStep(1);
        setAddress("");
        setTime("");
        setNotes("");
        setTotal(0);    
    }
    const handleChange = e=> {
        switch(e.target.name)
        {
            case "GID": setGID(e.target.value);break
            case "GNum": setGNum(e.target.value);break
            case "notes": setNotes(e.target.value);break
            case "address": setAddress(e.target.value);break
            case "city": setCity(e.target.value);break
            case "state": setState(e.target.value);break
            case "postalCode": setPostalCode(e.target.value);break
            case "cart": setCart(e.target.value);break
            case "time": setTime(e.target.value);break
            case "total": setTotal(e.target.value);break
            case "balance": setBalance(e.target.value);break
            default: console.log("Error in setStates")
        }  


        
    }
    function RemoveFromCart(id){
        let newCart = cart;
        let Groceries =groceries;
        let reduce 
        let totalnew= total;
     
         reduce = Groceries.find((grocery)=> id===grocery[0].id  )[0].price
        
        totalnew = totalnew - reduce
 
        
        newCart= newCart.filter((item) => item.id !== id);

        setCart( newCart);
        setTotal(totalnew);
        getData();
        
    }
   
      
        const values= {GID,GNum,notes,address,city,state,postalCode,total,time}
        const checkoutvalues={cart,address,city,state,postalCode,time,total,notes,balance,UserName,TotalSpent,totalOrders}
        if(currentUser !== null)
        {   
            switch(step)
            {
           case 1: return (    <div>
                               <Order 
                               NextStep={NextStep}
                               cart={cart}
                               handleChange={handleChange}
                               AddToCart={AddToCart}
                               RemoveFromCart={RemoveFromCart}
                               values={values}
                               groceries ={groceries}
                               />

                               </div>)
           case 2: return(     <div>
                               <CheckOut 
                               CalculateTotal={CalculateTotal}
                               checkoutvalues={checkoutvalues}
                               groceries ={groceries}
                               NextStep={NextStep}
                               PrevStep={PrevStep}
                               handleChange={handleChange}
                               RemoveFromCart={RemoveFromCart}
                               UpdateBalance={UpdateBalance}
                               />

                               </div>)
           case 3: return(     <div>
                               <Success
                               checkoutvalues={checkoutvalues}
                               getData={getData}
                               startOver={startOver}
                               />   
                               </div>
                           )
           default: return(
                               <div>
                                   <Order 
                                   NextStep={NextStep}
                                   handleChange={handleChange}
                                   AddToCart={AddToCart}
                                   checkoutvalues={checkoutvalues}
                               />

                               </div>
           )
         }

        }
        else 
        {
            return(
                <div >
                <div className="background-boi">
                <h1>You need to be logged in to view this page</h1>
                </div>


                </div>
           )
        }

    }
