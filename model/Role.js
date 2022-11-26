const mongoose = require('mongoose');
const Schema = mongoose.Schema

const roleSchema = new Schema({
      roleName:{
        type: String,
        require: true       
      },
      user:{
        type: Schema.Types.ObjectId,       
        ref: 'users' 
     },
} )
module.exports = mongoose.model('role', roleSchema)
