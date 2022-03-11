const mongoose  = require('mongoose');
const musicSchema = new mongoose.Schema({
    title:{type:String, required:true},
    artist:{type:String, required:true},
    musicFile:{type:String},
})
const Music = mongoose.model('Music',musicSchema);

module.exports= Music;