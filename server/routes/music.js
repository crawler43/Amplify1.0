const express = require('express');
const multer = require('multer');
const router = express.Router();
const Music = require('../models/music');
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const {isAuth} = require("../middleware/auth");
require('dotenv').config();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    }
})
const upload = multer({ storage: storage });

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ status:'error',message: "Please fill all the required fields" });
    }
    const existingUser = await User.findOne({ email: email, password: password });

    if (existingUser) {
        return res.status(400).json({ success: false, message: "Email Id is already registered " });
    }
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ name: name, email: email, password: passwordHash });
        res.status(201).json({ status:'ok',success: true, message: "User successfully registered" })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: "User Email Is already registered" });
    }
})
router.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })

    if (!user) {
        return  res.json({success:false,message:"Invalid Login Credentials"})
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
    )
    if (isPasswordValid) {
        const generateToken = async(user,statusCode,res)=>{
            const token=await user.generateJwtToken();
        
            const options = {
                httpOnly: true,
                expires:new Date(Date.now()+process.env.EXPIRES)
            }
            res
            .status(statusCode)
            .cookie("token",token,options)
            .json({success:true,token,message:"User Logged in successfully"});
        }
        generateToken(user,200,res);
    }
    else {
        return res.json({ status: 'error', success: false,errorMessage: 'Invalid Credentials' })
    }
})
router.get("/logout",(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({success: true, message:"User Logged Out Successfully"});
})
router.get('/',(req, res) => {
    Music.find()
        .then(music => res.json(music))
        .catch(err => res.status(400).json(`Error : ${err}`));
})
router.post('/addMusic',upload.single("musicFile"), async (req, res) => {
    try {
        const newMusic = new Music({
            title: req.body.title,
            artist: req.body.artist,
            musicFile: req.file.originalname,

        })
        await newMusic.save();
        alert("Music File Successfully Uploaded")
        res.status(201).send(newMusic);
    }
    catch (e) {
        res.status(400).send(e);
    }
})
router.delete('/:id',(req, res) => {
    Music.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json("The music Data is deleted!")

        })
        .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;