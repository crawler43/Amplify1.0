const mongoose = require('mongoose')

mongoose.connect(process.env.DB,{
    useNewUrlParser: true,
})
.then(()=>{
    console.log("Connected to MongoDB database");
})
.catch(err=>{
    console.log("Error connecting to MongoDB")
})