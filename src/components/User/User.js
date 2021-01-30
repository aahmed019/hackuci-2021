import React, {useState} from "react"
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
                    <Button variant="link" onClick={() => console.log("eat")} className="font-text">
                    Log Out
                    </Button>
                </div>
            </div>
        </Container>
    )
}