import React, {useEffect, useState} from "react"
import {Container, Alert} from "react-bootstrap"
import {useAuth} from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Fire from '../../firebaseConfig'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

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

export default function Users(){

  const classes = useStyles();

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
          setPosition(doc.data().position);
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
      <Container className = {classes.container}>
        <Card className={classes.root} variant="outlined" style={{backgroundColor:"#f8f8ff"}}>
          <CardMedia
            className={classes.media}
            image="https://i.pinimg.com/originals/cd/e0/e8/cde0e8982705d5dddd9c7b5a58bec576.jpg"
            title="Scary Spider"
          />        
          <CardContent style={{textAlign: 'left'}}>
            <Typography variant="h5" component="h2"><strong>Username:</strong> {userName}</Typography>
            <Typography><strong>Email:</strong> {email}</Typography>      
            <Typography><strong>Name:</strong> {name}</Typography>
          </CardContent>
          <CardActions style={{justifyContent: 'flex-end'}}>
            <Button color="primary" size="small" onClick={handleLogout}>Log Out</Button>
          </CardActions>
        </Card>
      </Container>
    )
}