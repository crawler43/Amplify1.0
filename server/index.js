const  express = require('express');
const mongoose =require('mongoose');
const cors= require('cors');
const cookieParser = require('cookie-parser');
const musicRouter = require('./routes/music');
const app = express();
const port = process.env.PORT||8000;

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use('/music',musicRouter)


require("./db/connect")
require('dotenv').config()

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})
