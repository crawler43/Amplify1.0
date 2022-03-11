import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import './AddMusic.css'
import{Link} from 'react-router-dom'
import { BsFillFilterCircleFill} from 'react-icons/bs'
import { FcHome} from 'react-icons/fc'

const AddMusic = () => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [fileName, setFileName] = useState('');


    const onChangeFile = (e) => {
        setFileName(e.target.files[0]);
    }
    const changeOnClick = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("artist", artist);
        formData.append("musicFile", fileName);
        if(title.length===0 || artist.length===0)
        {
            alert("Please add all the required fields");
        }
        else{
        axios.post("http://localhost:8000/music/addMusic", formData)
            .then(alert("Music File Added Successfully!!"))
            .catch(err => console.log(err));
        }
        
    };
    return (
        <div>
            <h1 className='header'><Link to ='/application'><BsFillFilterCircleFill /></Link>{" "}ADD MUSIC</h1>
            <form onSubmit={changeOnClick} encType='multipart/form-data'>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter Title of the track" />

                </div>
                <br/>
                <div className="form-group">
                    <label >Artist</label>
                    <input
                        type="text"
                        onChange={(e) => setArtist(e.target.value)}
                        className="form-control"
                        placeholder="Enter Artist Name..." />
                </div>
                <br/>
                <div className="form-group">
                    <label >Choose a music File</label>
                    <input
                        type="file"
                        fileName="musicFile"
                        className="form-control"
                        onChange={onChangeFile} />
                </div>
                <br/>

                <button type="submit" className="btn btn-primary">Add Music</button>
            </form>
            <br/>
            <button className='redirect'>
            <Link to ='/application'>Return to Music page <FcHome id="home-icon"/></Link>
            </button>
        </div>
    )
}

export default AddMusic;
