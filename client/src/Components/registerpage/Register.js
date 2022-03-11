import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Register.css'
import {Link} from 'react-router-dom'
import { SiAwsamplify } from "react-icons/si";
const Register = () => {
  const history = useHistory()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:8000/music/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })

    const data = await response.json()
    console.log(data.password);

    if (data.status === 'ok') {
      alert("User successfully Created!!!")
      history.push('/login');
    } else if(data.status==='error'){
      alert(data.message);
    }
  }
  return (
    <div className="wrapper">
      <h1 className="register-header">REGISTER</h1>

      <div className="login-inputs">
        <form onSubmit={registerUser} >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder="Enter your username" />
          <br />
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder="Enter your email address" />
          <br />
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder="Enter your password" />
          <br />
          <br />
          <input type="submit" value="Register" className='loginbtn' />
        </form>
      </div>
      <button className="loginbtn"><Link to ='/'><SiAwsamplify />Go to Dashboard</Link></button>

    </div>
  )
}

export default Register;
