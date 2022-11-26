const  mongoose  = require("mongoose");
const Schema = mongoose.Schema
const UserSchema = new Schema({
    
    name:{
        type:String,
        require:true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    }, 
    password:{
        type: String,
        require:true
    },
    number_phone: {
        type: String,
        trim: true,
        required: true,
    },
    role:{
        type: Number,
        default: 0,
    },
    createAt:{
        type:Date,
        default:Date.now
    }
    
})
module.exports = mongoose.model('users', UserSchema)