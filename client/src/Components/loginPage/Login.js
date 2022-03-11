import React,{useState} from 'react'
import './Login.css'
import {Link} from 'react-router-dom'
import { SiAwsamplify } from "react-icons/si";

const Login = () => {
    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

    async function loginUser(event){
        event.preventDefault();

        const response = await fetch('http://localhost:8000/music/login',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                email,
                password,
            }),
        })

        const data = await response.json();

        if(data.success===true){
            localStorage.setItem('token',data.token);
            alert("Login Successful");
            window.location.href='/application';
        }
        else {
            alert('Invalid Login Credentials');
        }
    }
    return (
        <div className="wrapper">
            <h1 className="login-header">LOGIN</h1>
            <form onSubmit={loginUser} className='login'>
            <div className="login-inputs">
                 <input 
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 type='email' 
                 placeholder="Enter your email address" />
                 <br/>
                 <br/>
                 <input 
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 type='password' 
                 placeholder="Enter your password" />
                 <br/>
                 <br/>
                 <input type="submit" value="Login" className='loginbtn'/>
            </div>
            </form>
            <button className="loginbtn"><Link to ='/'><SiAwsamplify />Go to Dashboard</Link></button>
        </div>
    )
}

export default Login;