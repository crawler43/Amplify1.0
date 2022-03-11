import React, { useState } from 'react'
import './MainPage.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BsFillFilterCircleFill } from "react-icons/bs";
import { ImFileMusic } from "react-icons/im";
import { FcEmptyTrash } from "react-icons/fc";


const MainPage = ({ music }) => {
    const [music1, setMusic1] = useState([]);
    //DELETE BY ID 
    const deleteMusic = (id) => {
        axios.delete(`http://localhost:8000/music/${id}`)
            .then(res => alert(res.data))
        setMusic1(music1.filter(elem => elem._id !== id));
    }
    return (
        <div className='items'>
            <div>
                <h1 className="header"><Link to='/application'><BsFillFilterCircleFill /></Link>{" "}MUSIC TRACKS AVAILABLE <button className="btn-logout">
                    <Link to ='/logout'>Log out</Link>
                    </button> 
                </h1>

            </div>
            <div className='test'>
                {
                    music.map((val, idx) => {
                        return (
                            <div className='music-card' key={idx}>
                                <div className='music-card-display'>
                                    <h3>{val.title} by {val.artist} </h3>
                                    <audio controls>
                                        <source src={`./uploads/${val.musicFile}`} type="audio/mp3" />
                                    </audio>

                                    <br />
                                    <button onClick={() => deleteMusic(val._id)} className='modify-btn'><FcEmptyTrash id="icon" /></button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <button className="addButton"><Link to='/addMusic' >Add New Music <ImFileMusic /></Link></button>
           

        </div>
    )
}

export default MainPage;