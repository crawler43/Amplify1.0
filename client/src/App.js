import React,{useState,useEffect} from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';
import Music from './Components/mainpage/MainPage'
import AddMusic from './Components/addMusic/AddMusic'
import Login from './Components/loginPage/Login'
import Register from './Components/registerpage/Register'
import Dashboard from './Components/dashboard/Dashboard'
import Logout  from './Logout'
import PrivateRoute from './Components/PrivateRoute'
import './App.css';

function App() {
  const[music,setMusic] =useState([]);
  useEffect(()=>{
    axios.get('http://localhost:8000/music')
    .then(res=>setMusic(res.data))
    .catch(err=>console.log(err))
  },[])
  return (
    <div >
      <Route exact path='/' component ={Dashboard}/>
      <Route exact path='/login' component ={Login}/>
      <Route exact path='/register' component ={Register}/>
      <PrivateRoute exact path='/application' render ={()=><Music music={music}/> } />
      <PrivateRoute exact path ='/addmusic' component ={AddMusic}/>
      <Route exact path='/logout' component ={Logout}/>
    </div>
  );
}

export default App;
