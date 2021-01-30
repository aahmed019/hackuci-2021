import logo from './logo.svg';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Confirmation from './components/Confirmation/Confirmation';
import {BrowserRouter,Switch, Route} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import './App.css';
import Users from './components/User/User'

function App() {
  return (
<<<<<<< HEAD
    <div>
      <Users/>
=======
    <div className="App">
       <AuthProvider>  
      <BrowserRouter>
      
          <Switch>
            <Route path='/Login' component={Login}/>
            <Route path='/SignUp' component={SignUp}/>
            <Route path="/Home" />
            <Route path="/User"/>
            <Route path="Volunteer"/>
            <Route path="/Confirmation" component={Confirmation}/>
          </Switch>
      
      </BrowserRouter>
      </AuthProvider>
>>>>>>> c0467f39f394c437dc4aaaefd63c42724245a2e9
    </div>
  );
}

export default App;
