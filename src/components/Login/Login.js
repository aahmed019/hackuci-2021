import React, { useRef, useState}from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory, Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {FormControlLabel, RadioGroup , Radio} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Fire from '../../firebaseConfig';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },

  }));

export default function Login(props){

    const classes = useStyles();
    
    const [loginType, setLogInType] = useState('Users');
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    let database =Fire.db;


  async function checkUser(){
      await database.getCollection(loginType).doc(emailRef.current.value).get().then(function(doc){
        console.log(doc.data());
          if(doc.exists){
              if(doc.data().Position === 'Volunteer'){
                history.push('/Volunteer');
              }
              else{
                history.push('/User')
              }
            }
          else{
            return;
          }
      })
  }
    
    async function handleSubmit(e){
        e.preventDefault()
        console.log("in handleSubmit")
        console.log("emailRef " + emailRef.current.value)
        console.log("passwordRef " + passwordRef.current.value)
        
       
            setError('')
            setLoading(true)
             login(emailRef.current.value, passwordRef.current.value).then(()=>{
              checkUser();
             })
             .catch(err => console.log)
           
            
            
            //history.push('/User')

        setLoading(false)
    }

    return(
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Sign in</Typography>
          <form className={classes.form} noValidate onSubmit ={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              inputRef={emailRef}
              autoFocus

            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              inputRef={passwordRef}
              autoComplete="current-password"

            />
                                    <RadioGroup>
                            <FormControlLabel
                                control={<Radio   />}
                                label="Sign In as a Volunteer"
                                value="Volunteers"
                                onClick={()=>{ ;setLogInType('Volunteers')}}
                            />
                            <FormControlLabel
                                control={<Radio />}
                                value="Users"
                                onClick={()=>{setLogInType('Users')}}
                                label="Sign In as a User"
                            />
                        </RadioGroup>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >Sign In</Button>
            <Grid container>
              <Grid item>
                <Link variant="body2" to ="/SignUp">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
        
      </Container>
    );
}