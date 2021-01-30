import React, {useEffect, useRef, useState}from 'react'
import {Form, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import Fire from '../../firebaseConfig';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


export default function SignUp(){

    const classes = useStyles();
    const emailRef = useRef();
    const userRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [signUpType, setSignUpType] = useState('User');

    const history = useHistory();
    let db = Fire.db;

    useEffect(()=>{},[error]);

    async function handleSubmit(e){
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('passwords do not match')
        }
            setError('');
            setLoading(true);

            await signup(emailRef.current.value, passwordRef.current.value).then(response =>{

                db.getCollection('SignUp').doc(emailRef.current.value).set({
                    username: userRef.current.value,
                    password: passwordRef.current.value,
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                    name: nameRef.current.value,
                    hours: 0,
                    balance: 0,
                    orderHistory: [],
                    }).then(() => {
                        console.log('Sign up Successful !');
                    })
                    .catch(error => {                           
                        console.error("Error writing document: ", error);
                        setError(error);
                        
                    });

            }).catch(error=> {
                console.log(error.message);
                setError(error.message);
            });
            history.push('/Confirmation')
        setLoading(false)
    }

    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit ={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        autoComplete="name"
                        name="fullName"
                        variant="outlined"
                        required
                        fullWidth
                        id="full Name"
                        label="Full Name"
                        autoFocus
                        inputRef={nameRef}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        autoComplete="username"
                        name="userName"
                        variant="outlined"
                        required
                        fullWidth
                        id="userName"
                        label="Username"
                        autoFocus
                        inputRef={userRef}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        inputRef={emailRef}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputRef={passwordRef}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="passwordConfirmation"
                        label="Confirm Password"
                        type="password"
                        id="passwordConfirmation"
                        autoComplete="current-password"
                        inputRef={passwordConfirmRef}
                    />
                    </Grid>
                    <Grid item xs={12}>                        
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="Sign Up as a Volunteer"
                        />
                        <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            single
                            type="file"
                            />
                            <label htmlFor="raised-button-file">
                            <Button variant="raised" component="span" className={classes.button}>
                                Upload Work Permit
                            </Button>
                        </label> 
                    </Grid>                    
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link variant="body2" to ="./Login">
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
        </Container>
    );
}