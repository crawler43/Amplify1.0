import React from 'react'
import './Dashboard.css'
import {Link} from 'react-router-dom'
import { SiAwsamplify } from "react-icons/si";

const mainPage = () => {
  return (
    <div className="main-page">
      <h1><Link to ='/'><SiAwsamplify /></Link>{" "}AMPLIFY</h1>
      <div className="content-box">
        <p>ONE GOOD THING ABOUT MUSIC,WHEN IT HITS YOU,YOU FEEL NO PAIN <br />-BOB MARLEY</p>
        <img src='https://i.pinimg.com/originals/f8/6e/8f/f86e8f5581cd8ac92a7437dabd17b9dc.jpg' alt="no preview available" />
      </div>

      <div className="buttons" >
        <button className="btn1">
          <Link to='/register' className='link'>Register</Link>
        </button>
        <button className="btn2">
          <Link to='/login' className='link'>Login</Link>
        </button>
      </div>
    </div>
  )
}

export default mainPage;