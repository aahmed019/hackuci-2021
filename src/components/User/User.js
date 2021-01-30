import React, {useEffect, useState} from "react"
import {Container, Card, Button, Alert} from "react-bootstrap"
import {useAuth} from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Fire from '../../firebaseConfig'

export default function Users(){

  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  let database = Fire.db
  const [userName, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [hours, setHours] = useState(0);
  const [Balance, setBalance] = useState(0);


  const getData = async() =>{
      
    database.getCollection('Users').doc(currentUser.email).get().then(function(doc){
        if(doc.exists){
          setEmail(doc.data().email)
          setUsername(doc.data().username);
          setName(doc.data().name);
          setBalance(doc.data().balance);
        }
        else{
          return;
          //console.log('no doc found')
        }
      })
      
      database.getCollection('Volunteers').doc(currentUser.email).get().then(function(doc){
        if(doc.exists){
          setEmail(doc.data().email);
          setName(doc.data().name);
          setUsername(doc.data().username);
          setPosition(doc.data().Position);
          setHours(doc.data().hours)
        }
        else{
          console.log('no doc found')
        }
      })
}

  useEffect(() =>{
    getData()
},[])


  async function handleLogout() {
    setError("")
    setEmail('')
    try {
      await logout()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }

    return (
        <Container className = "d-flex align-items-center justify-content-center" style ={{minHeight: "50vh", background: "red", maxWidth:"25vw", margin:'auto'}}>
            <div className ="w-100" style = {{ maxWidth: '400px', textAlign:'center'}}>
                <Card className = "row justify-content-center" style={{background:'purple', justifyContent:'center', margin:'auto'}}>
                    <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {position === '' ?                    
                    <div>  
                        <div>
                            <strong>Email:</strong> {email}<br/>
                            <strong>Username:</strong> {userName}<br/>
                            <strong>Name:</strong> {name}<br/>
                            <strong>Balance:</strong> {Balance}<br/>
                            <strong>Orders:</strong> {}<br/>
                        </div>
                    </div>:
                    <div>
                            <strong>Email:</strong> {email}<br/>
                            <strong>Username:</strong> {userName}<br/>
                            <strong>Name:</strong> {name}<br/>
                            <strong>Hours:</strong> {hours}<br/>
                    </div>
                  }
                  
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <Button variant="link" onClick={handleLogout} className="font-text">
                    Log Out
                    </Button>
                </div>
            </div>
        </Container>
    )
}