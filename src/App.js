import logo from './logo.svg';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Confirmation from './components/Confirmation/Confirmation';
import {BrowserRouter,Switch, Route, Redirect} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import './App.css';
import Users from './components/User/User'
import OrderPage from './components/Order/Order';

function App() {
  return (
    <div className="App">
       <AuthProvider>  
  
      <BrowserRouter>
          <Switch>
            <Route path='/Login' component={Login}/>
            <Route path='/SignUp' component={SignUp}/>
            <Route path="/Home" />
            <Route path="/User" component={Users}/>
            <Route path="Volunteer"/>
            <Route path="/Order" component={OrderPage}/>
            <Route path="/Confirmation" component={Confirmation}/>
            <Redirect from="/" to="/Login"/>
          </Switch>
      
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
